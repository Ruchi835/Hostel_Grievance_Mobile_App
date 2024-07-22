// screens/UserComplaintDetails.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const UserComplaintDetails = ({ route }) => {
  const { complaint } = route.params;

  const formatDate = (datetime) => {
    if (!datetime) return 'N/A';
    const date = new Date(datetime);
    return date.toLocaleDateString();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Description:</Text>
      <Text style={styles.value}>{complaint.description}</Text>
      <Text style={styles.label}>Complaint Type:</Text>
      <Text style={styles.value}>{complaint.complaint_type}</Text>
      <Text style={styles.label}>Complaint Status:</Text>
      <Text style={styles.value}>{complaint.status}</Text>
      {complaint.status === 'Pending' && (
        <>
          <Text style={styles.label}>Complaint Date:</Text>
          <Text style={styles.value}>{formatDate(complaint.created_at)}</Text>
        </>
      )}
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
    color:'#20315f'
  },
  value: {
    fontSize: 16,
    color:'#6f7c9a',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 16,
    resizeMode: 'contain',
  },
});

export default UserComplaintDetails;
