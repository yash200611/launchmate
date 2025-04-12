// FILE: src/store/authStore.ts
import { create } from 'zustand';

interface AuthState {
  user: { email: string; userId: string } | null;
  loading: boolean;
  error: string;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: '',

  signIn: async (email, password) => {
    set({ loading: true, error: '' });
    try {
      const res = await fetch('/api/auth.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'signin', email, password })
      });

      const text = await res.text();
      try {
        const data = JSON.parse(text);
        if (!res.ok) throw new Error(data.error || 'Failed to sign in');
        set({ user: data, loading: false });
      } catch (jsonErr) {
        set({ error: 'Invalid server response: ' + text, loading: false });
      }

    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  signUp: async (email, password) => {
    set({ loading: true, error: '' });
    try {
      const res = await fetch('/api/auth.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'signup', email, password })
      });

      const text = await res.text();
      try {
        const data = JSON.parse(text);
        if (!res.ok) throw new Error(data.error || 'Failed to sign up');
        set({ user: data, loading: false });
      } catch (jsonErr) {
        set({ error: 'Invalid server response: ' + text, loading: false });
      }

    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  signOut: () => set({ user: null })
}));
