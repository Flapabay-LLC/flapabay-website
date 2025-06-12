import { AES, enc } from 'crypto-js';

const SECRET_KEY = import.meta.env.REACT_APP_STORAGE_SECRET || 'your-secret-key';

export const secureStorage = {
  setItem: (key: string, value: string) => {
    try {
      const encryptedValue = AES.encrypt(value, SECRET_KEY).toString();
      localStorage.setItem(key, encryptedValue);
    } catch (error) {
      console.error('Error storing data securely:', error);
    }
  },

  getItem: (key: string): string | null => {
    try {
      const encryptedValue = localStorage.getItem(key);
      if (!encryptedValue) return null;
      
      const decryptedValue = AES.decrypt(encryptedValue, SECRET_KEY).toString(enc.Utf8);
      return decryptedValue;
    } catch (error) {
      console.error('Error retrieving data securely:', error);
      return null;
    }
  },

  removeItem: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data securely:', error);
    }
  }
}; 