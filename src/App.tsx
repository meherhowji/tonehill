import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen, WelcomeScreen} from './screens';

// const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      </Stack.Navigator> */}
      <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName="Welcome">
        <Tab.Screen name="Practice" component={HomeScreen} />
        <Tab.Screen name="Stats" component={HomeScreen} />
        <Tab.Screen name="Recordings" component={HomeScreen} />
        <Tab.Screen name="Settings" component={WelcomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
