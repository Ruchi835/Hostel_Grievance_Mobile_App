import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import * as ImagePicker from 'expo-image-picker';

const ComplaintScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    complaint: '',
    image: null, // Initialize image state
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

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
      setFormData({
        ...formData,
        image: pickerResult.uri,
      });
    }
  };

  const handleSubmit = () => {
    // Validate the form fields including the image
    if (!formData.name || !formData.email || !formData.complaint || !formData.image) {
      Alert.alert('Error', 'Please fill in all fields and upload an image');
      return;
    }

    // Perform submission logic here (e.g., send data to backend, show confirmation)
    console.log('Submitting complaint:', formData);

    // Optionally, reset form fields after submission
    setFormData({
      name: '',
      email: '',
      complaint: '',
      image: null,
    });

    // Navigate or show a success message
    Alert.alert('Success', 'Complaint submitted successfully');
  };

  return (
    <View style={styles.container}>
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


    {/* Image picker
    <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
        {formData.image ? (
          <Image source={{ uri: formData.image }} style={styles.imagePreview} />
        ) : (
          <MaterialIcons name="photo-camera" size={24} color="#20315f" />
        )}
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Complaint</Text>
        <MaterialIcons name="send" size={20} color="#F5B041" />
      </TouchableOpacity>
    </View>
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
  imagePicker: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePreview: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
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
