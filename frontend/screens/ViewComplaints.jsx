// screens/ViewComplaints.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const ViewComplaints = () => {
  const navigation = useNavigation();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    axios.get('http://172.16.0.42:8000/complaints/')
      .then(response => setComplaints(response.data))
      .catch(error => console.error(error));
  }, []);

  const renderComplaint = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ComplaintDetails', { complaint: item })}
    >
      <Text style={styles.title}>{item.complaint_type}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={complaints}
        renderItem={renderComplaint}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});

export default ViewComplaints;
