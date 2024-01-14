import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const StatisticRow = ({title, value}) => {
  return (
    <View style={styles.statRow}>
      <Text style={styles.statTitle}>{title}:</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default StatisticRow;
