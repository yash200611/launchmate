import { createContext, useContext } from 'react';

export type User = {
  _id: string;
  email: string;
  fullName: string;
  role?: string;
  experienceYears?: number;
  linkedinUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthContextType = {
  user: User | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};