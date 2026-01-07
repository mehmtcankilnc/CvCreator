/* eslint-disable react-native/no-inline-styles */
import './global.css';
import './src/utilities/i18n';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GlobalBottomSheet from './src/components/GlobalBottomSheet';
import { useAppSelector } from './src/store/hooks';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import UpdateAppModal from './src/components/UpdateAppModal';

const CURRENT_VERSION = '1.0';
const VERSION_URL =
  'https://raw.githubusercontent.com/mehmtcankilnc/CvCreator/main/version.json';

const compareVersions = (v1: string, v2: string) => {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);
  for (let index = 0; index < Math.max(parts1.length, parts2.length); index++) {
    const p1 = parts1[index] || 0;
    const p2 = parts2[index] || 0;
    if (p1 > p2) return 1;
    if (p1 < p2) return -1;
  }
  return 0;
};

const ThemeSynchronizer = () => {
  const theme = useAppSelector(state => state.theme.theme);
  const { colorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    const newColorScheme = theme.toLowerCase();
    if (
      newColorScheme !== colorScheme &&
      (newColorScheme === 'light' || newColorScheme === 'dark')
    ) {
      setColorScheme(newColorScheme);
    }
  }, [theme, colorScheme, setColorScheme]);

  return null;
};

function App() {
  const [storeUrl, setStoreUrl] = useState('');
  const [isUpdateRequired, setIsUpdateRequired] = useState(false);

  useEffect(() => {
    const checkVersion = async () => {
      try {
        const response = await fetch(VERSION_URL);
        if (response.ok) {
          const data = await response.json();

          const latestVersion = data.version;
          const url = data.storeUrl;

          if (
            latestVersion &&
            compareVersions(latestVersion, CURRENT_VERSION) > 0
          ) {
            setStoreUrl(url);
            setIsUpdateRequired(true);
          }
        }
      } catch (error) {
        console.error('Version check failed: ', error);
      }
    };
    checkVersion();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <ThemeSynchronizer />
        <SafeAreaProvider>
          <AppNavigator />
          <GlobalBottomSheet />
          <UpdateAppModal visible={isUpdateRequired} storeUrl={storeUrl} />
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
