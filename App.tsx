/* eslint-disable react-native/no-inline-styles */
import './global.css';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GlobalBottomSheet from './src/components/GlobalBottomSheet';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SafeAreaProvider>
          <AppNavigator />
          <GlobalBottomSheet />
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
