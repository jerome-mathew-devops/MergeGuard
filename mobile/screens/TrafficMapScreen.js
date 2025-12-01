import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

const mockTrafficData = [
  {
    id: 1,
    coordinates: [
      { latitude: 37.7749, longitude: -122.4194 },
      { latitude: 37.7849, longitude: -122.4094 },
    ],
    color: '#00FF00', // Green
  },
  {
    id: 2,
    coordinates: [
      { latitude: 37.7849, longitude: -122.4094 },
      { latitude: 37.7949, longitude: -122.3994 },
    ],
    color: '#FFFF00', // Yellow
  },
  {
    id: 3,
    coordinates: [
      { latitude: 37.7949, longitude: -122.3994 },
      { latitude: 37.8049, longitude: -122.3894 },
    ],
    color: '#FF0000', // Red
  },
];

export default function TrafficMapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.7749,
          longitude: -122.4194,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {mockTrafficData.map((road) => (
          <Polyline
            key={road.id}
            coordinates={road.coordinates}
            strokeColor={road.color}
            strokeWidth={6}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});