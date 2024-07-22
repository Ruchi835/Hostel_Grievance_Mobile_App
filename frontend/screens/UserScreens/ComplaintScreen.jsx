import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ComplaintScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    complaintType: '',
    complaint: '',
  });
  const [image, setImage] = useState(null); // State to hold the image URI
  const [studentId, setStudentId] = useState(null); // State to hold the student ID

  useEffect(() => {
    const fetchStudentId = async () => {
      try {
        const ComplaintData = await AsyncStorage.getItem('user');
        if (ComplaintData) {
          const parsedData = JSON.parse(ComplaintData);
          setStudentId(parsedData.id);
        }
      } catch (error) {
        console.error('Failed to load student ID', error);
      }
    };

    fetchStudentId();
  }, []);

  // Function to handle changes in input fields
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Function to handle image pick from device library
  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission required', 'Please allow access to photos');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      // Update the image state with the selected image URI
      setImage(pickerResult.assets[0].uri);
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    // Validate the form fields including the image
    if (!formData.complaintType || !formData.complaint || !image) {
      Alert.alert('Error', 'Please fill in all fields and upload an image');
      return;
    }

    if (!studentId) {
      Alert.alert('Error', 'Student ID not found');
      return;
    }

    // Create FormData object to send multipart/form-data
    const formDataToSend = new FormData();
    formDataToSend.append('complaint_type', formData.complaintType);
    formDataToSend.append('description', formData.complaint);
    formDataToSend.append('image', {
      uri: image,
      name: 'complaint.jpg',
      type: 'image/jpeg',
    });
    formDataToSend.append('student', studentId);

    try {
      const response = await axios.post('http://192.168.243.94:8000/complaints/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Add any other headers if required (e.g., authentication token)
        },
      });

      if (response.status !== 201) {
        throw new Error('Failed to submit complaint');
      }

      // Optionally handle success response (e.g., navigate to another screen)
      Alert.alert('Success', 'Complaint submitted successfully');
      navigation.navigate('Home'); // Navigate to home screen after successful submission
    } catch (error) {
      console.error('Error submitting complaint:', error);
      Alert.alert('Error', 'Failed to submit complaint. Please try again later.');
    } finally {
      // Reset form fields and image state after submission
      setFormData({
        complaintType: '',
        complaint: '',
      });
      setImage(null);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Raise a Complaint</Text>

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Complaint Type:</Text>
        <Picker
          selectedValue={formData.complaintType}
          style={styles.picker}
          onValueChange={(itemValue) => handleInputChange('complaintType', itemValue)}
        >
          <Picker.Item label="--Select Complaint Type--" value="" />
          <Picker.Item label="Maintenance" value="Maintenance" />
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Cleanliness" value="Cleanliness" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <TextInput
        style={[styles.input, { height: 150 }]}
        multiline
        placeholder="Type your complaint here..."
        value={formData.complaint}
        onChangeText={(text) => handleInputChange('complaint', text)}
      />

      <View style={styles.imagePicker}>
        <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
          <Text style={styles.uploadText}>Select Image</Text>
        </TouchableOpacity>
        {image && (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Complaint</Text>
        <MaterialIcons name="send" size={20} color="#F5B041" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 50,
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
  imagePicker: {
    marginBottom: 20,
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: '#20315f',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  uploadText: {
    color: '#F5B041',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 10,
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

export default ComplaintScreen;
