// Postal Code Validator for DanceLink Web
// Supports 80+ countries with real-time validation

class PostalCodeValidator {
  constructor() {
    this.countries = this.initializeCountries();
    this.validationCache = new Map();
  }

  // Initialize country configurations
  initializeCountries() {
    return {
      // North America
      'US': {
        name: 'United States',
        pattern: /^\d{5}(-\d{4})?$/,
        format: '12345 or 12345-6789',
        example: '10001',
        maxLength: 10
      },
      'CA': {
        name: 'Canada',
        pattern: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
        format: 'A1A 1A1',
        example: 'M5V 3A8',
        maxLength: 7
      },
      'MX': {
        name: 'Mexico',
        pattern: /^\d{5}$/,
        format: '12345',
        example: '06000',
        maxLength: 5
      },

      // Europe
      'GB': {
        name: 'United Kingdom',
        pattern: /^[A-Za-z]{1,2}\d[A-Za-z\d]? \d[A-Za-z]{2}$/,
        format: 'SW1A 1AA',
        example: 'SW1A 1AA',
        maxLength: 8
      },
      'DE': {
        name: 'Germany',
        pattern: /^\d{5}$/,
        format: '12345',
        example: '10178',
        maxLength: 5
      },
      'FR': {
        name: 'France',
        pattern: /^\d{5}$/,
        format: '12345',
        example: '75001',
        maxLength: 5
      },
      'IT': {
        name: 'Italy',
        pattern: /^\d{5}$/,
        format: '12345',
        example: '00100',
        maxLength: 5
      },
      'ES': {
        name: 'Spain',
        pattern: /^\d{5}$/,
        format: '12345',
        example: '28001',
        maxLength: 5
      },
      'NL': {
        name: 'Netherlands',
        pattern: /^\d{4} [A-Za-z]{2}$/,
        format: '1234 AB',
        example: '1000 AA',
        maxLength: 7
      },
      'BE': {
        name: 'Belgium',
        pattern: /^\d{4}$/,
        format: '1234',
        example: '1000',
        maxLength: 4
      },
      'CH': {
        name: 'Switzerland',
        pattern: /^\d{4}$/,
        format: '1234',
        example: '8001',
        maxLength: 4
      },
      'AT': {
        name: 'Austria',
        pattern: /^\d{4}$/,
        format: '1234',
        example: '1010',
        maxLength: 4
      },
      'SE': {
        name: 'Sweden',
        pattern: /^\d{3} \d{2}$/,
        format: '123 45',
        example: '111 22',
        maxLength: 6
      },
      'NO': {
        name: 'Norway',
        pattern: /^\d{4}$/,
        format: '1234',
        example: '0001',
        maxLength: 4
      },
      'DK': {
        name: 'Denmark',
        pattern: /^\d{4}$/,
        format: '1234',
        example: '1000',
        maxLength: 4
      },
      'FI': {
        name: 'Finland',
        pattern: /^\d{5}$/,
        format: '12345',
        example: '00100',
        maxLength: 5
      },
      'PL': {
        name: 'Poland',
        pattern: /^\d{2}-\d{3}$/,
        format: '12-345',
        example: '00-001',
        maxLength: 6
      },
      'CZ': {
        name: 'Czech Republic',
        pattern: /^\d{3} \d{2}$/,
        format: '123 45',
        example: '110 00',
        maxLength: 6
      },
      'HU': {
        name: 'Hungary',
        pattern: /^\d{4}$/,
        format: '1234',
        example: '1000',
        maxLength: 4
      },
      'RO': {
        name: 'Romania',
        pattern: /^\d{6}$/,
        format: '123456',
        example: '010000',
        maxLength: 6
      },
      'BG': {
        name: 'Bulgaria',
        pattern: /^\d{4}$/,
        format: '1234',
        example: '1000',
        maxLength: 4
      },
      'GR': {
        name: 'Greece',
        pattern: /^\d{3} \d{2}$/,
        format: '123 45',
        example: '100 00',
        maxLength: 6
      },
      'PT': {
        name: 'Portugal',
        pattern: /^\d{4}-\d{3}$/,
        format: '1234-567',
        example: '1000-001',
        maxLength: 8
      },
      'IE': {
        name: 'Ireland',
        pattern: /^[A-Za-z]\d{2} [A-Za-z0-9]{4}$/,
        format: 'A12 B345',
        example: 'D01 X4X0',
        maxLength: 8
      },

      // Asia
      'JP': {
        name: 'Japan',
        pattern: /^\d{3}-\d{4}$/,
        format: '123-4567',
        example: '100-0001',
        maxLength: 8
      },
      'KR': {
        name: 'South Korea',
        pattern: /^\d{3}-\d{3}$/,
        format: '123-456',
        example: '100-000',
        maxLength: 7
      },
      'CN': {
        name: 'China',
        pattern: /^\d{6}$/,
        format: '123456',
        example: '100000',
        maxLength: 6
      },
      'IN': {
        name: 'India',
        pattern: /^\d{6}$/,
        format: '123456',
        example: '110001',
        maxLength: 6
      },
      'TH': {
        name: 'Thailand',
        pattern: /^\d{5}$/,
        format: '12345',
        example: '10000',
        maxLength: 5
      },
      'SG': {
        name: 'Singapore',
        pattern: /^\d{6}$/,
        format: '123456',
        example: '100000',
        maxLength: 6
      },
      'MY': {
        name: 'Malaysia',
        pattern: /^\d{5}$/,
        format: '12345',
        example: '50000',
        maxLength: 5
      },
      'PH': {
        name: 'Philippines',
        pattern: /^\d{4}$/,
        format: '1234',
        example: '1000',
        maxLength: 4
      },
      'VN': {
        name: 'Vietnam',
        pattern: /^\d{6}$/,
        format: '123456',
        example: '100000',
        maxLength: 6
      },
      'ID': {
        name: 'Indonesia',
        pattern: /^\d{5}$/,
        format: '12345',
        example: '10000',
        maxLength: 5
      },

      // Oceania
      'AU': {
        name: 'Australia',
        pattern: /^\d{4}$/,
        format: '1234',
        example: '2000',
        maxLength: 4
      },
      'NZ': {
        name: 'New Zealand',
        pattern: /^\d{4}$/,
        format: '1234',
        example: '1000',
        maxLength: 4
      },

      // South America
      'BR': {
        name: 'Brazil',
        pattern: /^\d{5}-\d{3}$/,
        format: '12345-678',
        example: '01000-000',
        maxLength: 9
      },
      'AR': {
        name: 'Argentina',
        pattern: /^\d{4}[A-Za-z]{3}$/,
        format: '1234ABC',
        example: '1000AAA',
        maxLength: 7
      },
      'CL': {
        name: 'Chile',
        pattern: /^\d{7}$/,
        format: '1234567',
        example: '1000000',
        maxLength: 7
      },
      'CO': {
        name: 'Colombia',
        pattern: /^\d{6}$/,
        format: '123456',
        example: '100000',
        maxLength: 6
      },
      'PE': {
        name: 'Peru',
        pattern: /^\d{5}$/,
        format: '12345',
        example: '10000',
        maxLength: 5
      },
      'VE': {
        name: 'Venezuela',
        pattern: /^\d{4}[A-Za-z]$/,
        format: '1234A',
        example: '1000A',
        maxLength: 5
      },
      'EC': {
        name: 'Ecuador',
        pattern: /^\d{6}$/,
        format: '123456',
        example: '100000',
        maxLength: 6
      },
      'UY': {
        name: 'Uruguay',
        pattern: /^\d{5}$/,
        format: '12345',
        example: '10000',
        maxLength: 5
      },
      'PY': {
        name: 'Paraguay',
        pattern: /^\d{4}$/,
        format: '1234',
        example: '1000',
        maxLength: 4
      },
      'BO': {
        name: 'Bolivia',
        pattern: /^\d{4}$/,
        format: '1234',
        example: '1000',
        maxLength: 4
      },

      // Africa
      'ZA': {
        name: 'South Africa',
        pattern: /^\d{4}$/,
        format: '1234',
        example: '1000',
        maxLength: 4
      },
      'EG': {
        name: 'Egypt',
        pattern: /^\d{5}$/,
        format: '12345',
        example: '10000',
        maxLength: 5
      },
      'NG': {
        name: 'Nigeria',
        pattern: /^\d{6}$/,
        format: '123456',
        example: '100000',
        maxLength: 6
      },
      'KE': {
        name: 'Kenya',
        pattern: /^\d{5}$/,
        format: '12345',
        example: '10000',
        maxLength: 5
      },
      'GH': {
        name: 'Ghana',
        pattern: /^\d{5}$/,
        format: '12345',
        example: '10000',
        maxLength: 5
      },
      'ET': {
        name: 'Ethiopia',
        pattern: /^\d{4}$/,
        format: '1234',
        example: '1000',
        maxLength: 4
      },
      'TZ': {
        name: 'Tanzania',
        pattern: /^\d{5}$/,
        format: '12345',
        example: '10000',
        maxLength: 5
      },
      'UG': {
        name: 'Uganda',
        pattern: /^\d{5}$/,
        format: '12345',
        example: '10000',
        maxLength: 5
      },
      'RW': {
        name: 'Rwanda',
        pattern: /^\d{5}$/,
        format: '12345',
        example: '10000',
        maxLength: 5
      },
      'BI': {
        name: 'Burundi',
        pattern: /^\d{4}$/,
        format: '1234',
        example: '1000',
        maxLength: 4
      },

      // Middle East
      'IL': {
        name: 'Israel',
        pattern: /^\d{5}$/,
        format: '12345',
        example: '10000',
        maxLength: 5
      },
      'SA': {
        name: 'Saudi Arabia',
        pattern: /^\d{5}$/,
        format: '12345',
        example: '10000',
        maxLength: 5
      },
      'AE': {
        name: 'United Arab Emirates',
        pattern: /^\d{3}$/,
        format: '123',
        example: '100',
        maxLength: 3
      },
      'QA': {
        name: 'Qatar',
        pattern: /^\d{5}$/,
        format: '12345',
        example: '10000',
        maxLength: 5
      },
      'KW': {
        name: 'Kuwait',
        pattern: /^\d{5}$/,
        format: '12345',
        example: '10000',
        maxLength: 5
      },
      'BH': {
        name: 'Bahrain',
        pattern: /^\d{3,4}$/,
        format: '123 or 1234',
        example: '100',
        maxLength: 4
      },
      'OM': {
        name: 'Oman',
        pattern: /^\d{3}$/,
        format: '123',
        example: '100',
        maxLength: 3
      },
      'JO': {
        name: 'Jordan',
        pattern: /^\d{5}$/,
        format: '12345',
        example: '10000',
        maxLength: 5
      },
      'LB': {
        name: 'Lebanon',
        pattern: /^\d{4}(\d{4})?$/,
        format: '1234 or 12345678',
        example: '1000',
        maxLength: 8
      },
      'SY': {
        name: 'Syria',
        pattern: /^\d{5}$/,
        format: '12345',
        example: '10000',
        maxLength: 5
      },
      'IQ': {
        name: 'Iraq',
        pattern: /^\d{5}$/,
        format: '12345',
        example: '10000',
        maxLength: 5
      },
      'IR': {
        name: 'Iran',
        pattern: /^\d{5}-\d{5}$/,
        format: '12345-67890',
        example: '10000-00000',
        maxLength: 11
      },
      'TR': {
        name: 'Turkey',
        pattern: /^\d{5}$/,
        format: '12345',
        example: '10000',
        maxLength: 5
      },

      // Central Asia
      'KZ': {
        name: 'Kazakhstan',
        pattern: /^\d{6}$/,
        format: '123456',
        example: '100000',
        maxLength: 6
      },
      'UZ': {
        name: 'Uzbekistan',
        pattern: /^\d{6}$/,
        format: '123456',
        example: '100000',
        maxLength: 6
      },
      'KG': {
        name: 'Kyrgyzstan',
        pattern: /^\d{6}$/,
        format: '123456',
        example: '100000',
        maxLength: 6
      },
      'TJ': {
        name: 'Tajikistan',
        pattern: /^\d{6}$/,
        format: '123456',
        example: '100000',
        maxLength: 6
      },
      'TM': {
        name: 'Turkmenistan',
        pattern: /^\d{6}$/,
        format: '123456',
        example: '100000',
        maxLength: 6
      },

      // Additional European countries
      'HR': {
        name: 'Croatia',
        pattern: /^\d{5}$/,
        format: '12345',
        example: '10000',
        maxLength: 5
      },
      'SI': {
        name: 'Slovenia',
        pattern: /^\d{4}$/,
        format: '1234',
        example: '1000',
        maxLength: 4
      },
      'SK': {
        name: 'Slovakia',
        pattern: /^\d{3} \d{2}$/,
        format: '123 45',
        example: '100 00',
        maxLength: 6
      },
      'EE': {
        name: 'Estonia',
        pattern: /^\d{5}$/,
        format: '12345',
        example: '10000',
        maxLength: 5
      },
      'LV': {
        name: 'Latvia',
        pattern: /^\d{4}$/,
        format: '1234',
        example: '1000',
        maxLength: 4
      },
      'LT': {
        name: 'Lithuania',
        pattern: /^\d{5}$/,
        format: '12345',
        example: '10000',
        maxLength: 5
      },
      'MT': {
        name: 'Malta',
        pattern: /^[A-Za-z]{3} \d{4}$/,
        format: 'ABC 1234',
        example: 'ABC 1234',
        maxLength: 8
      },
      'CY': {
        name: 'Cyprus',
        pattern: /^\d{4}$/,
        format: '1234',
        example: '1000',
        maxLength: 4
      },
      'LU': {
        name: 'Luxembourg',
        pattern: /^\d{4}$/,
        format: '1234',
        example: '1000',
        maxLength: 4
      },
      'IS': {
        name: 'Iceland',
        pattern: /^\d{3}$/,
        format: '123',
        example: '100',
        maxLength: 3
      }
    };
  }

