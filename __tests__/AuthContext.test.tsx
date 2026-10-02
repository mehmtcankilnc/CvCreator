import React from 'react';
import { Text } from 'react-native';
import renderer, { act } from 'react-test-renderer';

type AuthListener = (event: string, session: unknown) => void;

const mockListeners: AuthListener[] = [];
const mockAuth = {
  getSession: jest.fn(),
  signInAnonymously: jest.fn(),
  signOut: jest.fn(),
  signInWithIdToken: jest.fn(),
  onAuthStateChange: jest.fn((listener: AuthListener) => {
    mockListeners.push(listener);
    return { data: { subscription: { unsubscribe: jest.fn() } } };
  }),
};
const mockStorage: Record<string, string> = {};

jest.mock('../src/lib/supabase', () => ({
  supabase: {
    get auth() {
      return mockAuth;
    },
  },
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(async (key: string) => mockStorage[key] ?? null),
    setItem: jest.fn(),
  },
}));

jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    signOut: jest.fn(async () => {}),
    hasPlayServices: jest.fn(),
    signIn: jest.fn(),
  },
}));

import AuthProvider, { useAuth } from '../src/context/AuthContext';

const guestSession = {
  user: { id: 'u1', email: '', is_anonymous: true, user_metadata: {} },
};

let latest: ReturnType<typeof useAuth>;

const Probe = () => {
  latest = useAuth();
  return <Text>{latest.user ? latest.user.id : 'none'}</Text>;
};

const mountProvider = async () => {
  await act(async () => {
    renderer.create(
      <AuthProvider>
        <Probe />
      </AuthProvider>,
    );
  });
  await act(async () => {
    await new Promise<void>(resolve => setTimeout(resolve, 10));
  });
};

const emit = async (event: string, session: unknown) => {
  await act(async () => {
    mockListeners.forEach(listener => listener(event, session));
    await new Promise<void>(resolve => setTimeout(resolve, 10));
  });
};

beforeEach(() => {
  jest.clearAllMocks();
  mockListeners.length = 0;
  Object.keys(mockStorage).forEach(key => delete mockStorage[key]);
  mockAuth.getSession.mockResolvedValue({ data: { session: null } });
  mockAuth.signInAnonymously.mockResolvedValue({ error: null });
  mockAuth.signOut.mockResolvedValue({ error: null });
});

describe('AuthProvider session recovery', () => {
  it('keeps an existing session and does not sign in again', async () => {
    mockStorage.hasShowedOnboarding = 'true';
    mockAuth.getSession.mockResolvedValue({ data: { session: guestSession } });

    await mountProvider();

    expect(latest.user?.id).toBe('u1');
    expect(latest.user?.isGuest).toBe(true);
    expect(latest.isLoading).toBe(false);
    expect(mockAuth.signInAnonymously).not.toHaveBeenCalled();
  });

  it('does not sign in on the very first launch before onboarding', async () => {
    await mountProvider();

    expect(latest.isLoading).toBe(false);
    expect(mockAuth.signInAnonymously).not.toHaveBeenCalled();
  });

  it('restores a guest session when a onboarded user has no session at start', async () => {
    mockStorage.hasShowedOnboarding = 'true';

    await mountProvider();

    expect(mockAuth.signInAnonymously).toHaveBeenCalledTimes(1);
  });

  it('restores a guest session when the session is lost while running', async () => {
    mockStorage.hasShowedOnboarding = 'true';
    mockAuth.getSession.mockResolvedValue({ data: { session: guestSession } });
    await mountProvider();
    mockAuth.getSession.mockResolvedValue({ data: { session: null } });

    await emit('SIGNED_OUT', null);

    expect(mockAuth.signInAnonymously).toHaveBeenCalledTimes(1);
  });

  it('does not restore a guest session after an explicit logout', async () => {
    mockStorage.hasShowedOnboarding = 'true';
    mockAuth.getSession.mockResolvedValue({ data: { session: guestSession } });
    await mountProvider();
    mockAuth.signOut.mockImplementation(async () => {
      mockListeners.forEach(listener => listener('SIGNED_OUT', null));
      return { error: null };
    });
    mockAuth.getSession.mockResolvedValue({ data: { session: null } });

    await act(async () => {
      await latest.logout();
      await new Promise<void>(resolve => setTimeout(resolve, 10));
    });

    expect(mockAuth.signInAnonymously).not.toHaveBeenCalled();
  });

  it('stops loading even if reading the session fails', async () => {
    mockAuth.getSession.mockRejectedValue(new Error('storage failure'));

    await mountProvider();

    expect(latest.isLoading).toBe(false);
  });

  it('does not create duplicate guest sessions for simultaneous triggers', async () => {
    mockStorage.hasShowedOnboarding = 'true';
    let signedIn = false;
    mockAuth.getSession.mockImplementation(async () => ({
      data: { session: signedIn ? guestSession : null },
    }));
    mockAuth.signInAnonymously.mockImplementation(
      () =>
        new Promise(resolve =>
          setTimeout(() => {
            signedIn = true;
            resolve({ error: null });
          }, 60),
        ),
    );

    await mountProvider();
    await emit('SIGNED_OUT', null);
    await emit('SIGNED_OUT', null);

    expect(mockAuth.signInAnonymously).toHaveBeenCalledTimes(1);
  });
});
