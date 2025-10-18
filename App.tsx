/* eslint-disable react-native/no-inline-styles */
import './global.css';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import DrawerNav from './src/navigation/DrawerNav';
import AuthStack from './src/navigation/AuthStack';
import CreateResume from './src/screens/CreateResume';
import CreateCoverLetter from './src/screens/CreateCoverLetter';
import Templates from './src/screens/Templates';

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: 'white' }}
        edges={['bottom', 'left', 'right']}
      >
        <NavigationContainer>
          <StatusBar backgroundColor="#1810C2" barStyle="light-content" />
          <Stack.Navigator
            initialRouteName="App"
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="App" component={DrawerNav} />
            <Stack.Screen name="Auth" component={AuthStack} />
            <Stack.Screen name="CreateResume" component={CreateResume} />
            <Stack.Screen
              name="CreateCoverLetter"
              component={CreateCoverLetter}
            />
            <Stack.Screen name="Templates" component={Templates} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
