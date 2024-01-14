import React, {useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CrimeInformation from './CrimeInformation'; // Adjust the path as necessary
import Icon from 'react-native-vector-icons/AntDesign'; // Make sure to install this package

const CrimeModal = ({modalVisible, setModalVisible, crimeData}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>Crime Data</Text>
        {crimeData && (
          <ScrollView style={styles.scrollView}>
            <CrimeInformation crimeData={crimeData} />
          </ScrollView>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    justifyContent: 'center', // Align children along the main axis (for a column, this is vertically)
    // alignItems: 'center', // Align children along the cross axis (for a column, this is horizontally)
    // alignSelf: 'center', // Align Modal itself in the center of the parent container
    marginTop: 'auto', // Push the modal down to the center
    marginBottom: 'auto', // Same as above, for symmetrical positioning
    height: '70%', // Set the height of the modal
    width: '90%', // Set the width of the modal, adjust as needed
    margin: 20,
    backgroundColor: '#F4F4F4',
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
  closeButton: {
    position: 'absolute', // Position the close button absolutely within the parent View
    top: 10, // Distance from the top of the modal
    right: 10, // Distance from the right of the modal
    padding: 10, // Padding to make it easier to press
    backgroundColor: 'light-gray', // Background color to make it easier to see
    borderRadius: 100, // Rounded border
  },
  modalTitle: {
    marginBottom: 15,
    fontWeight: 'bold',
    fontSize: 18,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  crimeCategory: {
    marginBottom: 10,
  },
});

export default CrimeModal;
