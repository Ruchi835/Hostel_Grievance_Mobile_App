import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker'; // Import Picker component

import LoginSVG from '../assets/images/logo.jpeg';
import CustomButton from '../components/CustomButton.jsx';
import InputField from '../components/InputField.jsx';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    userType: '', // Initialize userType state
  });

  // Dynamically set header options when component is rendered
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Onboarding')}>
          <MaterialIcons name="arrow-back" size={24} color="#20315f" />
        </TouchableOpacity>
      ),
      title: '', // Set the header title
    });
  }, [navigation]);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleLogin = () => {
    // Validate and handle login logic based on formData
    console.log('Logging in with:', formData);
    // Navigation logic after login
    navigation.navigate('AppStack');
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: '#ffffff' }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>
          
        </View>

        <Text style={{ fontSize: 28, fontWeight: '500', color: '#20315f', marginBottom: 30 }}>
          Login
        </Text>

        {/* InputField for username */}
        <InputField
          label={'UserName'}
          icon={<MaterialIcons name="person" size={20} color="#20315f" style={{ marginRight: 5 }} />}
          keyboardType="default"
          value={formData.username}
          onChangeText={(text) => handleInputChange('username', text)}
        />

        {/* InputField for password */}
        <InputField
          label={'Password'}
          icon={<Ionicons name="lock-closed-outline" size={20} color="#20315f" style={{ marginRight: 5 }} />}
          inputType="password"
          value={formData.password}
          onChangeText={(text) => handleInputChange('password', text)}
        />

        {/* Picker for selecting userType */}
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Login As:</Text>
          <Picker
            selectedValue={formData.userType}
            style={styles.picker}
            onValueChange={(itemValue) => handleInputChange('userType', itemValue)}
          >
            <Picker.Item label="--Select Type--" value="" />
            <Picker.Item label="Student" value="student" />
            <Picker.Item label="Admin" value="admin" />
            <Picker.Item label="Security" value="security" />
          </Picker>
        </View>

        {/* CustomButton component for login */}
        <CustomButton label={"Login"} onPress={handleLogin} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}></View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}></View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    marginBottom: 20,
  },
  pickerLabel: {
    color: '#20315f',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

export default LoginScreen;
