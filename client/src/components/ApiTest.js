import React, { useState } from 'react';
import { proxyFetch, alternativeProxyFetch } from '../services/proxyApi';

const ApiTest = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const testApi = async () => {
    setLoading(true);
    setError('');
    setResult('');
    
    const apiUrl = 'https://www.dance-events.info/api/v1/events.json?token=55493fc73a27d20a9ac3402e8b5eff61';
    
    try {
      console.log('🧪 Testing API with multiple approaches...');
      
      // Try direct fetch first
      try {
        console.log('🧪 Attempt 1: Direct fetch...');
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });
        
        console.log('🧪 Direct API Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('🧪 Direct API data received:', data);
          setResult(JSON.stringify(data, null, 2));
          return;
        }
      } catch (directError) {
        console.log('🧪 Direct fetch failed:', directError.message);
      }
      
      // Try proxy fetch
      try {
        console.log('🧪 Attempt 2: Proxy fetch...');
        const proxyResponse = await proxyFetch(apiUrl);
        const data = await proxyResponse.json();
        console.log('🧪 Proxy API data received:', data);
        setResult(JSON.stringify(data, null, 2));
        return;
      } catch (proxyError) {
        console.log('🧪 Proxy fetch failed:', proxyError.message);
      }
      
      // Try alternative proxy
      try {
        console.log('🧪 Attempt 3: Alternative proxy...');
        const altProxyResponse = await alternativeProxyFetch(apiUrl);
        const data = await altProxyResponse.json();
        console.log('🧪 Alternative proxy data received:', data);
        setResult(JSON.stringify(data, null, 2));
        return;
      } catch (altProxyError) {
        console.log('🧪 Alternative proxy failed:', altProxyError.message);
      }
      
      throw new Error('All API approaches failed. This might be a network or API issue.');
      
    } catch (err) {
      console.error('🧪 All API test approaches failed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">🧪 API Test</h2>
      
      <button 
        onClick={testApi}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Testing...' : 'Test API Directly'}
      </button>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {result && (
        <div className="mt-4">
          <h3 className="font-bold mb-2">API Response:</h3>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-96">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ApiTest;
