import React from 'react';
import {Text, StyleSheet} from 'react-native';

const CrimeFunFact = ({children}) => {
  return <Text style={styles.funFact}>{children}</Text>;
};

const styles = StyleSheet.create({
  funFact: {
    fontSize: 14,
    marginBottom: 12,
  },
});

export default CrimeFunFact;
