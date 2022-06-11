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

  const logout = () => {
    setUser({
      email: '',
      token: '',
    });

    localStorage.removeItem('user');
  };

  const data = {
    user,
    login,
    logout,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
