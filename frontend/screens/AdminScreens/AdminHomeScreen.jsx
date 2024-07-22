import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AdminHomeScreen = () => {
  const navigation = useNavigation();

  const handleComplaintPress = () => {
    navigation.navigate('ViewComplaint'); // Assuming you have a Complaint screen set up
  };

  const handleGatePassPress = () => {
    navigation.navigate('GatePass'); // Assuming you have a GatePass screen set up
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleComplaintPress}>
        <Text style={styles.buttonText}>View Complaint</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleGatePassPress}>
        <Text style={styles.buttonText}>Gate Pass</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    width: '80%',
    padding: 50,
    marginVertical: 10,
    backgroundColor: '#20315f', // Light green color
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 23,
    color: '#F5B041',
  },
});

export default AdminHomeScreen;