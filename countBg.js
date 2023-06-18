import React, { useState, useEffect, useRef } from 'react';
import { LightSensor } from 'expo-sensors';
import * as Notifications from 'expo-notifications';
import * as FileSystem from 'expo-file-system';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const JSON_FILE_PATH = `${FileSystem.documentDirectory}notificationCount.json`;

const CountBg = () => {
  const [{ illuminance }, setData] = useState({ illuminance: 0 });
  const [notificationCount, setNotificationCount] = useState(0);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    _subscribe();

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });
  
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      _unsubscribe();
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    if (isFirstLaunch) {
      setIsFirstLaunch(false);
      return;
    }

    if (illuminance < 70) {
      incrementNotificationCount();
      sendNotification();
    }
  }, [illuminance]);

  const _subscribe = () => {
    LightSensor.setUpdateInterval(2000);
    this._subscription = LightSensor.addListener(({ illuminance }) => {
      setData({ illuminance });
    });
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  const incrementNotificationCount = async () => {
    setNotificationCount(prevCount => prevCount + 1);

    const today = getTodayDateString();
    const notificationData = await readNotificationData();
    const updatedData = {
      ...notificationData,
      [today]: (notificationData[today] || 0) + 1,
    };

    await saveNotificationData(updatedData);
  };

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Warning",
        body: "어두운 곳에서 보면 눈 나빠집니다!",
      },
      trigger: null, // Send immediately
    });
  };

  const readNotificationData = async () => {
    try {
      const jsonContent = await FileSystem.readAsStringAsync(JSON_FILE_PATH);
      const data = jsonContent ? JSON.parse(jsonContent) : {};
      const currentDate = getTodayDateString();
      
      if (!data[currentDate]) {
        // Create a new entry for today's date with a value of 0
        data[currentDate] = 0;
        const jsonString = JSON.stringify(data);
        await FileSystem.writeAsStringAsync(JSON_FILE_PATH, jsonString);
      }

      return data;
    } catch (error) {
      console.log("Error reading notification data:", error);
      return {};
    }
  };  

  const saveNotificationData = async data => {
    try {  
      // Check the number of entries in the data
      const entryCount = Object.keys(data).length;
      if (entryCount > 7) {
        // Get the dates from the data
        const dates = Object.keys(data);
  
        // Sort the dates in ascending order
        dates.sort();
  
        // Remove the oldest entries until the count becomes 7
        for (let i = 0; i < entryCount - 7; i++) {
          delete data[dates[i]];
        }
      }

      // Check how many Items there are and about its contents.
      console.log("Number of entries:", entryCount);
      Object.entries(data).forEach(([date, count]) => {
        console.log(`Date: ${date}, Count: ${count}`);
      });
  
      await FileSystem.writeAsStringAsync(JSON_FILE_PATH, JSON.stringify(data));
    } catch (error) {
      console.log("Error saving notification data:", error);
    }
  };

  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
};

export default CountBg;