import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "mock-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mock-domain",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mock-project",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mock-bucket",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "mock-sender",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "mock-app"
};

let app, auth;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (error) {
  console.warn("Firebase initialization failed, likely due to missing config.", error);
}

// Wrapper to allow mock authentication if Firebase isn't configured yet
export const loginUser = async (email, password) => {
  if (firebaseConfig.apiKey === "mock-key") {
    console.log("Mock Login:", email);
    localStorage.setItem('mock_user', JSON.stringify({ email, uid: 'mock123' }));
    return { user: { email, uid: 'mock123' } };
  }
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerUser = async (email, password) => {
  if (firebaseConfig.apiKey === "mock-key") {
    console.log("Mock Register:", email);
    localStorage.setItem('mock_user', JSON.stringify({ email, uid: 'mock123' }));
    return { user: { email, uid: 'mock123' } };
  }
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async () => {
  if (firebaseConfig.apiKey === "mock-key") {
    localStorage.removeItem('mock_user');
    return true;
  }
  return signOut(auth);
};

export const subscribeToAuth = (callback) => {
  if (firebaseConfig.apiKey === "mock-key") {
    const mockUser = localStorage.getItem('mock_user');
    callback(mockUser ? JSON.parse(mockUser) : null);
    return () => {}; // unsubscribe function
  }
  return onAuthStateChanged(auth, callback);
};

export { auth };
