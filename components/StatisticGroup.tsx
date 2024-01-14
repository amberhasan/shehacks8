import React from 'react';
import {View, StyleSheet} from 'react-native';

const StatisticGroup = ({children}) => {
  return <View style={styles.statisticGroup}>{children}</View>;
};

const styles = StyleSheet.create({
  statisticGroup: {
    marginBottom: 20,
  },
});

export default StatisticGroup;
