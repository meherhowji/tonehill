import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainScreen, SplashScreen, AuthScreen} from './screens';
import {RootStoreProvider} from './stores/RootStoreProvider';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RootStoreProvider>
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
