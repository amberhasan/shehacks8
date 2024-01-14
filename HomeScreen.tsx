import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
  SafeAreaView,
} from 'react-native';
import MapView from 'react-native-maps';

const HomeScreen: React.FC<{onLogout: () => void}> = ({onLogout}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedZipCode, setSelectedZipCode] = useState('');

  const handleMapLongPress = (event: any) => {
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;

    // Implement your logic to fetch the zip code based on latitude and longitude here
    // For this example, we'll just display dummy data
    const dummyZipCode = '12345';

    setSelectedZipCode(dummyZipCode);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Button title="Back" onPress={onLogout} />

      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onLongPress={handleMapLongPress}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <Text>Zip Code: {selectedZipCode}</Text>
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default HomeScreen;
