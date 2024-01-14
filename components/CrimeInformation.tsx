import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CrimeInformation = ({crimeData}) => {
  if (!crimeData) return null;

  return (
    <View>
      <Text style={styles.overallCrime}>{crimeData['Overall'].Fact}</Text>

      {crimeData['Crime BreakDown'].map(
        (
          crimeCategory,
          index, //crime category is each white box
        ) => (
          <View key={index} style={styles.crimeCategory}>
            {Object.entries(crimeCategory).map(
              ([categoryKey, categoryValue]) => {
                if (categoryKey === '0') return null; // Skip if key is '0'

                return (
                  <View key={categoryKey} style={styles.categorySection}>
                    <Text style={styles.categoryTitle}>
                      {categoryKey.replace(/_/g, ' ')}
                    </Text>

                    {typeof categoryValue === 'object' &&
                    categoryValue !== null ? (
                      Object.entries(categoryValue).map(([key, value]) => (
                        <Text key={key} style={styles.statisticHeader}>
                          {`${key.replace(/_/g, ' ')}: ${value}`}
                        </Text>
                      ))
                    ) : (
                      <Text style={styles.statistic}>
                        {`${categoryKey.replace(/_/g, ' ')}: ${categoryValue}`}
                      </Text>
                    )}
                  </View>
                );
              },
            )}
          </View>
        ),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    justifyContent: 'center', // Align children along the main axis (for a column, this is vertically)
    alignItems: 'center', // Align children along the cross axis (for a column, this is horizontally)
    alignSelf: 'center', // Align Modal itself in the center of the parent container
    marginTop: 'auto', // Push the modal down to the center
    marginBottom: 'auto', // Same as above, for symmetrical positioning
    height: '70%', // Set the height of the modal
    width: '90%', // Set the width of the modal, adjust as needed
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statisticHeader: {
    fontSize: 14, // Choose an appropriate font size
    marginVertical: 2, // Add some vertical margin for better readability
    fontWeight: 'bold',
  },
  statistic: {
    fontSize: 14, // Choose an appropriate font size
    marginVertical: 2, // Add some vertical margin for better readability
    // You may want to add more styling as needed
  },
  categorySection: {
    padding: 10,
    backgroundColor: 'white',
  },
  riskText: {
    fontSize: 16,
    marginVertical: 4,
    // ... additional styling as needed
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  crimeCategory: {
    borderColor: '#969696',
    borderWidth: 0.3,
    // borderTopColor: 'white',
    // borderBottomColor: 'white',
    // borderLeftColor: 'white',
    // borderRightColor: 'white',
  },
  categoryTitle: {
    fontSize: 15,
    color: '#969696',
  },
  crimeStatistic: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statisticTitle: {
    fontStyle: 'italic',
  },
  statisticValue: {
    fontWeight: 'bold',
  },
  overallCrime: {
    marginTop: 10,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default CrimeInformation;
