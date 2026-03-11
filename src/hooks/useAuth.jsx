import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

const VALID_CREDENTIALS = [
  { email: 'fm@operon.ai', password: 'demo2026', name: 'Facility Manager' },
  { email: 'jll@demo.com', password: 'jll2026', name: 'JLL Facility Manager' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = useCallback((email, password) => {
    const match = VALID_CREDENTIALS.find(
      c => c.email.toLowerCase() === email.toLowerCase() && c.password === password
    );
    if (match) {
      setUser({ email: match.email, name: match.name });
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
