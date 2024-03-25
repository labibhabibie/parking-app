import React, { createContext, useState } from 'react';

interface AuthContextProps {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextProps>({
  token: '',
  setToken: () => {},
});

const AuthProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [token, setToken] = useState('');

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
