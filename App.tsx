/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import './global.css';
import Home from './src/screens/app/Home';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Settings from './src/screens/app/Settings';
import MyResumes from './src/screens/app/MyResumes';
import MyCoverLetters from './src/screens/app/MyCoverLetters';
import Info from './src/screens/app/Info';

const Drawer = createDrawerNavigator();

type RootDrawerParamList = { Home: undefined };

function HeaderMenuButton() {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  return (
    <Ionicons
      name="menu"
      size={24}
      color="white"
      style={{ marginLeft: 18, marginBottom: 8 }}
      onPress={() => navigation.toggleDrawer()}
    />
  );
}

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#1810C2', height: 100 },
          headerTitle: 'CV Creator',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: 'white',
            marginBottom: 12,
            fontSize: 28,
            fontFamily: 'Kavoon-Regular',
          },
          headerLeft: () => <HeaderMenuButton />,
          drawerActiveBackgroundColor: 'white',
          drawerActiveTintColor: '#1810C2',
          drawerInactiveBackgroundColor: '#1810C2',
          drawerInactiveTintColor: 'white',
          drawerType: 'slide',
          drawerStyle: {
            backgroundColor: '#1810C2',
          },
          drawerLabelStyle: {
            fontSize: 18,
            fontFamily: 'Kavoon-Regular',
          },
        }}
      >
        <Drawer.Screen
          options={{
            drawerIcon: ({ focused }) => (
              <Ionicons
                name="home-outline"
                size={24}
                color={focused ? '#1810C2' : 'white'}
              />
            ),
            drawerLabel: 'Home',
          }}
          name="Home"
          component={Home}
        />
        <Drawer.Screen
          options={{
            drawerIcon: ({ focused }) => (
              <Ionicons
                name="folder-open-outline"
                size={24}
                color={focused ? '#1810C2' : 'white'}
              />
            ),
            drawerLabel: 'My Resumes',
          }}
          name="MyResumes"
          component={MyResumes}
        />
        <Drawer.Screen
          options={{
            drawerIcon: ({ focused }) => (
              <Ionicons
                name="newspaper-outline"
                size={24}
                color={focused ? '#1810C2' : 'white'}
              />
            ),
            drawerLabel: 'My Cover Letters',
          }}
          name="MyCoverLetters"
          component={MyCoverLetters}
        />
        <Drawer.Screen
          options={{
            drawerIcon: ({ focused }) => (
              <Ionicons
                name="settings-outline"
                size={24}
                color={focused ? '#1810C2' : 'white'}
              />
            ),
            drawerLabel: 'Settings',
          }}
          name="Settings"
          component={Settings}
        />
        <Drawer.Screen
          options={{
            drawerIcon: ({ focused }) => (
              <Ionicons
                name="information-circle-outline"
                size={24}
                color={focused ? '#1810C2' : 'white'}
              />
            ),
            drawerLabel: 'About',
          }}
          name="About"
          component={Info}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
