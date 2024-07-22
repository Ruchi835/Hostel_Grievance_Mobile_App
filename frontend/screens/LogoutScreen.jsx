import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Clear stored data
        await AsyncStorage.clear();

        Alert.alert('Logged Out', 'You have been logged out successfully.');

        // Reset the navigation stack and navigate to OnboardingScreen
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Onboarding' }],
          })
        );
      } catch (error) {
        console.error('Failed to log out:', error);
        Alert.alert('Error', 'Failed to log out. Please try again.');
      }
    };

    handleLogout();
  }, [navigation]);

  return null; // This component does not render anything
};

export default LogoutScreen;
