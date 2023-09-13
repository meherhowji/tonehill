import React from 'react';
import {View, Text, SectionList, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {observer} from 'mobx-react-lite';
import {settingsData, settingsConfig} from '../components/settings/settingsData';

const SettingsScreen = observer(() => {
  const renderItemComponent = (item: string) => {
    const component = settingsConfig.find(config => config.name === item);
    return component ? component.component : null;
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={css.safeContainer}>
        <View style={css.settingContainer}>
          <SectionList
            keyExtractor={(item, index) => item + index}
            renderSectionHeader={({section: {title}}) => <Text style={css.header}>{title}</Text>}
            stickySectionHeadersEnabled={false}
            sections={settingsData}
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
    // marginTop: 30,
    // paddingBottom: 0,
    // marginBottom: 30,
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
