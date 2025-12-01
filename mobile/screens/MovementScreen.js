import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MovementScreen() {
  const [isSharing, setIsSharing] = useState(false);

  const toggleSharing = () => {
    setIsSharing(!isSharing);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movement Sharing</Text>
      <Text style={styles.description}>
        Share your movement data to help improve traffic predictions for everyone.
      </Text>
      <TouchableOpacity
        style={[styles.button, isSharing ? styles.buttonOn : styles.buttonOff]}
        onPress={toggleSharing}
      >
        <Text style={styles.buttonText}>
          Share My Movement: {isSharing ? 'ON' : 'OFF'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.status}>
        Status: {isSharing ? 'Currently sharing location data' : 'Not sharing location data'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#666',
  },
  button: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    minWidth: 200,
  },
  buttonOn: {
    backgroundColor: '#00FF00',
  },
  buttonOff: {
    backgroundColor: '#FF0000',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  status: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});