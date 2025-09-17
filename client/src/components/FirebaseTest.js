import React, { useState, useEffect } from 'react';
import { initializeFirebase, getFirebaseAuth, getFirebaseDB, COLLECTIONS } from '../services/firebase';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';

const FirebaseTest = () => {
  const [auth, setAuth] = useState(null);
  const [db, setDb] = useState(null);
  const [user, setUser] = useState(null);
  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    initializeFirebaseServices();
  }, []);

  const initializeFirebaseServices = async () => {
    try {
      setStatus('🧪 Initializing Firebase services...');
      
      // Initialize Firebase
      const firebaseServices = initializeFirebase();
      const authInstance = getFirebaseAuth();
      const dbInstance = getFirebaseDB();
      
      setAuth(authInstance);
      setDb(dbInstance);
      
      setStatus('🧪 Firebase services initialized successfully!');
      
      // Set up auth state listener
      onAuthStateChanged(authInstance, (user) => {
        setUser(user);
        if (user) {
          setStatus(`🧪 User authenticated: ${user.uid}`);
        } else {
          setStatus('🧪 No user authenticated');
        }
      });
      
    } catch (error) {
      console.error('🧪 Firebase initialization error:', error);
      setStatus(`🧪 Error: ${error.message}`);
    }
  };

  const testAnonymousAuth = async () => {
    try {
      setLoading(true);
      setStatus('🧪 Testing anonymous authentication...');
      
      const result = await signInAnonymously(auth);
      
      alert(`🧪 Authentication Success!\n\nUser ID: ${result.user.uid}\nEmail: ${result.user.email || 'Anonymous'}\nProvider: ${result.user.providerData.length > 0 ? result.user.providerData[0].providerId : 'Anonymous'}`);
      
      setStatus('🧪 Anonymous authentication successful!');
      
    } catch (error) {
      console.error('🧪 Auth test error:', error);
      alert(`🧪 Authentication Error:\n\n${error.message}`);
      setStatus(`🧪 Auth error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testFirestoreWrite = async () => {
    try {
      setLoading(true);
      setStatus('🧪 Testing Firestore write...');
      
      if (!user) {
        alert('🧪 Please authenticate first!');
        return;
      }
      
      const testDocData = {
        userId: user.uid,
        timestamp: new Date().toISOString(),
        message: 'Hello from Firebase Test!',
        testValue: Math.random(),
        metadata: {
          source: 'FirebaseTest Component',
          version: '1.0.0'
        }
      };
      
      const testDocRef = doc(db, COLLECTIONS.USERS, user.uid);
      await setDoc(testDocRef, testDocData, { merge: true });
      
      alert(`🧪 Firestore Write Success!\n\nDocument ID: ${user.uid}\nCollection: ${COLLECTIONS.USERS}\n\nPayload:\n${JSON.stringify(testDocData, null, 2)}`);
      
      setStatus('🧪 Firestore write successful!');
      setTestData(testDocData);
      
    } catch (error) {
      console.error('🧪 Firestore write error:', error);
      alert(`🧪 Firestore Write Error:\n\n${error.message}`);
      setStatus(`🧪 Write error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testFirestoreRead = async () => {
    try {
      setLoading(true);
      setStatus('🧪 Testing Firestore read...');
      
      if (!user) {
        alert('🧪 Please authenticate first!');
        return;
      }
      
      const testDocRef = doc(db, COLLECTIONS.USERS, user.uid);
      const docSnapshot = await getDoc(testDocRef);
      
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        
        alert(`🧪 Firestore Read Success!\n\nDocument ID: ${docSnapshot.id}\nCollection: ${COLLECTIONS.USERS}\n\nPayload:\n${JSON.stringify(data, null, 2)}`);
        
        setStatus('🧪 Firestore read successful!');
        setTestData(data);
      } else {
        alert('🧪 Document not found! Please write data first.');
        setStatus('🧪 Document not found');
      }
      
    } catch (error) {
      console.error('🧪 Firestore read error:', error);
      alert(`🧪 Firestore Read Error:\n\n${error.message}`);
      setStatus(`🧪 Read error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testCollectionQuery = async () => {
    try {
      setLoading(true);
      setStatus('🧪 Testing Firestore collection query...');
      
      const usersCollection = collection(db, COLLECTIONS.USERS);
      const querySnapshot = await getDocs(usersCollection);
      
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      alert(`🧪 Collection Query Success!\n\nCollection: ${COLLECTIONS.USERS}\nDocument Count: ${documents.length}\n\nPayload:\n${JSON.stringify(documents, null, 2)}`);
      
      setStatus(`🧪 Collection query successful! Found ${documents.length} documents`);
      
    } catch (error) {
      console.error('🧪 Collection query error:', error);
      alert(`🧪 Collection Query Error:\n\n${error.message}`);
      setStatus(`🧪 Query error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🧪 Firebase Test Dashboard</h2>
      
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-blue-800">Status</h3>
        <p className="text-blue-700">{status}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Authentication</h3>
          <p className="text-sm text-gray-600 mb-3">
            User: {user ? user.uid : 'Not authenticated'}
          </p>
          <button
            onClick={testAnonymousAuth}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            {loading ? 'Testing...' : 'Test Anonymous Auth'}
          </button>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Firestore Operations</h3>
          <div className="space-y-2">
            <button
              onClick={testFirestoreWrite}
              disabled={loading || !user}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              {loading ? 'Testing...' : 'Test Write'}
            </button>
            <button
              onClick={testFirestoreRead}
              disabled={loading || !user}
              className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              {loading ? 'Testing...' : 'Test Read'}
            </button>
            <button
              onClick={testCollectionQuery}
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              {loading ? 'Testing...' : 'Test Collection Query'}
            </button>
          </div>
        </div>
      </div>
      
      {testData && (
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-green-800">Last Retrieved Data</h3>
          <pre className="text-sm text-green-700 bg-green-100 p-3 rounded overflow-auto">
            {JSON.stringify(testData, null, 2)}
          </pre>
        </div>
      )}
      
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-yellow-800">Firebase Configuration Status</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>✅ Firebase App: {auth && db ? 'Initialized' : 'Not initialized'}</li>
          <li>✅ Authentication: {auth ? 'Available' : 'Not available'}</li>
          <li>✅ Firestore: {db ? 'Available' : 'Not available'}</li>
          <li>✅ User: {user ? 'Authenticated' : 'Not authenticated'}</li>
        </ul>
      </div>
    </div>
  );
};

export default FirebaseTest;



