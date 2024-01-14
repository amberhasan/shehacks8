import React, {useState} from 'react';
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

  const handleLoginPress = () => {
    // Perform login validation and authentication here
    // If successful:
    onLogin();
    // Otherwise, handle the error
  };

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
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLoginPress} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.register}>Don’t have an account? Register</Text>
      </TouchableOpacity>
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
    backgroundColor: '#A6D12E',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 15,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: 'blue',
    marginBottom: 15,
    justifyContent: 'flex-end',
  },
  register: {
    color: 'gray',
  },
});

export default LoginScreen;
