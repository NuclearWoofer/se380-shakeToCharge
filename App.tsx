import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, DeviceEventEmitter } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import Constants from 'expo-constants';
import * as Battery from 'expo-battery';
import BatteryProgress from './BatteryProgress';

export default function App() {
  const [batteryLevel, setBatteryLevel] = useState<number>(0);

  useEffect(() => {
    const fetchBatteryLevel = async () => {
      const batteryInfo = await Battery.getBatteryLevelAsync();
      setBatteryLevel(Math.floor(batteryInfo * 100));
    };

    fetchBatteryLevel();

    // Listen for accelerometer changes
    Accelerometer.setUpdateInterval(1000); // Set the update interval in milliseconds
    const subscription = DeviceEventEmitter.addListener('accelerometerDidUpdate', ({ x, y, z }) => {
      const acceleration = Math.sqrt(x ** 2 + y ** 2 + z ** 2);

      // Adjusted threshold (1.0 for higher sensitivity)
      if (acceleration > 1.0) {
        // Simulate charging when the device is shaken
        setBatteryLevel((prevLevel) => Math.min(prevLevel + 1, 100));
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shake to Charge</Text>
      <BatteryProgress batteryLevel={batteryLevel} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
});
