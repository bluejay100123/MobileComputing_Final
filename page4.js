import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Switch } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const Page4 = ({ isSwitchOn, setIsSwitchOn }) => {
  const handleToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  return (
    <View
      style={[
        styles.container,
        isSwitchOn ? styles.invertedContainer : null,
      ]}
    >
      <Text style={[styles.text, isSwitchOn && styles.invertedText]}>Dark Mode 활성화</Text>
      <Switch value={isSwitchOn} onValueChange={handleToggleSwitch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  invertedContainer: {
    backgroundColor: '#000',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  invertedText: {
    color: '#fff',
  },
});

export default Page4;
