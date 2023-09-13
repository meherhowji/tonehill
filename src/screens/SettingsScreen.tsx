import React from 'react';
import {View, Text, SectionList, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {useRootStore} from '../stores/RootStoreProvider';
import LinearGradient from 'react-native-linear-gradient';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {observer} from 'mobx-react-lite';
import {SHARP, FLAT} from '../utils/constants';

const DATA = [
  {
    title: 'Display',
    data: ['Accidental', 'Octave', 'Cents', 'Frequency'],
  },
  {
    title: 'Tuner',
    data: ['In-Tune Range', 'Mic Sensitivity'],
  },
  {
    title: 'Stats',
    data: ['Delete Stats', 'Delete All Stats'],
  },
  {
    title: 'About App',
    data: ['Share with Friends', 'Leave a Review', 'Contact', 'FAQ', 'Reset Settings'],
  },
  {
    title: 'Account',
    data: ['Log Out', 'Delete Data', 'Delete Account'],
  },
];

const SettingsScreen = observer(() => {
  const {commonStore} = useRootStore();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeContainer}>
        <LinearGradient colors={['rgb(2,8,15)', 'rgb(11,18,28)', 'rgb(2,8,15)']} style={styles.gradient}>
          <View style={styles.settingContainer}>
            <SectionList
              sections={DATA}
              style={styles.settingList}
              keyExtractor={(item, index) => item + index}
              stickySectionHeadersEnabled={false}
              renderItem={({item, index, section}) => {
                // add rounded borders on top and bottom
                const firstItemStyle = index === 0 && styles.firstItem;
                const lastItemStyle = index === section.data.length - 1 && styles.lastItem;
                return (
                  <TouchableOpacity>
                    <View style={[styles.item, firstItemStyle, lastItemStyle]}>
                      <View>
                        <Text style={styles.itemTitle}>{item}</Text>
                      </View>
                      <View style={styles.control}>
                        {item === 'Accidental' && (
                          <SegmentedControl
                            style={styles.segmentedControl}
                            values={[SHARP, FLAT]}
                            selectedIndex={commonStore.accidental === SHARP ? 0 : 1}
                            onChange={event => {
                              let _selectedIndex = event.nativeEvent.selectedSegmentIndex;
                              _selectedIndex === 1 ? commonStore.setFlatAccidental() : commonStore.setSharpAccidental();
                            }}
                          />
                        )}
                        {item === 'Octave' && <Text style={styles.settingValue}>Show</Text>}
                        {item === 'Cents' && <Text style={styles.settingValue}>Show</Text>}
                        {item === 'Frequency' && <Text style={styles.settingValue}>Hide</Text>}
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
              renderSectionHeader={({section: {title}}) => <Text style={styles.header}>{title}</Text>}
            />
          </View>
        </LinearGradient>
      </SafeAreaView>
    </SafeAreaProvider>
  );
});

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: 'rgb(2,8,15)',
  },
  settingContainer: {
    // flex: 1,
    // backgroundColor: 'red',
  },
  settingList: {
    padding: 20,
    // flexDirection: 'column',
  },
  firstItem: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  lastItem: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  item: {
    backgroundColor: 'rgb(38,38,38)',
    height: 50,
    paddingLeft: 18,
    paddingRight: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Inter-Medium',
  },
  segmentedControl: {
    borderWidth: 0,
    marginRight: -2,
  },
  control: {
    width: '30%',
  },
  settingValue: {
    color: 'white',
    fontSize: 18,
    alignSelf: 'flex-end',
  },
  header: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 10,
    marginTop: 30,
  },
  gradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
});

export default SettingsScreen;
