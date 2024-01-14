// HomeScreen.tsx
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import MapView from 'react-native-maps';

const HomeScreen: React.FC<{onLogout: () => void}> = ({onLogout}) => {
  return (
    <View style={{flex: 1}}>
      <Button title="Back" onPress={onLogout} />
      <Button title="Back" onPress={onLogout} />
      <Button title="Back" onPress={onLogout} />
      <Button title="Back" onPress={onLogout} />

      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

export default HomeScreen;