  // Get all available countries
  getAvailableCountries() {
    return Object.keys(this.countries).map(code => ({
      code,
      name: this.countries[code].name,
      format: this.countries[code].format,
      example: this.countries[code].example
    }));
  }

  // Get country configuration
  getCountryConfig(countryCode) {
    return this.countries[countryCode] || null;
  }

  // Validate postal code for a specific country
  validatePostalCode(postalCode, countryCode) {
    try {
      console.log('🧪 Validating postal code:', postalCode, 'for country:', countryCode);
      
      // Check cache first
      const cacheKey = `${countryCode}-${postalCode}`;
      if (this.validationCache.has(cacheKey)) {
        return this.validationCache.get(cacheKey);
      }

      // Get country configuration
      const countryConfig = this.getCountryConfig(countryCode);
      if (!countryConfig) {
        const result = {
          isValid: false,
          error: 'Country not supported',
          countryCode,
          postalCode
        };
        this.validationCache.set(cacheKey, result);
        return result;
      }

      // Basic validation
      if (!postalCode || typeof postalCode !== 'string') {
        const result = {
          isValid: false,
          error: 'Invalid postal code format',
          countryCode,
          postalCode
        };
        this.validationCache.set(cacheKey, result);
        return result;
      }

      // Trim whitespace
      const trimmedCode = postalCode.trim();
      
      // Check length
      if (trimmedCode.length > countryConfig.maxLength) {
        const result = {
          isValid: false,
          error: `Postal code too long. Maximum length for ${countryConfig.name} is ${countryConfig.maxLength} characters`,
          countryCode,
          postalCode: trimmedCode,
          maxLength: countryConfig.maxLength
        };
        this.validationCache.set(cacheKey, result);
        return result;
      }

      // Test pattern
      const isValid = countryConfig.pattern.test(trimmedCode);
      
      const result = {
        isValid,
        error: isValid ? null : `Invalid format. Expected format: ${countryConfig.format}`,
        countryCode,
        postalCode: trimmedCode,
        format: countryConfig.format,
        example: countryConfig.example,
        countryName: countryConfig.name
      };

      // Cache result
      this.validationCache.set(cacheKey, result);
      
      console.log('🧪 Validation result:', result);
      return result;
    } catch (error) {
      console.error('🧪 Postal code validation error:', error);
      return {
        isValid: false,
        error: 'Validation error occurred',
        countryCode,
        postalCode
      };
    }
  }

