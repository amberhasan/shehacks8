import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';


const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Navigate to your main screen after 2 seconds
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Image
        source={require('./assets/wordmark.png')}
        style={styles.logo}
/>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white', // Match the background color to your splash screen design
    },
    logo: {
        width: '80%', // Adjust the width as necessary
        resizeMode: 'contain', // This makes sure the logo scales nicely
        // You might need to adjust height as well depending on your logo's aspect ratio
    },
});

export default SplashScreen;