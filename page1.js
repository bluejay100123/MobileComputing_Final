import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as FileSystem from 'expo-file-system';

const { width, height } = Dimensions.get('window');

const JSON_FILE_PATH = `${FileSystem.documentDirectory}notificationCount.json`;

const Page1 = ({ isSwitchOn }) => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [todayDate, setTodayDate] = useState('');

  useEffect(() => {
    // Load notification count immediately
    loadNotificationCount();

    // Set interval to load notification count every 1 seconds
    const intervalId = setInterval(loadNotificationCount, 1000);

    // Clear interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const readNotificationData = async () => {
    try {
      const jsonContent = await FileSystem.readAsStringAsync(JSON_FILE_PATH);
      const data = jsonContent ? JSON.parse(jsonContent) : {};

      return data;
    } catch (error) {
      console.log("Error reading notification data:", error);
      return {};
    }
  };  

  const loadNotificationCount = async () => {
    const today = getTodayDateString();
    const notificationData = await readNotificationData();
    const todayCount = notificationData[today] || 0;
    setNotificationCount(todayCount);
    setTodayDate(today);
  };

  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <View
      style={[
        styles.container,
        isSwitchOn ? styles.invertedContainer : null,
      ]}
    >
      <View style={styles.dateContainer}>
        <Text style={[styles.dateText, isSwitchOn && styles.invertedText]}>{todayDate}</Text>
      </View>
      <View style={styles.countContainer}>
        <Text style={[styles.countText, isSwitchOn && styles.invertedText]}>오늘은</Text>
        <View style={styles.notificationCountBox}>
          <Text style={[styles.notificationCountText, , isSwitchOn && styles.invertedText]}>{notificationCount} 번</Text>
        </View>
        <Text style={[styles.countText, isSwitchOn && styles.invertedText]}>어두운 곳에서 보셨습니다.</Text>
      </View>
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
  dateContainer: {
    position: 'absolute',
    top: height * 0.25,
  },
  countContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  countText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  invertedText: {
    color: '#fff',
  },
  notificationCountBox: {
    backgroundColor: '#70F170',
    paddingHorizontal: 35,
    paddingVertical: 35,
    borderRadius: 10,
    marginVertical: 15,
  },
  notificationCountText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Page1;
