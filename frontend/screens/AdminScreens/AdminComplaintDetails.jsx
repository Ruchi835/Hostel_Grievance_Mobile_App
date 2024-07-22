import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const AdminComplaintDetails = ({ route }) => {
  const { complaint } = route.params;
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.243.94:8000/users/${complaint.student}/`);
        setUserDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load user details:', error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [complaint.student]);

  const formatDate = (datetime) => {
    if (!datetime) return 'N/A';
    const date = new Date(datetime);
    return date.toLocaleDateString();
  };

  const handleResolve = async () => {
    try {
      await axios.patch(`http://192.168.243.94:8000/complaints/${complaint.id}/`, { status: 'Resolved' });
      Alert.alert('Success', 'Complaint marked as resolved');
      // Optionally, you could navigate back or refresh the data here
    } catch (error) {
      console.error('Failed to update complaint status:', error);
      Alert.alert('Error', 'Failed to update complaint status');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#20315f" style={styles.loading} />;
  }

  return (
    <ScrollView style={styles.container}>
      {userDetails ? (
        <>
          <Text style={styles.label}>Student Name:</Text>
          <Text style={styles.value}>{userDetails.user.username}</Text>
          <Text style={styles.label}>Room No:</Text>
          <Text style={styles.value}>{userDetails.roomno}</Text>
        </>
      ) : (
        <Text style={styles.value}>No user details available</Text>
      )}
      <Text style={styles.label}>Date:</Text>
      <Text style={styles.value}>{formatDate(complaint.created_at)}</Text>
      <Text style={styles.label}>Complaint Type:</Text>
      <Text style={styles.value}>{complaint.complaint_type}</Text>
      <Text style={styles.label}>Description:</Text>
      <Text style={styles.value}>{complaint.description}</Text>
      <Text style={styles.label}>Complaint Status:</Text>
      <Text style={styles.value}>{complaint.status}</Text>
      {complaint.status === 'Resolved' && (
        <>
          <Text style={styles.label}>Resolved Date:</Text>
          <Text style={styles.value}>{formatDate(complaint.updated_at)}</Text>
        </>
      )}
      <Text style={styles.label}>Image:</Text>
      {complaint.image ? (
        <Image
          source={{ uri: complaint.image }}
          style={styles.image}
        />
      ) : (
        <Text style={styles.value}>No image available</Text>
      )}
      {complaint.status === 'Pending' && (
        <TouchableOpacity style={styles.button} onPress={handleResolve}>
          <Text style={styles.buttonText}>Mark as Resolved</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    color:'#20315f'
  },
  value: {
    fontSize: 16,
    color:'#6f7c9a',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 20,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#20315f',
    marginTop: 24, 
    marginBottom: 40,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#F5B041',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdminComplaintDetails;
