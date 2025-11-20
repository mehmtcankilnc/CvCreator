import { Linking } from 'react-native';

const config = {
  screens: {
    App: {
      screens: {
        Home: 'home',
        Settings: 'settings',
      },
    },
    Onboarding: {
      screens: {
        Onboarding1: 'onboarding1',
        Onboarding2: 'onboarding2',
      },
    },
  },
};

const linking = {
  prefixes: ['cvcreator://'],
  config,
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (url != null) {
      return url;
    }
    return undefined;
  },
  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({ url }: { url: string }) => listener(url);
    const subscription = Linking.addEventListener('url', onReceiveURL);
    return () => {
      subscription.remove();
    };
  },
};

export default linking;
