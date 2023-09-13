import React from 'react';
import {View, Text, SectionList, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {observer} from 'mobx-react-lite';
import {
  InTuneRangeDropdown,
  AccidentalSwitch,
  CentsDropdown,
  FrequencyDropdown,
  OctaveDropdown,
} from '../components/settings/';

const DATA = [
  {
    title: 'Display',
    data: ['Accidental', 'Octave', 'Cents', 'Frequency'],
  },
  {
    title: 'Tuner',
    data: ['In-Tune Range'],
    // data: ['In-Tune Range', 'Mic Sensitivity'],
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

const settingsConfig = [
  {name: 'Accidental', component: <AccidentalSwitch />},
  {name: 'In-Tune Range', component: <InTuneRangeDropdown />},
  {name: 'Cents', component: <CentsDropdown />},
  {name: 'Frequency', component: <FrequencyDropdown />},
  {name: 'Octave', component: <OctaveDropdown />},
];

const SettingsScreen = observer(() => {
  const renderItemComponent = (item: string) => {
    const component = settingsConfig.find(config => config.name === item);
    return component ? component.component : null;
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={css.safeContainer}>
        <LinearGradient colors={['rgb(2,8,15)', 'rgb(11,18,28)', 'rgb(2,8,15)']} style={css.gradient}>
          <View style={css.settingContainer}>
            <SectionList
              keyExtractor={(item, index) => item + index}
              renderSectionHeader={({section: {title}}) => <Text style={css.header}>{title}</Text>}
              stickySectionHeadersEnabled={false}
              sections={DATA}
              style={css.settingList}
              ListHeaderComponent={() => <Text style={css.settingHeader}>Settings</Text>}
              CellRendererComponent={({children, index, style, ...props}) => {
                return (
                  <View style={[style, {zIndex: -1 * index}]} index={index} {...props}>
                    {/* static value doesn't work, somehow using the dynamic index makes zindex work  */}
                    {children}
                  </View>
                );
              }}
              renderItem={({item, index, section}) => {
                const firstItemStyle = index === 0 && css.firstItem;
                const lastItemStyle = index === section.data.length - 1 && css.lastItem;
                return (
                  <View style={[css.item, firstItemStyle, lastItemStyle]}>
                    <Text style={css.itemTitle}>{item}</Text>
                    <View style={css.control}>{renderItemComponent(item)}</View>
                  </View>
                );
              }}
            />
          </View>
        </LinearGradient>
      </SafeAreaView>
    </SafeAreaProvider>
  );
});

const css = StyleSheet.create({
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
    marginTop: 30,
    flexDirection: 'column',
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
  settingHeader: {
    fontSize: 45,
    color: 'white',
    fontFamily: 'Inter-Bold',
  },
});

export default SettingsScreen;
