import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker from Expo

const ComplaintScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    complaint: '',
  });
  const [image, setImage] = useState(null); // State to hold the image URI

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
      console.log("image",pickerResult.assets[0].uri)
      setImage(pickerResult.assets[0].uri);
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Validate the form fields including the image
    if (!formData.name || !formData.email || !formData.complaint || !image) {
      Alert.alert('Error', 'Please fill in all fields and upload an image');
      return;
    }

    // Perform submission logic here (e.g., send data to backend, show confirmation)
    console.log('Submitting complaint:', { ...formData, image });

    // Optionally, reset form fields after submission
    setFormData({
      name: '',
      email: '',
      complaint: '',
    });
    setImage(null); // Clear the image state after submission

    // Navigate or show a success message
    Alert.alert('Success', 'Complaint submitted successfully');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Raise a Complaint</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={formData.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={formData.email}
        onChangeText={(text) => handleInputChange('email', text)}
        keyboardType="email-address"
      />

      <TextInput
        style={[styles.input, { height: 150 }]}
        multiline
        placeholder="Type your complaint here..."
        value={formData.complaint}
        onChangeText={(text) => handleInputChange('complaint', text)}
      />

      {/* Input field for image upload */}
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
    paddingBottom:50,
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
});

export default ComplaintScreen;
