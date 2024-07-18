// screens/ComplaintDetails.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ComplaintDetails = ({ route }) => {
  const { complaint } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Description:</Text>
      <Text style={styles.value}>{complaint.description}</Text>
      <Text style={styles.label}>Complaint Type:</Text>
      <Text style={styles.value}>{complaint.complaint_type}</Text>
      <Text style={styles.label}>Complaint Status:</Text>
      <Text style={styles.value}>{complaint.status}</Text>
      <Text style={styles.label}>Image:</Text>
      {complaint.image ? (
        <Image
          source={{ uri: complaint.image }}
          style={styles.image}
        />
      ) : (
        <Text style={styles.value}>No image available</Text>
      )}
    </View>
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
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 16,
    resizeMode: 'contain',
  },
});

export default ComplaintDetails;
