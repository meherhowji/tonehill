import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {PracticeScreen, StatsScreen, RecordingsScreen, SettingsScreen} from './';
// https://github.com/oblador/react-native-vector-icons/issues/1074#issuecomment-534053163
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// import {BlurView} from '@react-native-community/blur';
import {screenBg} from '../styles/globals';

const Tab = createBottomTabNavigator();

interface IconProps {
  name: string;
  focused: boolean;
}

const Icon: React.FC<IconProps> = ({name, focused}) => (
  <FontAwesome6 name={name} size={16} color={focused ? 'white' : 'gray'} />
);

function MainScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          // remove this if enabling the blur option
          ...screenBg,
          paddingHorizontal: 5,
          paddingTop: 0,
          borderTopWidth: 0,
          // position: 'absolute',
        },
        // removing the blur option as there is no way to control the color/tint of the background color
        // tabBarBackground: () => (
        //   <BlurView
        //     style={{
        //       position: 'absolute',
        //       left: 0,
        //       bottom: 0,
        //       width: '100%',
        //       height: 85,
        //     }}
        //     blurType="dark"
        //     blurAmount={10}
        //     reducedTransparencyFallbackColor="white"
        //   />
        // ),
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Inter-Medium',
        },
        tabBarActiveTintColor: 'white',
      }}
      initialRouteName="Practice">
      <Tab.Screen
        name="Practice"
        component={PracticeScreen}
        options={{
          tabBarIcon: ({focused}) => <Icon name={'music'} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarIcon: ({focused}) => <Icon name={'chart-simple'} focused={focused} />,
        }}
      />
      {/* <Tab.Screen
        name="Recordings"
        component={RecordingsScreen}
        options={{
          tabBarIcon: ({focused}) => <Icon name="microphone" focused={focused} />,
          tabBarLabelStyle: {opacity: 0.5},
          tabBarIconStyle: {opacity: 0.5},
        }}
        listeners={{
          tabPress: e => {
            e.preventDefault();
          },
        }}
      /> */}
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({focused}) => <Icon name="sliders" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default MainScreen;
