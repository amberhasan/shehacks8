import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';

const LoginScreen: React.FC<{onLogin: () => void}> = ({onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonColor, setButtonColor] = useState('#FFFFFF'); // Default color

  const handleLoginPress = () => {
    // Perform login validation and authentication here
    // If successful:
    onLogin();
    // Otherwise, handle the error
  };

  const fetchColor = async () => {
    try {
      const response = await fetch('http://localhost:3000/get-color');
      const data = await response.json();
      setButtonColor(data.color);
    } catch (error) {
      console.error('Error fetching color:', error);
    }
  };

  useEffect(() => {
    fetchColor();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeBack}>Welcome back!</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <TouchableOpacity
        onPress={handleLoginPress}
        style={[styles.loginButton, {backgroundColor: buttonColor}]}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.register}>Don’t have an account? Register</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  welcomeBack: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 48,
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  loginButton: {
    width: '100%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 15,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  register: {
    color: 'gray',
    alignSelf: 'center',
    marginTop: 15,
  },
});

export default LoginScreen;
