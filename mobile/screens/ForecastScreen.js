import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const mockForecastData = [
  { id: 1, prediction: 'Traffic building up in 10 minutes' },
  { id: 2, prediction: 'Heavy congestion expected at 5 PM' },
  { id: 3, prediction: 'Clear roads for the next 2 hours' },
  { id: 4, prediction: 'Accident reported on Highway 101' },
  { id: 5, prediction: 'Construction delays on Main Street' },
];

export default function ForecastScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.prediction}>{item.prediction}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Traffic Forecast</Text>
      <FlatList
        data={mockForecastData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
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
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  prediction: {
    fontSize: 16,
  },
});