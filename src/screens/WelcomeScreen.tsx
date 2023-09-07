import React, {useState} from 'react';
import {Dimensions, StatusBar, ScrollView, View, Text, StyleSheet, PixelRatio, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const WelcomeScreen: React.FC = ({navigation}) => {
  const [sliderState, setSliderState] = useState({currentPage: 0});
  const {width, height} = Dimensions.get('window');

  const goToHomeScreen = () => {
    navigation.navigate('Home'); // Navigate to the 'Details' screen
  };

  const setSliderPage = (event: any) => {
    const {currentPage} = sliderState;
    const {x} = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  const {currentPage: pageIndex} = sliderState;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          style={{flex: 1}}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={(event: any) => {
            setSliderPage(event);
          }}>
          <View style={{width, height}}>
            <View style={styles.square} />
            <View style={styles.wrapper}>
              <Text style={styles.header}>Nature Imitates Art</Text>
              <Text style={styles.paragraph}>....something like that</Text>
            </View>
          </View>
          <View style={{width, height}}>
            <View style={styles.square} />
            <View style={styles.wrapper}>
              <Text style={styles.header}>High quality Art work</Text>
              <Text style={styles.paragraph}>... for a fraction of the price</Text>
            </View>
          </View>
          <View style={{width, height}}>
            <View style={styles.square} />
            <View style={styles.wrapper}>
              <Text style={styles.header}>Top Notch Artists</Text>
              <Text style={styles.paragraph}>... all in one place</Text>
            </View>
          </View>
          <View style={{width, height}}>
            <View style={styles.square} />
            <View style={styles.wrapper}>
              <Text style={styles.header}>Best deal on the market</Text>
              <Text style={styles.paragraph}>... let's find your next art</Text>
            </View>
          </View>
          <View style={{width, height}}>
            <View style={styles.wrapper}>
              <Text style={styles.header}>It's all about art</Text>
              <Text style={styles.paragraph}>... seriously, it is</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.paginationWrapper}>
          {Array.from(Array(5).keys()).map((key, index) => (
            <View style={[styles.paginationDots, {opacity: pageIndex === index ? 1 : 0.2}]} key={index} />
          ))}
        </View>
        <View style={styles.skipSection}>
          <TouchableOpacity style={styles.skipBtn} onPress={goToHomeScreen}>
            <Text style={styles.skipBtnTxt}>Skip</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(135),
    width: '100%',
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 17,
  },
  paginationWrapper: {
    position: 'absolute',
    bottom: 200,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#0898A0',
    marginLeft: 10,
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
  skipSection: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  skipBtn: {
    backgroundColor: 'gold',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  skipBtnTxt: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
});

export default WelcomeScreen;
