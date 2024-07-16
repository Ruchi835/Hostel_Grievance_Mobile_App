// screens/ComplaintDetails.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ComplaintDetails = ({ route }) => {
  const { complaint } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complaint Details</Text>
      <Text style={styles.label}>Description:</Text>
      <Text style={styles.value}>{complaint.description}</Text>
      <Text style={styles.label}>Complaint Type:</Text>
      <Text style={styles.value}>{complaint.complaint_type}</Text>
      <Text style={styles.label}>Student ID:</Text>
      <Text style={styles.value}>{complaint.student}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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
});

export default ComplaintDetails;
