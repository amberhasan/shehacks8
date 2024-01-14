import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Modal} from 'react-native';
import MapView from 'react-native-maps';
import axios from 'axios';

const HomeScreen: React.FC<{onLogout: () => void}> = ({onLogout}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedZipCode, setSelectedZipCode] = useState('');
  const [selectedCoordinate, setSelectedCoordinate] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [crimeData, setCrimeData] = useState(null);

  const getZipCode = async (latitude: number, longitude: number) => {
    // Fetch zip code using Google Maps Geocoding API
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAhcs2jPdQi4Uu0JEFgcMVDFAnXw37oSVM`,
      );

      const data = await response.json();

      if (data.results.length > 0) {
        const addressComponents = data.results[0].address_components;

        // Find the postal code component
        const postalCodeComponent = addressComponents.find(component =>
          component.types.includes('postal_code'),
        );

        if (postalCodeComponent) {
          setSelectedZipCode(postalCodeComponent.long_name);
          setSelectedCoordinate({latitude, longitude});
          setModalVisible(true);
        } else {
          // No postal code found
          setSelectedZipCode('Zip code not found');
        }
      } else {
        // No results found
        setSelectedZipCode('Location not found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const options = {
    method: 'GET',
    url: 'https://crime-data-by-zipcode-api.p.rapidapi.com/crime_data',
    params: {zip: '94109'},
    headers: {
      'X-RapidAPI-Key': '4eb7ca5b31mshad479dddab5e550p143a16jsndcf60af7844f',
      'X-RapidAPI-Host': 'crime-data-by-zipcode-api.p.rapidapi.com',
    },
  };
  const handleMapLongPress = async (event: any) => {
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;

    getZipCode(latitude, longitude);
    try {
      const response = await axios.request(options);
      setCrimeData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{flex: 1}}>
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
          {/* ... (other texts remain unchanged) */}
          <Text>Crime Data:</Text>
          {crimeData && (
            <View>
              {/* Map over the crime data and create text elements for each item */}
              <Text>{`Crime Breakdown: ${JSON.stringify(
                crimeData['Crime BreakDown'],
                null,
                2,
              )}`}</Text>
              <Text>{`Overall Crime: ${crimeData['Overall'].Fact}`}</Text>
              {/* ... Display more data as needed */}
            </View>
          )}
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
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
