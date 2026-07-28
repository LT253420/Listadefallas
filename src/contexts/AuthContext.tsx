import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { auth, googleProvider } from '../config/firebase';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { session, sha256Hex } from '../utils/helpers';

interface User {
  email: string;
  displayName?: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isSecondFactorVerified: boolean;
  login: (user: User) => void;
  logout: () => void;
  verifySecondFactor: (password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hash de la contraseña en SHA-256
const PASSWORD_HASH =
  '92ab7d1f29efd823cddcf0913fbc4eb209766797361f23aec2382d35b9fc3821';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSecondFactorVerified, setIsSecondFactorVerified] = useState(false);

  // Al montar, verificar si hay sesión guardada
 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
          setUser({
              email: firebaseUser.email ?? '',
              displayName: firebaseUser.displayName ?? '',
              photoURL: firebaseUser.photoURL ?? '',
          });
      } else {
          setUser(null);
      }
      setLoading(false);
  });
  return unsubscribe;
}, []);

 const login = useCallback(async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const firebaseUser = result.user;
    const userData = {
        email: firebaseUser.email ?? "",
        displayName: firebaseUser.displayName ?? "",
        photoURL: firebaseUser.photoURL ?? ""
    };
    setUser(userData);
    session.set("user", userData);
    session.set("secondFactor", false);
    setIsSecondFactorVerified(false);
}, []);

 const logout = useCallback(async () => {
  await signOut(auth);
  setUser(null);
  setIsSecondFactorVerified(false);
  session.remove('secondFactor');
}, []);

  const verifySecondFactor = useCallback(async (password: string): Promise<boolean> => {
    const hash = await sha256Hex(password);
    if (hash === PASSWORD_HASH) {
      setIsSecondFactorVerified(true);
      session.set('secondFactor', true);
      return true;
    }
    return false;
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user && isSecondFactorVerified,
    isSecondFactorVerified,
    login,
    logout,
    verifySecondFactor,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};