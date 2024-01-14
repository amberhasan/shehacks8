
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginPress = () => {
    // Perform login validation and authentication here
    // For now, just navigate to HomeScreen
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.donateButton} onPress={() => navigation.navigate('Donation')}>
        <Text style={styles.donateButtonText}>Donate</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>Welcome back!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleLoginPress} style={styles.loginButton}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.forgotPassword}>Forgot Password?</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.register}>Don’t have an account? Register</Text>
      </TouchableOpacity>

      <Text style={styles.safeguard}>safeguard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  donateButton: {
    position: 'absolute',
    top: 10, // adjust as needed
    right: 10, // adjust as needed
    padding: 10, // adjust as needed
    backgroundColor: '#A6D12E', // adjust as needed
  },

  donateButtonText: {
    color: 'white', // adjust as needed
  },
  
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white', // Assuming a white background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 48,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#A6D12E', // Replace with the desired button color
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: 'blue',
    marginBottom: 15,
    textAlign: 'center',
  },
  register: {
    color: 'gray',
    textAlign: 'center',
  },
  safeguard: {
    color: '#A6D12E',
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});

export default LoginScreen;
