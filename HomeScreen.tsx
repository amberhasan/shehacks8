import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Modal, ScrollView} from 'react-native';
import MapView from 'react-native-maps';
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
  const [riskDetail, setRiskDetail] = useState('');
  const [riskPercent, setRiskPercent] = useState('');
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

  const handleMapLongPress = async (event: any) => {
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;

    getZipCode(latitude, longitude);
    try {
      const response = await axios.request(options);
      setCrimeData(response.data);
      setRiskDetail(response.data.RiskDetail);
      setRiskPercent(response.data.RiskPercent);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const options = {
    method: 'GET',
    url: 'https://crime-data-by-zipcode-api.p.rapidapi.com/crime_data',
    params: {zip: '94109'},
    headers: {
      'X-RapidAPI-Key': '77a344c291mshc1dbd1236846856p1a5acbjsn3df9efb79bd1',
      'X-RapidAPI-Host': 'crime-data-by-zipcode-api.p.rapidapi.com',
    },
  };
  React.useEffect(() => {
    if (selectedZipCode) {
      const fetchCrimeData = async () => {
        try {
          options.params.zip = selectedZipCode;
          const response = await axios.request(options);
          setCrimeData(response.data);
          // Assuming these properties exist on the response
          setRiskDetail(response.data['Overall']['Risk Detail']);
          setRiskPercent(response.data['Overall']['Risk Percent']);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchCrimeData();
    }
  }, [selectedZipCode]);

  return (
    <View style={{flex: 1}}>
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

      <CrimeModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        crimeData={crimeData}
      />
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
  statistic: {
    fontSize: 14, // Choose an appropriate font size
    marginVertical: 2, // Add some vertical margin for better readability
    // You may want to add more styling as needed
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
    marginBottom: 10,
  },
  categoryTitle: {
    fontWeight: 'bold',
    fontSize: 16,
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
  },
});

export default HomeScreen;
