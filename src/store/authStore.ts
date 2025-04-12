import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

// Simulated user database
const users: { [email: string]: { password: string; id: string } } = {};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      signIn: async (email, password) => {
        const user = users[email];
        if (!user || user.password !== password) {
          throw new Error('Invalid email or password');
        }
        set({ user: { id: user.id, email } });
      },
      signUp: async (email, password) => {
        if (users[email]) {
          throw new Error('Email already exists');
        }
        const id = Math.random().toString(36).substring(2);
        users[email] = { password, id };
        set({ user: { id, email } });
      },
      signOut: () => {
        set({ user: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);