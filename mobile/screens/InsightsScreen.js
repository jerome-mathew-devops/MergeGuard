import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const mockInsightsData = {
  averageSpeed: '35 mph',
  timeUntilClear: '25 minutes',
  bestTimeToLeave: '8:30 AM',
};

export default function InsightsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Traffic Insights</Text>
      
      <View style={styles.statCard}>
        <Text style={styles.statLabel}>Average Speed</Text>
        <Text style={styles.statValue}>{mockInsightsData.averageSpeed}</Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.statLabel}>Time Until Traffic Clears</Text>
        <Text style={styles.statValue}>{mockInsightsData.timeUntilClear}</Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.statLabel}>Best Time to Leave</Text>
        <Text style={styles.statValue}>{mockInsightsData.bestTimeToLeave}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});