import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen, StatsScreen, RecordingsScreen, SettingsScreen} from './';

const Tab = createBottomTabNavigator();

function MainScreen() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName="Practice">
      <Tab.Screen name="Practice" component={HomeScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Recordings" component={RecordingsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default MainScreen;
