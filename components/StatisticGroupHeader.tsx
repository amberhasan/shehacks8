import React from 'react';
import {Text, StyleSheet} from 'react-native';

const StatisticGroupHeader = ({children}) => {
  return <Text style={styles.groupHeader}>{children}</Text>;
};

const styles = StyleSheet.create({
  groupHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default StatisticGroupHeader;