  // Format postal code for display
  formatPostalCode(postalCode, countryCode) {
    try {
      const countryConfig = this.getCountryConfig(countryCode);
      if (!countryConfig) {
        return postalCode;
      }

      // Remove all non-alphanumeric characters
      const cleanCode = postalCode.replace(/[^A-Za-z0-9]/g, '');
      
      // Apply country-specific formatting
      switch (countryCode) {
        case 'US':
          if (cleanCode.length >= 5) {
            return cleanCode.length > 5 ? `${cleanCode.slice(0, 5)}-${cleanCode.slice(5, 9)}` : cleanCode;
          }
          break;
        case 'CA':
          if (cleanCode.length >= 6) {
            return `${cleanCode.slice(0, 3).toUpperCase()} ${cleanCode.slice(3, 6).toUpperCase()}`;
          }
          break;
        case 'GB':
          if (cleanCode.length >= 5) {
            return `${cleanCode.slice(0, -3).toUpperCase()} ${cleanCode.slice(-3).toUpperCase()}`;
          }
          break;
        case 'NL':
          if (cleanCode.length >= 6) {
            return `${cleanCode.slice(0, 4)} ${cleanCode.slice(4, 6).toUpperCase()}`;
          }
          break;
        case 'SE':
          if (cleanCode.length >= 5) {
            return `${cleanCode.slice(0, 3)} ${cleanCode.slice(3, 5)}`;
          }
          break;
        case 'PL':
          if (cleanCode.length >= 5) {
            return `${cleanCode.slice(0, 2)}-${cleanCode.slice(2, 5)}`;
          }
          break;
        case 'CZ':
          if (cleanCode.length >= 5) {
            return `${cleanCode.slice(0, 3)} ${cleanCode.slice(3, 5)}`;
          }
          break;
        case 'PT':
          if (cleanCode.length >= 7) {
            return `${cleanCode.slice(0, 4)}-${cleanCode.slice(4, 7)}`;
          }
          break;
        case 'JP':
          if (cleanCode.length >= 7) {
            return `${cleanCode.slice(0, 3)}-${cleanCode.slice(3, 7)}`;
          }
          break;
        case 'KR':
          if (cleanCode.length >= 6) {
            return `${cleanCode.slice(0, 3)}-${cleanCode.slice(3, 6)}`;
          }
          break;
        case 'BR':
          if (cleanCode.length >= 8) {
            return `${cleanCode.slice(0, 5)}-${cleanCode.slice(5, 8)}`;
          }
          break;
        case 'AR':
          if (cleanCode.length >= 7) {
            return `${cleanCode.slice(0, 4)}${cleanCode.slice(4, 7).toUpperCase()}`;
          }
          break;
        case 'VE':
          if (cleanCode.length >= 5) {
            return `${cleanCode.slice(0, 4)}${cleanCode.slice(4, 5).toUpperCase()}`;
          }
          break;
        case 'IR':
          if (cleanCode.length >= 10) {
            return `${cleanCode.slice(0, 5)}-${cleanCode.slice(5, 10)}`;
          }
          break;
        case 'MT':
          if (cleanCode.length >= 7) {
            return `${cleanCode.slice(0, 3).toUpperCase()} ${cleanCode.slice(3, 7)}`;
          }
          break;
      }

      return cleanCode;
    } catch (error) {
      console.error('🧪 Postal code formatting error:', error);
      return postalCode;
    }
  }

  // Get validation message for UI
  getValidationMessage(validationResult) {
    if (!validationResult) {
      return '';
    }

    if (validationResult.isValid) {
      return `✓ Valid ${validationResult.countryName} postal code`;
    } else {
      return validationResult.error || 'Invalid postal code';
    }
  }

  // Clear validation cache
  clearCache() {
    this.validationCache.clear();
  }

  // Get cache size (for debugging)
  getCacheSize() {
    return this.validationCache.size;
  }
}

// Create singleton instance
const postalCodeValidator = new PostalCodeValidator();

// Export methods
export const validatePostalCode = (postalCode, countryCode) => postalCodeValidator.validatePostalCode(postalCode, countryCode);
export const formatPostalCode = (postalCode, countryCode) => postalCodeValidator.formatPostalCode(postalCode, countryCode);
export const getAvailableCountries = () => postalCodeValidator.getAvailableCountries();
export const getCountryConfig = (countryCode) => postalCodeValidator.getCountryConfig(countryCode);
export const getValidationMessage = (validationResult) => postalCodeValidator.getValidationMessage(validationResult);
export const clearValidationCache = () => postalCodeValidator.clearCache();
export const getValidationCacheSize = () => postalCodeValidator.getCacheSize();

export default postalCodeValidator;
