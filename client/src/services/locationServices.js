import { DEFAULT_LOCATION } from './firebase';

// Location Services for DanceLink Web
class LocationServices {
  constructor() {
    this.currentLocation = null;
    this.locationPermission = null;
    this.isInitialized = false;
    this.locationTimeout = 5000; // 5 seconds
    this.fallbackLocation = DEFAULT_LOCATION;
  }

  // Initialize location services
  async initialize() {
    try {
      console.log('🧪 Initializing location services...');
      
      // Check if geolocation is supported
      if (!navigator.geolocation) {
        console.warn('🧪 Geolocation not supported, using fallback location');
        this.currentLocation = this.fallbackLocation;
        return;
      }

      // Check permission status
      this.locationPermission = await this.checkPermission();
      
      this.isInitialized = true;
      console.log('🧪 Location services initialized successfully');
    } catch (error) {
      console.error('🧪 Location services initialization error:', error);
      this.currentLocation = this.fallbackLocation;
    }
  }

  // Check location permission
  async checkPermission() {
    if (!navigator.permissions) {
      return 'granted'; // Assume granted if permissions API not available
    }

    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      return permission.state;
    } catch (error) {
      console.warn('🧪 Permission check failed:', error);
      return 'prompt';
    }
  }

  // Get current location using GPS
  async getCurrentLocation() {
    try {
      console.log('🧪 Getting current location...');
      
      return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error('Location request timeout'));
        }, this.locationTimeout);

        navigator.geolocation.getCurrentPosition(
          (position) => {
            clearTimeout(timeoutId);
            const location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
              timestamp: position.timestamp
            };

            // Validate location (ensure it's in target regions)
            if (this.validateLocation(location)) {
              this.currentLocation = location;
              console.log('🧪 Current location obtained:', location);
              resolve(location);
            } else {
              console.warn('🧪 Location validation failed, using fallback');
              resolve(this.fallbackLocation);
            }
          },
          (error) => {
            clearTimeout(timeoutId);
            console.warn('🧪 GPS location error:', error);
            resolve(this.fallbackLocation);
          },
          {
            enableHighAccuracy: true,
            timeout: this.locationTimeout,
            maximumAge: 60000 // 1 minute
          }
        );
      });
    } catch (error) {
      console.error('🧪 Location request error:', error);
      return this.fallbackLocation;
    }
  }

  // Validate location (ensure it's in target regions)
  validateLocation(location) {
    try {
      // Check if location is within reasonable bounds
      const { latitude, longitude } = location;
      
      // Basic bounds check (roughly covers most populated areas)
      if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        return false;
      }

      // Check if location is not in obviously wrong places (like middle of ocean)
      // This is a simplified check - in production you'd have more sophisticated validation
      return true;
    } catch (error) {
      console.error('🧪 Location validation error:', error);
      return false;
    }
  }

  // Get location from IP (fallback)
  async getLocationFromIP() {
    try {
      console.log('🧪 Getting location from IP...');
      
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      const location = {
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
        city: data.city,
        state: data.region,
        country: data.country_code,
        accuracy: 5000, // IP-based location is less accurate
        source: 'ip'
      };

      console.log('🧪 IP-based location:', location);
      return location;
    } catch (error) {
      console.error('🧪 IP location error:', error);
      return this.fallbackLocation;
    }
  }

  // Reverse geocoding
  async reverseGeocode(latitude, longitude) {
    try {
      console.log('🧪 Reverse geocoding...');
      
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        const addressComponents = result.address_components;
        
        let city = '';
        let state = '';
        let country = '';
        let postalCode = '';
        
        addressComponents.forEach(component => {
          if (component.types.includes('locality')) {
            city = component.long_name;
          } else if (component.types.includes('administrative_area_level_1')) {
            state = component.short_name;
          } else if (component.types.includes('country')) {
            country = component.short_name;
          } else if (component.types.includes('postal_code')) {
            postalCode = component.long_name;
          }
        });
        
        return {
          city,
          state,
          country,
          postalCode,
          formattedAddress: result.formatted_address
        };
      }
      
      return null;
    } catch (error) {
      console.error('🧪 Reverse geocoding error:', error);
      return null;
    }
  }

  // Get readable location name
  async getLocationName(location) {
    try {
      const geocode = await this.reverseGeocode(location.latitude, location.longitude);
      
      if (geocode) {
        return geocode.formattedAddress;
      }
      
      // Fallback to coordinates
      return `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`;
    } catch (error) {
      console.error('🧪 Get location name error:', error);
      return 'Unknown Location';
    }
  }

  // Calculate distance between two points
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180);
  }

  // Get current location with fallback
  async getCurrentLocationWithFallback() {
    try {
      // Try GPS first
      const gpsLocation = await this.getCurrentLocation();
      
      if (gpsLocation && gpsLocation !== this.fallbackLocation) {
        return gpsLocation;
      }
      
      // Fallback to IP-based location
      const ipLocation = await this.getLocationFromIP();
      return ipLocation;
    } catch (error) {
      console.error('🧪 Location with fallback error:', error);
      return this.fallbackLocation;
    }
  }

  // Request location permission
  async requestPermission() {
    try {
      console.log('🧪 Requesting location permission...');
      
      const location = await this.getCurrentLocation();
      this.locationPermission = 'granted';
      return location;
    } catch (error) {
      console.error('🧪 Permission request error:', error);
      this.locationPermission = 'denied';
      throw error;
    }
  }

  // Get location status
  getLocationStatus() {
    return {
      isInitialized: this.isInitialized,
      permission: this.locationPermission,
      hasLocation: !!this.currentLocation,
      currentLocation: this.currentLocation
    };
  }
}

// Create singleton instance
const locationServices = new LocationServices();

// Initialize location services
export const initializeLocationServices = () => {
  return locationServices.initialize();
};

// Export methods
export const getCurrentLocation = () => locationServices.getCurrentLocation();
export const getCurrentLocationWithFallback = () => locationServices.getCurrentLocationWithFallback();
export const getLocationFromIP = () => locationServices.getLocationFromIP();
export const reverseGeocode = (lat, lng) => locationServices.reverseGeocode(lat, lng);
export const getLocationName = (location) => locationServices.getLocationName(location);
export const calculateDistance = (lat1, lon1, lat2, lon2) => locationServices.calculateDistance(lat1, lon1, lat2, lon2);
export const requestLocationPermission = () => locationServices.requestPermission();
export const getLocationStatus = () => locationServices.getLocationStatus();

export default locationServices;
