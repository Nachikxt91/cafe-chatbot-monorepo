import {signInAnonymously, onAuthStateChanged} from 'firebase/auth';
import {firebaseAuth} from '@/config/firebaseConfig';

let authInitialized = false;

export const initializeAuth = async () => {
  return new Promise((resolve, reject) => {
    // Check if already authenticated
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        // User already signed in
        authInitialized = true;
        console.log('User already authenticated:', user.uid);
        resolve(user);
      } else if (!authInitialized) {
        // Sign in anonymously
        signInAnonymously(firebaseAuth)
          .then((userCredential) => {
            authInitialized = true;
            console.log('User authenticated anonymously:', userCredential.user.uid);
            resolve(userCredential.user);
          })
          .catch((error) => {
            console.error('Auth initialization error:', error);
            reject(error);
          });
      }
    });
  });
};

export const isAuthInitialized = () => authInitialized;
