import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GOOGLE_CLIENT_ID } from '@env';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  userName: string;
  isGuest: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginGuest: () => Promise<boolean>;
  loginGoogle: () => Promise<boolean>;
  logout: () => Promise<boolean>;
  getUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mapUser = (supabaseUser: SupabaseUser): User => {
  const metadata = supabaseUser.user_metadata ?? {};
  const email = supabaseUser.email ?? '';

  return {
    id: supabaseUser.id,
    email,
    userName: metadata.full_name || metadata.name || email,
    isGuest: !!supabaseUser.is_anonymous,
  };
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isSigningOut = useRef(false);
  const restoring = useRef<Promise<void> | null>(null);

  const restoreGuestSession = useCallback(() => {
    if (restoring.current) return restoring.current;

    restoring.current = (async () => {
      try {
        const onboarded = await AsyncStorage.getItem('hasShowedOnboarding');
        if (!onboarded) return;

        const { data } = await supabase.auth.getSession();
        if (data.session) return;

        const { error } = await supabase.auth.signInAnonymously();
        if (error) throw error;
      } catch (error) {
        console.error('Oturum geri yüklenemedi: ', error);
      } finally {
        restoring.current = null;
      }
    })();

    return restoring.current;
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_CLIENT_ID,
      offlineAccess: true,
    });

    supabase.auth
      .getSession()
      .then(({ data }) => {
        setSession(data.session);
        if (!data.session) restoreGuestSession();
      })
      .catch(error => console.error('Oturum okunamadı: ', error))
      .finally(() => setIsLoading(false));

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);

        if (event === 'SIGNED_OUT' && !isSigningOut.current) {
          setTimeout(restoreGuestSession, 0);
        }
      },
    );

    const appStateSubscription = AppState.addEventListener('change', state => {
      if (state === 'active') restoreGuestSession();
    });

    return () => {
      listener.subscription.unsubscribe();
      appStateSubscription.remove();
    };
  }, [restoreGuestSession]);

  const user = useMemo(
    () => (session?.user ? mapUser(session.user) : null),
    [session],
  );

  const loginGuest = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signInAnonymously();
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Misafir Giriş Hatası: ', error);
      return false;
    }
  }, []);

  const loginGoogle = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken;

      if (!idToken) throw new Error('Google ID Token Alınamadı');

      const { error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: idToken,
      });
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Google Giriş Hatası:', error);
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    isSigningOut.current = true;
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      try {
        await GoogleSignin.signOut();
      } catch (googleError) {
        console.warn('Google çıkış uyarısı:', googleError);
      }
      return true;
    } catch (error) {
      console.error('Çıkış Hatası:', error);
      return false;
    } finally {
      isSigningOut.current = false;
    }
  }, []);

  const getUser = useCallback(async () => {
    try {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    } catch (error) {
      console.error('Kullanıcı Verisi Çekme Hatası: ', error);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!session,
      isLoading,
      loginGuest,
      loginGoogle,
      logout,
      getUser,
    }),
    [user, session, isLoading, loginGuest, loginGoogle, logout, getUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
