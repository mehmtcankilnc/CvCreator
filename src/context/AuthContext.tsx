import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { storageService } from '../utilities/tokenStorage';
import { API_BASE_URL, GOOGLE_CLIENT_ID } from '@env';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  email: string;
  userName: string;
  isGuest: boolean;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginGuest: () => Promise<boolean>;
  loginGoogle: () => Promise<boolean>;
  logout: () => Promise<boolean>;
  getUser: () => Promise<void>;
  authenticatedFetch: (url: string, options?: RequestInit) => Promise<Response>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadtoken = async () => {
      const storedToken = await storageService.getAccessToken();
      if (storedToken) {
        setAccessToken(storedToken);
      }
      setIsLoading(false);
    };
    loadtoken();

    GoogleSignin.configure({
      webClientId: GOOGLE_CLIENT_ID,
      offlineAccess: true,
    });
  }, []);

  useEffect(() => {
    if (accessToken) {
      try {
        const decoded: any = jwtDecode(accessToken);

        setUser({
          id: decoded.sub || decoded.nameid,
          email: decoded.email,
          userName: decoded.username || decoded.given_name,
          isGuest: decoded.is_guest === 'true',
        });
      } catch (error) {
        console.error('Token Decode Edilemedi: ', error);
        setUser(null);
      }
    }
  }, [accessToken]);

  const loginGuest = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/anonymous-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return false;
      }

      const data: AuthResponse = await response.json();

      setAccessToken(data.accessToken);
      await storageService.setAccessToken(data.accessToken);
      await storageService.setRefreshToken(data.refreshToken);
      return true;
    } catch (error) {
      console.error('Misafir Giriş Hatası: ', error);
      return false;
    }
  };

  const loginGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken;

      if (!idToken) throw new Error('Google ID Token Alınamadı');

      const response = await fetch(`${API_BASE_URL}/auth/google-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        return false;
      }

      const data: AuthResponse = await response.json();

      setAccessToken(data.accessToken);
      await storageService.setAccessToken(data.accessToken);
      await storageService.setRefreshToken(data.refreshToken);
      return true;
    } catch (error) {
      console.error('Google Giriş Hatası:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      setAccessToken(null);
      await storageService.removeAccessToken();

      await GoogleSignin.signOut();
      return true;
    } catch (error) {
      console.error('Çıkış Hatası:', error);
      return false;
    }
  };

  const getUser = async () => {
    try {
      const currentToken = await storageService.getAccessToken();
      if (!currentToken) return;

      const response = await authenticatedFetch('/auth/user', {
        method: 'GET',
      });

      if (!response.ok) {
        if (response.status === 401) await logout();
      }

      const userData: User = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Kullanıcı Verisi Çekme Hatası: ', error);
    }
  };

  const refreshTokenLogic = async (): Promise<string | null> => {
    try {
      const currentAccessToken = await storageService.getAccessToken();
      const currentRefreshToken = await storageService.getRefreshToken();

      if (!currentAccessToken || !currentRefreshToken) return null;

      const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessToken: currentAccessToken,
          refreshToken: currentRefreshToken,
        }),
      });

      if (!response.ok) throw new Error('Refresh Başarısız Oldu');

      const data: AuthResponse = await response.json();
      await storageService.setAccessToken(data.accessToken);
      await storageService.setRefreshToken(data.refreshToken);
      setAccessToken(data.accessToken);
      return data.accessToken;
    } catch (error) {
      console.error('Token Yenilenemedi, çıkış yapılıyor... ', error);
      await logout();
      return null;
    }
  };

  const authenticatedFetch = async (
    endpoint: string,
    options: RequestInit = {},
  ) => {
    let currentAccessToken = accessToken;

    let response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${currentAccessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      const newAccessToken = await refreshTokenLogic();

      if (newAccessToken) {
        response = await fetch(`${API_BASE_URL}${endpoint}`, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${newAccessToken}`,
            'Content-Type': 'application/json',
          },
        });
      }
    }

    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        token: accessToken,
        user,
        isAuthenticated: !!accessToken,
        isLoading,
        loginGuest,
        loginGoogle,
        logout,
        getUser,
        authenticatedFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
