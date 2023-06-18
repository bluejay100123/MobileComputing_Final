import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import * as FileSystem from 'expo-file-system';

const { width, height } = Dimensions.get('window');
const JSON_FILE_PATH = `${FileSystem.documentDirectory}notificationCount.json`;

const Page2 = ({ isSwitchOn }) => {
  const [data, setData] = useState([]);
  const [average, setAverage] = useState(0);

  const readNotificationData = async () => {
    try {
      const jsonContent = await FileSystem.readAsStringAsync(JSON_FILE_PATH);
      const parsedData = jsonContent ? JSON.parse(jsonContent) : {};

      const chartData = Object.keys(parsedData).map(date => ({
        date,
        count: parsedData[date]
      }));

      return chartData;
    } catch (error) {
      console.log("Error reading notification data:", error);
      return [];
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      readNotificationData()
        .then(chartData => {
          setData(chartData);
          const counts = chartData.map(item => item.count);
          const sum = counts.reduce((total, count) => total + count, 0);
          const average = sum / counts.length;
          setAverage(average);
        })
        .catch(error => console.log("Error loading notification data:", error));
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View
      style={[
        styles.container,
        isSwitchOn ? styles.invertedContainer : null,
      ]}
    >
      <Text style={[styles.text, isSwitchOn && styles.invertedText]}>최근 7일간 데이터 분석 결과입니다!</Text>
      <BarChart
        data={{
          labels: data.map(item => item.date.substr(5)),
          datasets: [
            {
              data: data.map(item => item.count),
            },
          ],
        }}
        width={width - 30}
        height={280}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#c5bdf5',
          backgroundGradientFromOpacity: 0.5,
          backgroundGradientTo: '#93c8ec',
          backgroundGradientToOpacity: 1,
          decimalPlaces: 0,
          barPercentage: 0.7,
          color: (opacity = 1) => `rgba(108, 0, 250, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 20,
          borderRadius: 16,
        }}
        fromZero
        showValuesOnTopOfBars
      />
      <View style={styles.averageContainer}>
        <Text style={[styles.text, isSwitchOn && styles.invertedText]}>평균: {average.toFixed(2)}</Text>
        {average > 10 ? (
          <View style={styles.averageContainer}>
            <Image source={require('./images/page2/warning.png')} style={styles.image} />
            <Text style={[styles.text, isSwitchOn && styles.invertedText]}>현재 단계 : 위험</Text>
          </View>
        ) : (
          <View style={styles.averageContainer}>
            <Image source={require('./images/page2/ok.png')} style={styles.image} />
            <Text style={[styles.text, isSwitchOn && styles.invertedText]}>현재 단계 : 안전</Text>
          </View>
      )}
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
  averageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  invertedText: {
    color: '#fff',
  },
});

export default Page2;
