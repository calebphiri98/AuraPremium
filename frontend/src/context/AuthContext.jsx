import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('auth_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
  try {
    const response = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const result = await response.json();
    console.log("Full Login Response:", result); // ADD THIS LOG

    if (result.success === true && result.user) {
      setUser(result.user);
      localStorage.setItem('auth_user', JSON.stringify(result.user));
      return true;
    }
    return false;
  } catch (err) {
    console.error("Login process error:", err);
    throw err;
  }
};

  const signup = async (name, email, password, role = 'user') => {
    try {
      // FIXED: Pointing to /api/users/register based on your server.js route configuration
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });
      
      const result = await response.json();
      
      if (result.success && result.user) {
        setUser(result.user);
        localStorage.setItem('auth_user', JSON.stringify(result.user));
        return true;
      }
      return result.success;
    } catch (err) {
      console.error("Signup error:", err);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be wrapped inside an AuthProvider');
  }
  return context;
};