import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaHeart, FaUser, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { getFirebaseDB, COLLECTIONS } from '../services/firebase';
import { doc, collection, addDoc, updateDoc, getDocs, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { getFirebaseAuth } from '../services/firebase';

const DancePartnerChat = ({ matchId, partner }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const db = getFirebaseDB();
  const auth = getFirebaseAuth();

  useEffect(() => {
    if (matchId) {
      loadMessages();
      setupMessageListener();
    }
  }, [matchId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Load existing messages
  const loadMessages = async () => {
    try {
      setLoading(true);
      const messagesQuery = query(
        collection(db, COLLECTIONS.CHAT_ROOMS, matchId, COLLECTIONS.MESSAGES),
        orderBy('timestamp', 'asc')
      );
      const snapshot = await getDocs(messagesQuery);
      
      const loadedMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setMessages(loadedMessages);
    } catch (err) {
      console.error('🧪 Error loading messages:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Setup real-time message listener
  const setupMessageListener = () => {
    const messagesQuery = query(
      collection(db, COLLECTIONS.CHAT_ROOMS, matchId, COLLECTIONS.MESSAGES),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const newMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(newMessages);
    });

    return unsubscribe;
  };

  // Send a new message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const messageData = {
        text: newMessage.trim(),
        senderId: auth.currentUser.uid,
        senderName: auth.currentUser.displayName || 'Anonymous',
        timestamp: serverTimestamp(),
        type: 'text'
      };

      // Add message to Firestore
      await addDoc(collection(db, COLLECTIONS.CHAT_ROOMS, matchId, COLLECTIONS.MESSAGES), messageData);

      // Update chat room with last message
      await updateDoc(doc(db, COLLECTIONS.CHAT_ROOMS, matchId), {
        lastMessage: newMessage.trim(),
        lastMessageTime: serverTimestamp()
      });

      setNewMessage('');
      
      // Show success alert
      if (typeof window !== 'undefined') {
        alert(`🧪 Message Sent Successfully!\n\nMessage: "${newMessage.trim()}"\n\nYour dance partner will see this message in real-time!`);
      }
      
    } catch (err) {
      console.error('🧪 Error sending message:', err);
      setError(err.message);
    }
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Message component
  const Message = ({ message }) => {
    const isOwnMessage = message.senderId === auth.currentUser?.uid;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isOwnMessage 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
            : 'bg-white/20 text-white backdrop-blur-sm border border-white/20'
        }`}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">
              {isOwnMessage ? 'You' : partner.displayName}
            </span>
            <span className="text-xs opacity-70">
              {formatTime(message.timestamp)}
            </span>
          </div>
          <p className="text-sm">{message.text}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="relative max-w-4xl mx-auto p-6">
        {/* Chat Header */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                {partner.displayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{partner.displayName}</h2>
                <p className="text-white/60 text-sm flex items-center">
                  <FaMapMarkerAlt className="w-3 h-3 mr-1" />
                  {partner.location}
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-green-400">
                <FaHeart className="w-6 h-6 pulse-heart" />
              </div>
              <p className="text-white/60 text-xs mt-1">Matched!</p>
            </div>
          </div>
          
          {/* Partner Info */}
          <div className="mt-4 pt-4 border-t border-white/20">
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
            {partner.bio && (
              <p className="text-white/80 text-sm mt-2">{partner.bio}</p>
            )}
          </div>
        </div>

        {/* Messages Container */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 mb-6 h-96 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <FaHeart className="w-12 h-12 text-pink-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Start Your Dance Conversation!</h3>
              <p className="text-white/60 text-sm">
                Send a message to plan your dance session with {partner.displayName}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {messages.map(message => (
                  <Message key={message.id} message={message} />
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Message Input */}
        <form onSubmit={sendMessage} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-white/60 backdrop-blur-sm"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:bg-gray-400 transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/20 transform hover:scale-105"
            >
              <FaPaperPlane className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Error */}
        {error && (
          <div className="backdrop-blur-md bg-red-500/20 border border-red-400/30 rounded-xl p-4 mt-4">
            <h3 className="text-red-200 font-semibold">Error</h3>
            <p className="text-red-100">{error}</p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/20">
            <FaMapMarkerAlt className="w-4 h-4 mr-2 inline" />
            Suggest Meetup Location
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg hover:from-pink-600 hover:to-red-600 transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/20">
            <FaHeart className="w-4 h-4 mr-2 inline" />
            Plan Dance Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default DancePartnerChat;






