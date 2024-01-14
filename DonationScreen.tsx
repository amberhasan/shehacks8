import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const DonationScreen = ({navigation}) => {
  const [amount, setAmount] = useState('');
  const [appId, setAppId] = useState('');
  const [userToken, setUserToken] = useState('');
  const [encryptionKey, setEncryptionKey] = useState(''); 
  const [challengeId, setChallengeId] = useState(''); 
  const [isTyping, setIsTyping] = useState(false);

  const valuesArray = [appId, userToken, encryptionKey, challengeId];
  

  const handleDonate = async () => {
    if (!amount) {
      Alert.alert('Error', 'Please enter a donation amount');
      return;
    }
  
    try {
      const response = await axios.post('https://api.circle.com/v1/payments', {
        amount: amount,
        currency: 'usd', // replace with the actual currency
        source: {
          id: 'src_1xxxxxxxxxxxx', // replace with the actual source id
          type: 'card', // replace with the actual type
        },
        // Other necessary data...
      }, {
        headers: {
          'Authorization': `Bearer TEST_API_KEY:6120ecd761ee5ef56d171dfecb1b6623:434725ee5de71344370e495ee372b415`, // replace with your actual API key
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        Alert.alert('Success', 'Thank you for your donation!');
      } else {
        Alert.alert('Error', 'There was an error processing your donation. Please try again.');
      }
    } catch (error) {
    //   console.error(error);
      Alert.alert('Error', 'There was an error processing your donation. Please try again.');
    }
  };

//   const handleDonate = async () => {
//     if (!amount) {
//       Alert.alert('Error', 'Please enter a donation amount');
//       return;
//     }

//     // Call the Circle API to process the donation
//     // This is just a placeholder. You'll need to replace this with the actual API call
//     const response = await axios.post('https://api.circle.com/v1/payments', {
//       amount: amount,
//       // Other necessary data...
//     });

//     if (response.status === 200) {
//       Alert.alert('Success', 'Thank you for your donation!');
//     } else {
//       Alert.alert('Error', 'There was an error processing your donation. Please try again.');
//     }
//   };

  return (

    <View style={styles.container}>

        {!isTyping && (
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        )}


      <Text style={styles.title}>Donate</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter donation amount"
        keyboardType="numeric"
        onFocus={() => setIsTyping(true)}
        onBlur={() => setIsTyping(false)}
      />
      <TextInput
        style={styles.input}
        value={appId}
        onChangeText={setAppId}
        placeholder="Enter App ID"
        onFocus={() => setIsTyping(true)}
        onBlur={() => setIsTyping(false)}
      />
      <TextInput
        style={styles.input}
        value={userToken}
        onChangeText={setUserToken}
        placeholder="Enter User Token"
        onFocus={() => setIsTyping(true)}
        onBlur={() => setIsTyping(false)}
      />
      <TextInput
        style={styles.input}
        value={encryptionKey}
        onChangeText={setEncryptionKey}
        placeholder="Enter Encryption Key"
        onFocus={() => setIsTyping(true)}
        onBlur={() => setIsTyping(false)}
      />
      <TextInput
        style={styles.input}
        value={challengeId}
        onChangeText={setChallengeId}
        placeholder="Enter Challenge ID"
        onFocus={() => setIsTyping(true)}
        onBlur={() => setIsTyping(false)}
      />
      <TouchableOpacity style={styles.button} onPress={handleDonate}>
        <Text style={styles.buttonText}>Donate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#A6D12E',
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  backButton: {
    position: 'absolute',
    top: 10, // adjust as needed
    left: 10, // adjust as needed
    width: 50, // adjust as needed
    height: 50, // adjust as needed
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A6D12E',
  },
  backButtonText: {
    color: 'white',
  },
});

export default DonationScreen;



// // get App ID
// const getAppID = {
//   method: 'GET',
//   url: 'https://api.circle.com/v1/w3s/config/entity',
//   headers: {'Content-Type': 'application/json', Authorization: 'Bearer TEST_API_KEY:6120ecd761ee5ef56d171dfecb1b6623:434725ee5de71344370e495ee372b415'}
// };

// axios
//   .request(getAppID)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });



// // create User

// const createUser = {
//   method: 'POST',
//   url: 'https://api.circle.com/v1/w3s/users',
//   headers: {'Content-Type': 'application/json', Authorization: 'Bearer TEST_API_KEY:6120ecd761ee5ef56d171dfecb1b6623:434725ee5de71344370e495ee372b415'},
//   data: {userId: '<USER_ID>'}
// };

// axios
//   .request(createUser)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });




// //acquire Token
// const acquireToken = {
//   method: 'POST',
//   url: 'https://api.circle.com/v1/w3s/users/token',
//   headers: {'Content-Type': 'application/json', Authorization: 'Bearer TEST_API_KEY:6120ecd761ee5ef56d171dfecb1b6623:434725ee5de71344370e495ee372b415'},
//   data: {userId: '<USER_ID>'}
// };

// axios
//   .request(acquireToken)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });

//   //initialize user
// const initializeUser = {
//   method: 'POST',
//   url: 'https://api.circle.com/v1/w3s/user/initialize',
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: 'Bearer TEST_API_KEY:6120ecd761ee5ef56d171dfecb1b6623:434725ee5de71344370e495ee372b415',
//     'X-User-Token': '<USER_TOKEN>'
//   },
//   data: {idempotencyKey: '<IDEMPOTENCY_KEY>', blockchains: '[<BLOCKCHAIN>]'}
// };

// axios
//   .request(initializeUser)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });



// //checkWalletStatus
// const checkWalletStatus = {
//   method: 'GET',
//   url: 'https://api.circle.com/v1/w3s/wallets/__USER-ID__',
//   headers: {'Content-Type': 'application/json', Authorization: 'Bearer TEST_API_KEY:6120ecd761ee5ef56d171dfecb1b6623:434725ee5de71344370e495ee372b415'}
// };

// axios
//   .request(checkWalletStatus)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });


// //fetchWalletIDandBalance
// const fetchWalletIDandBalance = {
//   method: 'GET',
//   url: 'https://api.circle.com/v1/w3s/wallets/__WALLET_ID__/balances',
//   headers: {'Content-Type': 'application/json', Authorization: 'Bearer TEST_API_KEY:6120ecd761ee5ef56d171dfecb1b6623:434725ee5de71344370e495ee372b415'}
// };

// axios
//   .request(fetchWalletIDandBalance)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });

// //initiateTransaction

// const initiateTransaction = {
//   method: 'POST',
//   url: 'https://api.circle.com/v1/w3s/user/transactions/transfer',
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: 'Bearer TEST_API_KEY:6120ecd761ee5ef56d171dfecb1b6623:434725ee5de71344370e495ee372b415',
//     'X-User-Token': '<USER_SESSION_TOKEN>'
//   },
//   data: {
//     idempotencyKey: '<UNIQUE_UUID>',
//     userId: '<ID_OF_THE_USER_YOU_WANT_TO_USE>',
//     destinationAddress: '<DESTINATION_WALLET_ADDRESS>',
//     refId: '<ANY_REFERENCE>',
//     amounts: ['<AMOUNT_1>'],
//     feeLevel: 'HIGH',
//     tokenId: '<ID_OF_THE_TOKEN_YOU_WANT_TO_TRANSFER>',
//     walletId: '<ID_OF_PREVIOUSLY_GENERATED_WALLET>'
//   }
// };

// axios
//   .request(initiateTransaction)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });