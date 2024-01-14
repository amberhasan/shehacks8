import React from 'react';
import {Text, StyleSheet} from 'react-native';

const CrimeSubheading = ({children}) => {
  return <Text style={styles.subheading}>{children}</Text>;
};

const styles = StyleSheet.create({
  subheading: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default CrimeSubheading;
