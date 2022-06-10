import { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : {
          email: '',
          token: '',
        }
  );

  const login = (user) => {
    setUser((prev) => {
      return { ...prev, ...user };
    });

    localStorage.setItem('user', JSON.stringify(user));
  };

  const data = {
    user,
    login,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
