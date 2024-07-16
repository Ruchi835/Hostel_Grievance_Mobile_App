import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

import CustomButton from '../components/CustomButton.jsx';
import InputField from '../components/InputField.jsx';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    userType: '',
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Onboarding')}>
          <MaterialIcons name="arrow-back" size={24} color="#20315f" />
        </TouchableOpacity>
      ),
      title: '',
    });
  }, [navigation]);

  const handleInputChange = (field, value) => {
    console.log(`${field}: ${value}`); // Debugging line
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleLogin = () => {
    console.log('Logging in with:', formData); // Debugging line
    if (!formData.username || !formData.password || !formData.userType) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    navigation.navigate('AppStack');
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: '#ffffff' }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>
          {/* Add your logo or any other component here */}
        </View>

        <Text style={{ fontSize: 28, fontWeight: '500', color: '#20315f', marginBottom: 30 }}>
          Login
        </Text>

        <InputField
          label={'UserName'}
          icon={<MaterialIcons name="person" size={20} color="#20315f" style={{ marginRight: 5 }} />}
          keyboardType="default"
          value={formData.username}
          onChangeText={(text) => handleInputChange('username', text)}
        />

        <InputField
          label={'Password'}
          icon={<Ionicons name="lock-closed-outline" size={20} color="#20315f" style={{ marginRight: 5 }} />}
          inputType="password"
          value={formData.password}
          onChangeText={(text) => handleInputChange('password', text)}
        />

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
