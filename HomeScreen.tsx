import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import axios from 'axios';
import CrimeModal from './components/CrimeModal';

const HomeScreen: React.FC<{onLogout: () => void}> = ({onLogout}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedZipCode, setSelectedZipCode] = useState('');
  const [selectedCoordinate, setSelectedCoordinate] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [crimeData, setCrimeData] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [lastTap, setLastTap] = useState(null);

  const handleMapPress = event => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300; // milliseconds
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      const latitude = event.nativeEvent.coordinate.latitude;
      const longitude = event.nativeEvent.coordinate.longitude;
      getZipCode(latitude, longitude);
      setLastTap(null);
    } else {
      setLastTap(now);
    }
  };

  const handleMapLongPress = event => {
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;
    getZipCode(latitude, longitude);
    Alert.prompt(
      'Leave a Comment',
      'Type your comment about this location.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: comment => {
            // Use the comment and coordinates to create a new marker
            if (comment) {
              const newMarker = {latitude, longitude, comment};
              setMarkers(currentMarkers => [...currentMarkers, newMarker]);
            }
          },
        },
      ],
      'plain-text',
    );
  };

  const getZipCode = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            latlng: `${latitude},${longitude}`,
            key: 'YOUR_GOOGLE_API_KEY', // Replace with your Google API Key
          },
        },
      );

      const data = response.data;
      if (data.results.length > 0) {
        const addressComponents = data.results[0].address_components;
        const postalCodeComponent = addressComponents.find(component =>
          component.types.includes('postal_code'),
        );

        if (postalCodeComponent) {
          setSelectedZipCode(postalCodeComponent.long_name);
          setSelectedCoordinate({latitude, longitude});
          setModalVisible(true);
        } else {
          setSelectedZipCode('Zip code not found');
        }
      } else {
        setSelectedZipCode('Location not found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (selectedZipCode) {
      const fetchCrimeData = async () => {
        try {
          const response = await axios.get(
            `https://crime-data-by-zipcode-api.p.rapidapi.com/crime_data`,
            {
              params: {zip: selectedZipCode},
              headers: {
                'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY', // Replace with your RapidAPI Key
                'X-RapidAPI-Host': 'crime-data-by-zipcode-api.p.rapidapi.com',
              },
            },
          );
          setCrimeData(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchCrimeData();
    }
  }, [selectedZipCode]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
        onLongPress={handleMapLongPress}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            // title={`Zip Code: ${marker.zipCode}`}
            description={`Comment: ${marker.comment}`}
            onCalloutPress={() => {
              setSelectedCoordinate({
                latitude: marker.latitude,
                longitude: marker.longitude,
              });
              setSelectedZipCode(marker.zipCode);
              setModalVisible(true);
            }}
          />
        ))}
      </MapView>

      <CrimeModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        crimeData={crimeData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  // ... other styles if necessary
});

export default HomeScreen;
