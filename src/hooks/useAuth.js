import { useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const login = (role) => {
    setUser(role);
    localStorage.setItem('user', role);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return { user, login, logout };
};
