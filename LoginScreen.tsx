// LoginScreen.tsx

import {Button, StyleSheet, View} from 'react-native';

// ... other imports
const LoginScreen: React.FC<{onLogin: () => void}> = ({onLogin}) => {
  // ... username and password state

  const handleLoginPress = () => {
    // Perform login validation and authentication here
    onLogin(); // Call the onLogin prop after successful authentication
  };

  return (
    <View style={styles.container}>
      {/* ... input fields */}
      <Button title="Log In" onPress={handleLoginPress} />
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

export default LoginScreen;
