import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, BackHandler, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const UserHomeScreen = () => {
  const navigation = useNavigation();
  const isFocused = useNavigation().isFocused;

  const fadeAnimComplaint = new Animated.Value(0);
  const scaleAnimComplaint = new Animated.Value(0.5);

  const fadeAnimGatePass = new Animated.Value(0);
  const scaleAnimGatePass = new Animated.Value(0.5);

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


  useEffect(() => {
    Animated.stagger(300, [
      Animated.parallel([
        Animated.timing(fadeAnimComplaint, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnimComplaint, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeAnimGatePass, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnimGatePass, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handleComplaintPress = () => {
    navigation.navigate('UserComplaint'); // Assuming you have a Complaint screen set up
  };

  const handleGatePassPress = () => {
    navigation.navigate('GatePass'); // Assuming you have a GatePass screen set up
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.button, opacity: fadeAnimComplaint, transform: [{ scale: scaleAnimComplaint }] }}>
        <TouchableOpacity onPress={handleComplaintPress}>
          <MaterialIcons name="report-problem" size={50} color="#F5B041" />
          <Text style={styles.buttonText}>Report Issue</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={{ ...styles.button, opacity: fadeAnimGatePass, transform: [{ scale: scaleAnimGatePass }] }}>
        <TouchableOpacity onPress={handleGatePassPress}>
          <MaterialIcons name="exit-to-app" size={50} color="#F5B041" />
          <Text style={styles.buttonText}>Gate Pass</Text>
        </TouchableOpacity>
      </Animated.View>
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
    padding: 30,
    marginVertical: 10,
    backgroundColor: '#20315f', // Navy blue color
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 23,
    color: '#F5B041',
    marginTop: 10,
  },
});

export default UserHomeScreen;


