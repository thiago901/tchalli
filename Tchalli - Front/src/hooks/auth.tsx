import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}
interface SignInCredentials {
  email: string;
  password: string;
}
interface AuthContextData {
  user: object;
  signin(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('@Broadcast:user');
    const token = localStorage.getItem('@Broadcast:token');

    if (user && token) {
      api.defaults.headers.authorization = `bearer ${token}`;
      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as AuthState;
  });
  const signin = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });
    const { user, token } = response.data;
    localStorage.setItem('@Broadcast:token', token);
    localStorage.setItem('@Broadcast:user', JSON.stringify(user));

    api.defaults.headers.authorization = `bearer ${token}`;

    setData({ user, token });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Broadcast:user');
    localStorage.removeItem('@Broadcast:token');

    setData({} as AuthState);
  }, []);
  return (
    <AuthContext.Provider value={{ user: data.user, signin, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an authProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
