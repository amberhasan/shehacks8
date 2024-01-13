// HomeScreen.tsx
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const HomeScreen: React.FC<{onLogout: () => void}> = ({onLogout}) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen - Welcome!</Text>
      <Button title="Log Out" onPress={onLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
