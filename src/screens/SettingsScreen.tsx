import React, {useCallback} from 'react';
import {View, Text, SectionList, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {settingsData, settingsConfig} from '../components/settings/settingsData';
import {screenBg} from '../styles/globals';
import {BlurView} from '@react-native-community/blur';

const SettingsScreen = () => {
  const renderItemComponent = (item: string) => {
    const component = settingsConfig.find(config => config.name === item);
    return component ? component.component : null;
  };

  const Header = useCallback(() => <Text style={css.settingHeader}>Settings</Text>, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={css.safeContainer}>
        <SectionList
          contentContainerStyle={css.settingList}
          keyExtractor={(item, index) => item + index}
          renderSectionHeader={({section: {title}}) => <Text style={css.header}>{title}</Text>}
          stickySectionHeadersEnabled={false}
          sections={settingsData}
          ListHeaderComponent={Header}
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const css = StyleSheet.create({
  safeContainer: {
    flex: 1,
    ...screenBg,
  },
  settingList: {
    padding: 20,
    paddingBottom: 50,
    paddingTop: 50,
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
  blurView: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: 300,
  },
});

export default SettingsScreen;
