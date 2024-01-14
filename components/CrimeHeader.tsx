import React from 'react';
import {Text, StyleSheet} from 'react-native';

const CrimeHeader = ({children}) => {
  return <Text style={styles.header}>{children}</Text>;
};

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
});

export default CrimeHeader;
