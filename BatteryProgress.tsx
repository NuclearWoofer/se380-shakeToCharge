import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface BatteryProgressProps {
  batteryLevel: number;
}

function BatteryProgress({ batteryLevel }: BatteryProgressProps) {
  // Determine the color based on battery level
  let fillColor = 'green';
  if (batteryLevel <= 20) {
    fillColor = 'red';
  } else if (batteryLevel <= 50) {
    fillColor = 'yellow';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.percentage}>{batteryLevel}%</Text>
      <View style={styles.batteryContainer}>
        <LinearGradient
          colors={['#444', fillColor, fillColor]}
          style={[styles.battery, { height: `${batteryLevel}%` }]}
        ></LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  batteryContainer: {
    width: 30,
    height: 100,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'flex-end',
  },
  battery: {
    width: '100%',
    borderRadius: 4,
  },
  percentage: {
    fontSize: 20,
  },
});

export default BatteryProgress;
