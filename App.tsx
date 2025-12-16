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
import { useEffect } from 'react';

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
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <ThemeSynchronizer />
        <SafeAreaProvider>
          <AppNavigator />
          <GlobalBottomSheet />
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
