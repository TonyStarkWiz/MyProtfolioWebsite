// Proxy API service to handle CORS issues
export const proxyFetch = async (url, options = {}) => {
  try {
    console.log('🧪 Using proxy for URL:', url);
    
    // Use a public CORS proxy
    const proxyUrl = `https://cors-anywhere.herokuapp.com/${url}`;
    
    const response = await fetch(proxyUrl, {
      method: options.method || 'GET',
      headers: {
        'Accept': 'application/json',
        'Origin': window.location.origin,
        ...options.headers
      }
    });
    
    console.log('🧪 Proxy response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Proxy request failed: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    return response;
  } catch (error) {
    console.error('🧪 Proxy fetch error:', error);
    throw error;
  }
};

// Alternative proxy using different service
export const alternativeProxyFetch = async (url, options = {}) => {
  try {
    console.log('🧪 Using alternative proxy for URL:', url);
    
    // Use a different CORS proxy
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    
    const response = await fetch(proxyUrl, {
      method: options.method || 'GET',
      headers: {
        'Accept': 'application/json',
        ...options.headers
      }
    });
    
    console.log('🧪 Alternative proxy response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Alternative proxy request failed: ${response.status} ${response.statusText} - ${errorText}`);
    }
    
    return response;
  } catch (error) {
    console.error('🧪 Alternative proxy fetch error:', error);
    throw error;
  }
};




