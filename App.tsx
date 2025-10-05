import './global.css';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNav from './src/navigation/DrawerNav';
import AuthStack from './src/navigation/AuthStack';
import CreateResume from './src/screens/CreateResume';
import CreateCoverLetter from './src/screens/CreateCoverLetter';
import Templates from './src/screens/Templates';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="App"
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        <Stack.Screen name="App" component={DrawerNav} />
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="CreateResume" component={CreateResume} />
        <Stack.Screen name="CreateCoverLetter" component={CreateCoverLetter} />
        <Stack.Screen name="Templates" component={Templates} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
