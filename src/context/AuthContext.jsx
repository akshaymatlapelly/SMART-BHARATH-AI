import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if there is an active session in local storage
    const savedUser = localStorage.getItem('sb-mock-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const loginWithGoogle = async () => {
    const mockUser = {
      uid: 'demo-user-google',
      displayName: 'Demo Citizen',
      email: 'demo.citizen@smartbharat.gov.in',
      photoURL: 'https://api.dicebear.com/7.x/adventurer/svg?seed=demo',
      emailVerified: true,
    };
    setUser(mockUser);
    localStorage.setItem('sb-mock-user', JSON.stringify(mockUser));
    return mockUser;
  };

  const loginWithEmail = async (email, password) => {
    const displayName = email.split('@')[0].toUpperCase();
    const mockUser = {
      uid: 'demo-user-email',
      displayName: displayName || 'Demo Citizen',
      email: email,
      photoURL: null,
      emailVerified: true,
    };
    setUser(mockUser);
    localStorage.setItem('sb-mock-user', JSON.stringify(mockUser));
    return mockUser;
  };

  const registerWithEmail = async (name, email, password) => {
    const mockUser = {
      uid: 'demo-user-register',
      displayName: name,
      email: email,
      photoURL: null,
      emailVerified: true,
    };
    setUser(mockUser);
    localStorage.setItem('sb-mock-user', JSON.stringify(mockUser));
    return mockUser;
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('sb-mock-user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, loginWithEmail, registerWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
