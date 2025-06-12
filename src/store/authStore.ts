// authStore.ts - Handles authentication state (user, isAuthenticated)
import { atom } from "jotai";
import type { User } from '@/api/types/apiTypes';
import { secureStorage } from '@/utils/secureStorage';

// Initialize user from secure storage if available
const storedUserString = typeof window !== "undefined" ? secureStorage.getItem("flapabay_user_session") : null;
let initialUser: User | null = null;

if (storedUserString) {
  try {
    const parsedUser = JSON.parse(storedUserString);
    // Basic validation to ensure it looks like our User object
    if (parsedUser && typeof parsedUser.id === 'number' && parsedUser.email) {
      initialUser = parsedUser as User;
    } else {
      secureStorage.removeItem("flapabay_user_session");
      secureStorage.removeItem("auth_token");
      secureStorage.removeItem("refresh_token");
    }
  } catch (e) {
    console.error("Error parsing stored user from secure storage:", e);
    secureStorage.removeItem("flapabay_user_session");
    secureStorage.removeItem("auth_token");
    secureStorage.removeItem("refresh_token");
  }
}

// User state atom
export const userAtom = atom<User | null>(initialUser);

// Authentication state atom
export const isAuthenticatedAtom = atom((get) => !!get(userAtom));

// Token atom
export const tokenAtom = atom<string | null>(
  typeof window !== "undefined" ? secureStorage.getItem("auth_token") : null
);

// Setter atom for user and token
export const setAuthAtom = atom(
  null,
  (get, set, { user, token, refreshToken }: { user: User | null; token: string | null; refreshToken?: string | null }) => {
    set(userAtom, user);
    set(tokenAtom, token);
    
    if (user && token) {
      secureStorage.setItem("flapabay_user_session", JSON.stringify(user));
      secureStorage.setItem("auth_token", token);
      if (refreshToken) {
        secureStorage.setItem("refresh_token", refreshToken);
      }
    } else {
      secureStorage.removeItem("flapabay_user_session");
      secureStorage.removeItem("auth_token");
      secureStorage.removeItem("refresh_token");
    }
  }
);

// Clear auth state
export const clearAuthAtom = atom(
  null,
  (get, set) => {
    set(userAtom, null);
    set(tokenAtom, null);
    secureStorage.removeItem("flapabay_user_session");
    secureStorage.removeItem("auth_token");
    secureStorage.removeItem("refresh_token");
  }
); 