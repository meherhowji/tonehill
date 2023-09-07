import React, {useRef} from 'react';
import {View, Text, StyleSheet, Animated, Easing, TouchableOpacity} from 'react-native';

const WelcomeScreen = () => {
  const slideAnim1 = useRef(new Animated.Value(-100)).current;
  const slideAnim2 = useRef(new Animated.Value(-100)).current;
  const slideAnim3 = useRef(new Animated.Value(-100)).current;

  const startAnimation = animatedValue => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 1000,
      easing: Easing.elastic(1), // Adjust the easing effect as needed
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => startAnimation(slideAnim1)}>
        <Animated.View style={[styles.slider, {transform: [{translateY: slideAnim1}]}]}>
          <Text>Slider 1</Text>
        </Animated.View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => startAnimation(slideAnim2)}>
        <Animated.View style={[styles.slider, {transform: [{translateY: slideAnim2}]}]}>
          <Text>Slider 2</Text>
        </Animated.View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => startAnimation(slideAnim3)}>
        <Animated.View style={[styles.slider, {transform: [{translateY: slideAnim3}]}]}>
          <Text>Slider 3</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: 200,
    height: 40,
    backgroundColor: '#eee',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WelcomeScreen;
