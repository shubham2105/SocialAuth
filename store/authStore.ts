import { create } from 'zustand';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface AuthState {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
  error: string | null;

  initializeAuth: () => void;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  loading: true,
  error: null,

  initializeAuth: () => {
    const unsubscribeAuth = auth().onAuthStateChanged(user => {
      set({
        user: user,
        loading: false,
        error: null,
      });
    });
    const unsubscribeUser = auth().onUserChanged(user => {
      set({ user });
    });
    return () => {
      unsubscribeAuth();
      unsubscribeUser();
    };
  },

  signup: async (email, password) => {
    set({ loading: true, error: null });
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (err: any) {
      set({ error: err?.message ?? 'Singup failed' });
    } finally {
      set({ loading: false });
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });

    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (err: any) {
      set({ error: err?.message ?? 'Login failed' });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await auth().signOut();
      set({ user: null });
    } catch (err: any) {
      set({ error: err?.message ?? 'Logout failed' });
    } finally {
      set({ loading: false });
    }
  },
}));
