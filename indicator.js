import React from 'react';
import { View, StyleSheet } from 'react-native';

const Indicator = ({ pageCount, currentPage }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: pageCount }).map((_, index) => (
        <View
          key={index}
          style={[styles.dot, index === currentPage ? styles.activeDot : null]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 20,
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginHorizontal: 25,
  },
  activeDot: {
    backgroundColor: 'black',
  },
});

export default Indicator;
