import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const AdminHomeScreen = () => {
  const navigation = useNavigation();
  const isFocused = useNavigation().isFocused;

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (isFocused()) {
          Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel",
              
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
          ]);
          return true;
        }
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [isFocused])
  );

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
    backgroundColor: '#20315f', // Navy blue color
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 23,
    color: '#F5B041',
  },
});

export default AdminHomeScreen;
