import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Splash = ({ onComplete }) => {
  useEffect(() => {
    // Simulate a delay for the splash screen
    const timer = setTimeout(() => {
      // Trigger the onComplete callback after the delay
      onComplete();
    }, 2000); // 2000 milliseconds (2 seconds)

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <View style={styles.container}>
      <Image source={require('./images/splash/splash_1.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default Splash;
