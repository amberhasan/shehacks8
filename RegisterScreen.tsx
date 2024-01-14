import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [universityDomains, setUniversityDomains] = useState([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json')
      .then(response => response.json())
      .then(data => {
        const domains = data.map(uni => uni.domains).flat();
        setUniversityDomains(domains);
      })
      .catch(error => {
        console.error('Error fetching university domains:', error);
        Alert.alert("Error", "Unable to fetch university domains.");
      });
  }, []);

  const validateInputs = () => {
    // Simple username validation (add more rules as necessary)
    if (username.length < 3) {
      Alert.alert("Error", "Username must be at least 3 characters long.");
      return false;
    }

    // Email domain validation
    const emailDomain = email.split('@')[1];
    if (!universityDomains.includes(emailDomain)) {
      Alert.alert("Error", "Registration is only allowed for authorized school domains.");
      return false;
    }

    // Password validation (add more rules as necessary)
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleRegisterPress = () => {
    if (validateInputs()) {
      // Perform registration logic here
      // For example, sending data to a server, handling response, etc.
          // After successful registration
      Alert.alert("Success", "Registration successful!", [
        {
          text: "Login Now",
          onPress: () => navigation.navigate('Login') // Navigate back to login screen
        }
      ]);
    }
  };

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';

// const RegisterScreen = ({navigation}) => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleRegisterPress = () => {
//     // Perform registration logic here
//   };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register to get started</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity
        onPress={handleRegisterPress}
        style={styles.registerButton}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.safeguard}>safeguard</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.login}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  registerButton: {
    backgroundColor: '#A6D12E',
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
  safeguard: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A6D12E',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  login: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 15,
  },
});

export default RegisterScreen;
