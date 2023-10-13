import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainScreen, SplashScreen, AuthScreen} from './screens';
import {RootStoreProvider} from './stores';
import {GridOverlay} from 'react-native-grid-overlay';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RootStoreProvider>
      <GridOverlay color={'white'} opacity={0.5} stepSize={5} height={50} width={50} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </RootStoreProvider>
  );
}
