/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import { Pressable, Text } from 'react-native';
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Home from '../screens/app/Home';
import MyResumes from '../screens/app/MyResumes';
import MyCoverLetters from '../screens/app/MyCoverLetters';
import About from '../screens/app/About';
import Settings from '../screens/app/Settings';
import { useAppSelector } from '../store/hooks';

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  const isUserAnon = useAppSelector(state => state.auth.isAnonymous);
  const username = useAppSelector(state =>
    state.auth.isAnonymous ? '' : state.auth.userName ?? '',
  );

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: 'white',
        drawerActiveTintColor: '#1810C2',
        drawerInactiveBackgroundColor: '#1810C2',
        drawerInactiveTintColor: 'white',
        drawerType: 'slide',
        drawerStyle: {
          backgroundColor: '#1810C2',
        },
        drawerLabelStyle: {
          fontSize: wp(5),
          fontFamily: 'Kavoon-Regular',
        },
      }}
      drawerContent={props => (
        <DrawerContentScrollView {...props}>
          {isUserAnon ? (
            <Pressable onPress={() => props.navigation.navigate('Settings')}>
              <Text
                style={{
                  fontSize: hp(2),
                  color: 'white',
                  fontFamily: 'Kavoon-Regular',
                  lineHeight: hp(5),
                  textAlign: 'center',
                  paddingBottom: hp(2),
                }}
              >
                Guest{'\n'}
                <Text className="underline">Link your account</Text>
              </Text>
            </Pressable>
          ) : (
            <Text
              style={{
                fontSize: hp(2),
                color: 'white',
                fontFamily: 'Kavoon-Regular',
                lineHeight: hp(5),
                textAlign: 'center',
                paddingBottom: hp(2),
              }}
            >
              Hello, {username}
            </Text>
          )}

          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen
        options={{
          drawerIcon: ({ focused }) => (
            <Ionicons
              name="home-outline"
              size={wp(6)}
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
              size={wp(6)}
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
              size={wp(6)}
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
              size={wp(6)}
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
              size={wp(6)}
              color={focused ? '#1810C2' : 'white'}
            />
          ),
          drawerLabel: 'About',
        }}
        name="About"
        component={About}
      />
    </Drawer.Navigator>
  );
}
