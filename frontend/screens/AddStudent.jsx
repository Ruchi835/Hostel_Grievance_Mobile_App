import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';

const Tab = createMaterialTopTabNavigator();

const AddStudent = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    branch: '',
    semester: '',
    roomno: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    // Validate the form fields
    if (!formData.username || !formData.password || !formData.email || !formData.branch || !formData.semester || !formData.roomno) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Perform submission logic here (e.g., send data to backend, show confirmation)
    console.log('Adding student:', formData);

    // Optionally, reset form fields after submission
    setFormData({
      username: '',
      password: '',
      email: '',
      branch: '',
      semester: '',
      roomno: '',
    });

    // Navigate or show a success message
    Alert.alert('Success', 'Student added successfully');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Student</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formData.username}
        onChangeText={(text) => handleInputChange('username', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => handleInputChange('password', text)}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => handleInputChange('email', text)}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Branch"
        value={formData.branch}
        onChangeText={(text) => handleInputChange('branch', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Semester"
        value={formData.semester}
        onChangeText={(text) => handleInputChange('semester', text)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Room Number"
        value={formData.roomno}
        onChangeText={(text) => handleInputChange('roomno', text)}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
        <MaterialIcons name="send" size={20} color="#F5B041" />
      </TouchableOpacity>
    </View>
  );
};

const AddAdmin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    usertype: '', // Default value
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    // Validate the form fields
    if (!formData.username || !formData.password || !formData.email || !formData.usertype) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Perform submission logic here (e.g., send data to backend, show confirmation)
    console.log('Adding admin:', formData);

    // Optionally, reset form fields after submission
    setFormData({
      username: '',
      password: '',
      email: '',
      usertype: '',
    });

    // Navigate or show a success message
    Alert.alert('Success', 'Admin added successfully');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Admin</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formData.username}
        onChangeText={(text) => handleInputChange('username', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => handleInputChange('password', text)}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => handleInputChange('email', text)}
        keyboardType="email-address"
      />

      <Picker
        selectedValue={formData.usertype}
        style={styles.input}
        onValueChange={(itemValue) => handleInputChange('usertype', itemValue)}
      >
        <Picker.Item label="--Select Type--" value="" />
        <Picker.Item label="Admin" value="admin" />
        <Picker.Item label="Security" value="security" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
        <MaterialIcons name="send" size={20} color="#F5B041" />
      </TouchableOpacity>
    </View>
  );
};

const AddUserTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#F5B041',
        tabBarInactiveTintColor: '#20315f',
        tabBarIndicatorStyle: { backgroundColor: '#F5B041' },
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
      }}
      independent={true}
    >
      <Tab.Screen name="Add Student" component={AddStudent} />
      <Tab.Screen name="Add Admin" component={AddAdmin} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#20315f',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#20315f',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#F5B041',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <AddUserTabs />
    </NavigationContainer>
  );
};

export default App;
