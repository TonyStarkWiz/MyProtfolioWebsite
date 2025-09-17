import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaHeart, FaComments, FaFilter, FaSearch, FaStar, FaMapMarkerAlt, FaCalendar, FaMusic } from 'react-icons/fa';
import { getFirebaseDB, COLLECTIONS } from '../services/firebase';
import { doc, collection, addDoc, updateDoc, getDocs, query, where, orderBy, onSnapshot, arrayUnion, arrayRemove } from 'firebase/firestore';
import { getFirebaseAuth } from '../services/firebase';

// Add CSS for partner matching animations
const partnerMatchingAnimation = `
  @keyframes pulse-heart {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  
  .pulse-heart {
    animation: pulse-heart 2s infinite;
  }
  
  @keyframes slide-in-right {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  .slide-in-right {
    animation: slide-in-right 0.5s ease-out;
  }
`;

// Inject the CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = partnerMatchingAnimation;
  document.head.appendChild(style);
}

const PartnerMatching = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [potentialPartners, setPotentialPartners] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [filters, setFilters] = useState({
    danceStyles: [],
    skillLevel: 'all',
    ageRange: 'all',
    location: '',
    maxDistance: 50
  });

  const db = getFirebaseDB();
  const auth = getFirebaseAuth();

  // Dance styles available for matching
  const availableDanceStyles = [
    'Salsa', 'Bachata', 'Tango', 'Kizomba', 'West Coast Swing',
    'East Coast Swing', 'Cha Cha', 'Rumba', 'Waltz', 'Foxtrot',
    'Viennese Waltz', 'Quickstep', 'Jive', 'Paso Doble', 'Samba',
    'Merengue', 'Cumbia', 'Hustle', 'Two-Step', 'Country Swing'
  ];

  // Skill levels
  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];

  useEffect(() => {
    if (auth.currentUser) {
      loadUserProfile();
      loadPotentialPartners();
      loadMatches();
      setupRealTimeListeners();
    }
  }, [auth.currentUser]);

  // Load user's dance profile
  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const profileQuery = query(
        collection(db, COLLECTIONS.USER_PREFERENCES),
        where('userId', '==', auth.currentUser.uid)
      );
      const snapshot = await getDocs(profileQuery);
      
      if (!snapshot.empty) {
        const profile = snapshot.docs[0].data();
        setUserProfile({ id: snapshot.docs[0].id, ...profile });
      } else {
        setShowProfileForm(true);
      }
    } catch (err) {
      console.error('🧪 Error loading user profile:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load potential partners
  const loadPotentialPartners = async () => {
    try {
      const partnersQuery = query(
        collection(db, COLLECTIONS.USER_PREFERENCES),
        where('userId', '!=', auth.currentUser.uid),
        where('isActive', '==', true)
      );
      const snapshot = await getDocs(partnersQuery);
      
      const partners = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setPotentialPartners(partners);
    } catch (err) {
      console.error('🧪 Error loading potential partners:', err);
      setError(err.message);
    }
  };

  // Load existing matches
  const loadMatches = async () => {
    try {
      const matchesQuery = query(
        collection(db, COLLECTIONS.CHAT_ROOMS),
        where('participants', 'array-contains', auth.currentUser.uid)
      );
      const snapshot = await getDocs(matchesQuery);
      
      const userMatches = [];
      for (const doc of snapshot.docs) {
        const matchData = doc.data();
        const partnerId = matchData.participants.find(id => id !== auth.currentUser.uid);
        
        // Get partner profile
        const partnerProfileQuery = query(
          collection(db, COLLECTIONS.USER_PREFERENCES),
          where('userId', '==', partnerId)
        );
        const partnerSnapshot = await getDocs(partnerProfileQuery);
        
        if (!partnerSnapshot.empty) {
          const partnerProfile = partnerSnapshot.docs[0].data();
          userMatches.push({
            matchId: doc.id,
            partner: { id: partnerId, ...partnerProfile },
            lastMessage: matchData.lastMessage,
            lastMessageTime: matchData.lastMessageTime
          });
        }
      }
      
      setMatches(userMatches);
    } catch (err) {
      console.error('🧪 Error loading matches:', err);
      setError(err.message);
    }
  };

  // Setup real-time listeners
  const setupRealTimeListeners = () => {
    // Listen for new potential partners
    const partnersQuery = query(
      collection(db, COLLECTIONS.USER_PREFERENCES),
      where('userId', '!=', auth.currentUser.uid),
      where('isActive', '==', true)
    );

    const unsubscribePartners = onSnapshot(partnersQuery, (snapshot) => {
      const partners = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPotentialPartners(partners);
    });

    // Listen for new matches
    const matchesQuery = query(
      collection(db, COLLECTIONS.CHAT_ROOMS),
      where('participants', 'array-contains', auth.currentUser.uid)
    );

    const unsubscribeMatches = onSnapshot(matchesQuery, async (snapshot) => {
      const userMatches = [];
      for (const doc of snapshot.docs) {
        const matchData = doc.data();
        const partnerId = matchData.participants.find(id => id !== auth.currentUser.uid);
        
        const partnerProfileQuery = query(
          collection(db, COLLECTIONS.USER_PREFERENCES),
          where('userId', '==', partnerId)
        );
        const partnerSnapshot = await getDocs(partnerProfileQuery);
        
        if (!partnerSnapshot.empty) {
          const partnerProfile = partnerSnapshot.docs[0].data();
          userMatches.push({
            matchId: doc.id,
            partner: { id: partnerId, ...partnerProfile },
            lastMessage: matchData.lastMessage,
            lastMessageTime: matchData.lastMessageTime
          });
        }
      }
      setMatches(userMatches);
    });

    return () => {
      unsubscribePartners();
      unsubscribeMatches();
    };
  };

  // Create or update user profile
  const saveProfile = async (profileData) => {
    try {
      setLoading(true);
      
      const profileDoc = {
        userId: auth.currentUser.uid,
        displayName: profileData.displayName,
        age: profileData.age,
        location: profileData.location,
        danceStyles: profileData.danceStyles,
        skillLevel: profileData.skillLevel,
        bio: profileData.bio,
        preferences: {
          danceStyles: profileData.preferredDanceStyles,
          skillLevel: profileData.preferredSkillLevel,
          ageRange: profileData.preferredAgeRange,
          maxDistance: profileData.maxDistance
        },
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (userProfile) {
        // Update existing profile
        await updateDoc(doc(db, COLLECTIONS.USER_PREFERENCES, userProfile.id), profileDoc);
        setUserProfile({ id: userProfile.id, ...profileDoc });
      } else {
        // Create new profile
        const docRef = await addDoc(collection(db, COLLECTIONS.USER_PREFERENCES), profileDoc);
        setUserProfile({ id: docRef.id, ...profileDoc });
      }

      setShowProfileForm(false);
      
      // Show success alert
      if (typeof window !== 'undefined') {
        alert(`🧪 Dance Profile Saved Successfully!\n\nName: ${profileData.displayName}\nDance Styles: ${profileData.danceStyles.join(', ')}\nSkill Level: ${profileData.skillLevel}\n\nYou're now ready to find dance partners!`);
      }
      
    } catch (err) {
      console.error('🧪 Error saving profile:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Send interest to a potential partner
  const sendInterest = async (partnerId) => {
    try {
      // Add to user's interests
      await updateDoc(doc(db, COLLECTIONS.USER_PREFERENCES, userProfile.id), {
        interests: arrayUnion(partnerId)
      });

      // Check if it's a mutual match
      const partnerDoc = await getDocs(query(
        collection(db, COLLECTIONS.USER_PREFERENCES),
        where('userId', '==', partnerId)
      ));

      if (!partnerDoc.empty) {
        const partnerData = partnerDoc.docs[0].data();
        const partnerInterests = partnerData.interests || [];

        if (partnerInterests.includes(auth.currentUser.uid)) {
          // It's a match! Create chat room
          await createMatch(partnerId);
        }
      }

      // Show success alert
      if (typeof window !== 'undefined') {
        alert(`🧪 Interest Sent Successfully!\n\nYou've shown interest in this dance partner. If they're also interested in you, you'll be matched and can start chatting!`);
      }
      
    } catch (err) {
      console.error('🧪 Error sending interest:', err);
      setError(err.message);
    }
  };

  // Create a match and chat room
  const createMatch = async (partnerId) => {
    try {
      const chatRoomData = {
        participants: [auth.currentUser.uid, partnerId],
        createdAt: new Date().toISOString(),
        lastMessage: "You've been matched! Start chatting to plan your dance session.",
        lastMessageTime: new Date().toISOString(),
        type: 'dance_partner'
      };

      const chatRef = await addDoc(collection(db, COLLECTIONS.CHAT_ROOMS), chatRoomData);

      // Show match alert
      if (typeof window !== 'undefined') {
        alert(`🎉 It's a Match!\n\nYou and your dance partner are interested in each other! You can now start chatting to plan your dance session.\n\nChat Room ID: ${chatRef.id}`);
      }
      
    } catch (err) {
      console.error('🧪 Error creating match:', err);
      setError(err.message);
    }
  };

  // Calculate compatibility score
  const calculateCompatibility = (partner) => {
    let score = 0;
    
    // Dance styles compatibility
    const commonStyles = userProfile.danceStyles.filter(style => 
      partner.danceStyles.includes(style)
    );
    score += commonStyles.length * 20;
    
    // Skill level compatibility
    if (userProfile.skillLevel === partner.skillLevel) {
      score += 30;
    } else if (Math.abs(skillLevels.indexOf(userProfile.skillLevel) - skillLevels.indexOf(partner.skillLevel)) === 1) {
      score += 20;
    }
    
    // Age compatibility
    const ageDiff = Math.abs(userProfile.age - partner.age);
    if (ageDiff <= 5) score += 25;
    else if (ageDiff <= 10) score += 15;
    
    // Location compatibility (if available)
    if (userProfile.location && partner.location) {
      // Simple distance calculation (in production, use proper geocoding)
      if (userProfile.location === partner.location) {
        score += 25;
      }
    }
    
    return Math.min(score, 100);
  };

  // Filter potential partners
  const filteredPartners = potentialPartners.filter(partner => {
    if (filters.danceStyles.length > 0) {
      const hasMatchingStyle = filters.danceStyles.some(style => 
        partner.danceStyles.includes(style)
      );
      if (!hasMatchingStyle) return false;
    }
    
    if (filters.skillLevel !== 'all' && partner.skillLevel !== filters.skillLevel) {
      return false;
    }
    
    if (filters.ageRange !== 'all') {
      const [minAge, maxAge] = filters.ageRange.split('-').map(Number);
      if (partner.age < minAge || partner.age > maxAge) {
        return false;
      }
    }
    
    return true;
  }).sort((a, b) => calculateCompatibility(b) - calculateCompatibility(a));

  // Profile Form Component
  const ProfileForm = () => {
    const [formData, setFormData] = useState({
      displayName: userProfile?.displayName || '',
      age: userProfile?.age || 25,
      location: userProfile?.location || '',
      danceStyles: userProfile?.danceStyles || [],
      skillLevel: userProfile?.skillLevel || 'Intermediate',
      bio: userProfile?.bio || '',
      preferredDanceStyles: userProfile?.preferences?.danceStyles || [],
      preferredSkillLevel: userProfile?.preferences?.skillLevel || 'all',
      preferredAgeRange: userProfile?.preferences?.ageRange || 'all',
      maxDistance: userProfile?.preferences?.maxDistance || 50
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      saveProfile(formData);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <FaUser className="w-6 h-6 mr-3 text-blue-300" />
          Create Your Dance Profile
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Display Name</label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-white/60 backdrop-blur-sm"
                placeholder="Your dance name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-white/60 backdrop-blur-sm"
                min="18"
                max="100"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-white/60 backdrop-blur-sm"
              placeholder="City, State"
            />
          </div>

          {/* Dance Styles */}
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">Dance Styles You Know</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {availableDanceStyles.map(style => (
                <label key={style} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.danceStyles.includes(style)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({...formData, danceStyles: [...formData.danceStyles, style]});
                      } else {
                        setFormData({...formData, danceStyles: formData.danceStyles.filter(s => s !== style)});
                      }
                    }}
                    className="mr-2"
                  />
                  <span className="text-white/80 text-sm">{style}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">Skill Level</label>
            <select
              value={formData.skillLevel}
              onChange={(e) => setFormData({...formData, skillLevel: e.target.value})}
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white backdrop-blur-sm"
            >
              {skillLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-white/60 backdrop-blur-sm"
              placeholder="Tell potential partners about yourself..."
              rows="3"
            />
          </div>

          {/* Preferences */}
          <div className="border-t border-white/20 pt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Partner Preferences</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Preferred Dance Styles</label>
                <div className="grid grid-cols-2 gap-2">
                  {availableDanceStyles.slice(0, 10).map(style => (
                    <label key={style} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.preferredDanceStyles.includes(style)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({...formData, preferredDanceStyles: [...formData.preferredDanceStyles, style]});
                          } else {
                            setFormData({...formData, preferredDanceStyles: formData.preferredDanceStyles.filter(s => s !== style)});
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-white/80 text-sm">{style}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Preferred Skill Level</label>
                <select
                  value={formData.preferredSkillLevel}
                  onChange={(e) => setFormData({...formData, preferredSkillLevel: e.target.value})}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white backdrop-blur-sm"
                >
                  <option value="all">Any Level</option>
                  {skillLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 disabled:bg-gray-400 transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/20 transform hover:scale-105"
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
            
            {userProfile && (
              <button
                type="button"
                onClick={() => setShowProfileForm(false)}
                className="px-6 py-3 bg-white/20 text-white rounded-full hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </motion.div>
    );
  };

  // Partner Card Component
  const PartnerCard = ({ partner }) => {
    const compatibility = calculateCompatibility(partner);
    const hasShownInterest = userProfile?.interests?.includes(partner.userId);
    const isMatched = matches.some(match => match.partner.id === partner.userId);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
              {partner.displayName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{partner.displayName}</h3>
              <p className="text-white/60 text-sm">{partner.age} years old • {partner.location}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400">{compatibility}%</div>
            <div className="text-xs text-white/60">Match</div>
          </div>
        </div>

        {partner.bio && (
          <p className="text-white/80 mb-4 text-sm">{partner.bio}</p>
        )}

        <div className="mb-4">
          <div className="flex items-center text-white/70 mb-2">
                            <FaMusic className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Dance Styles</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {partner.danceStyles.map(style => (
              <span
                key={style}
                className="px-3 py-1 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm border border-white/30"
              >
                {style}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-white/70">
            <FaStar className="w-4 h-4 mr-1 text-yellow-400" />
            <span className="text-sm">{partner.skillLevel}</span>
          </div>

          <div className="flex gap-2">
            {isMatched ? (
              <button className="px-4 py-2 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition-all duration-300">
                <FaComments className="w-4 h-4 mr-1" />
                Chat
              </button>
            ) : hasShownInterest ? (
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-full text-sm hover:bg-yellow-600 transition-all duration-300">
                <FaHeart className="w-4 h-4 mr-1" />
                Interest Sent
              </button>
            ) : (
              <button
                onClick={() => sendInterest(partner.userId)}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full text-sm hover:from-pink-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
              >
                <FaHeart className="w-4 h-4 mr-1" />
                Show Interest
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  // Match Card Component
  const MatchCard = ({ match }) => {
    return (
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
              {match.partner.displayName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{match.partner.displayName}</h3>
              <p className="text-white/60 text-sm">{match.partner.age} years old • {match.partner.location}</p>
            </div>
          </div>
          
          <div className="text-green-400">
            <FaHeart className="w-6 h-6 pulse-heart" />
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {match.partner.danceStyles.map(style => (
              <span
                key={style}
                className="px-3 py-1 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm border border-white/30"
              >
                {style}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-white/70 text-sm">
            {match.lastMessage}
          </div>
          
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
            <FaComments className="w-4 h-4 mr-1" />
            Open Chat
          </button>
        </div>
      </motion.div>
    );
  };

  if (!auth.currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Sign In Required</h2>
          <p className="text-white/80">Please sign in to access partner matching.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto p-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">💃 Partner Matching</h1>
          <p className="text-white/80 text-lg">Find your perfect dance partner</p>
        </div>

        {/* Profile Section */}
        {!userProfile && showProfileForm && <ProfileForm />}
        
        {userProfile && (
          <>
            {/* User Profile Summary */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    {userProfile.displayName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{userProfile.displayName}</h2>
                    <p className="text-white/60">{userProfile.age} years old • {userProfile.location}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {userProfile.danceStyles.map(style => (
                        <span
                          key={style}
                          className="px-2 py-1 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm border border-white/30"
                        >
                          {style}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowProfileForm(true)}
                  className="px-4 py-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/20"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Matches Section */}
            {matches.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <FaHeart className="w-6 h-6 mr-3 text-red-400" />
                  Your Matches ({matches.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matches.map(match => (
                    <MatchCard key={match.matchId} match={match} />
                  ))}
                </div>
              </div>
            )}

            {/* Potential Partners Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <FaSearch className="w-6 h-6 mr-3 text-blue-300" />
                Potential Partners ({filteredPartners.length})
              </h2>
              
              {/* Filters */}
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-1">Dance Styles</label>
                    <select
                      multiple
                      value={filters.danceStyles}
                      onChange={(e) => {
                        const selected = Array.from(e.target.selectedOptions, option => option.value);
                        setFilters({...filters, danceStyles: selected});
                      }}
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white backdrop-blur-sm"
                    >
                      {availableDanceStyles.map(style => (
                        <option key={style} value={style}>{style}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-1">Skill Level</label>
                    <select
                      value={filters.skillLevel}
                      onChange={(e) => setFilters({...filters, skillLevel: e.target.value})}
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white backdrop-blur-sm"
                    >
                      <option value="all">Any Level</option>
                      {skillLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-1">Age Range</label>
                    <select
                      value={filters.ageRange}
                      onChange={(e) => setFilters({...filters, ageRange: e.target.value})}
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white backdrop-blur-sm"
                    >
                      <option value="all">Any Age</option>
                      <option value="18-25">18-25</option>
                      <option value="26-35">26-35</option>
                      <option value="36-45">36-45</option>
                      <option value="46-55">46-55</option>
                      <option value="56-65">56-65</option>
                      <option value="66-100">66+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-1">Location</label>
                    <input
                      type="text"
                      value={filters.location}
                      onChange={(e) => setFilters({...filters, location: e.target.value})}
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-white/60 backdrop-blur-sm"
                      placeholder="Filter by location"
                    />
                  </div>
                </div>
              </div>

              {/* Partners Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredPartners.map(partner => (
                    <PartnerCard key={partner.id} partner={partner} />
                  ))}
                </AnimatePresence>
              </div>

              {filteredPartners.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-white/80 mb-2">No partners found</h3>
                  <p className="text-white/60">Try adjusting your filters or check back later</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Error */}
        {error && (
          <div className="backdrop-blur-md bg-red-500/20 border border-red-400/30 rounded-xl p-4 mb-6">
            <h3 className="text-red-200 font-semibold">Error</h3>
            <p className="text-red-100">{error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerMatching;
