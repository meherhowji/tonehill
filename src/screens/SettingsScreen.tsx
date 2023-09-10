import React from 'react';
import {View, Button} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {useRootStore} from '../stores/RootStoreProvider';
import {styles} from '../styles/styles';

const SettingsScreen = () => {
  const {commonStore} = useRootStore();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeContainer}>
        <View>
          <Button onPress={() => commonStore.setFlatAccidental()} title="Use Flats" />
          <Button onPress={() => commonStore.setSharpAccidental()} title="Use Sharps" />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default SettingsScreen;
