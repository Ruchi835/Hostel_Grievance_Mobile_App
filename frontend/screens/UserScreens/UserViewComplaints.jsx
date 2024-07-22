import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, RefreshControl, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserViewComplaints = () => {
  const navigation = useNavigation();
  const [complaints, setComplaints] = useState([]);
  const [studentId, setStudentId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchComplaints = async () => {
    if (studentId !== null) {
      try {
        const response = await axios.get(`http://192.168.243.94:8000/complaints/user-complaints/${studentId}/`);
        setComplaints(response.data.complaints);
      } catch (error) {
        console.error('API Error:', error);
        Alert.alert('Error', 'Failed to fetch complaints');
      }
    }
  };

  useEffect(() => {
    const fetchStudentId = async () => {
      try {
        const loginData = await AsyncStorage.getItem('user');
        if (loginData) {
          const parsedData = JSON.parse(loginData);
          setStudentId(parsedData.id);
        }
      } catch (error) {
        console.error('Failed to load student ID', error);
      }
    };

    fetchStudentId();
  }, []);

  useEffect(() => {
    fetchComplaints();
  }, [studentId]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchComplaints().finally(() => setRefreshing(false));
  }, [studentId]);

  const renderComplaint = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('UserComplaintDetails', { complaint: item })}
    >
      <Text style={styles.title}>{item.complaint_type}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.description}>{item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {studentId === null ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={complaints}
          renderItem={renderComplaint}
          keyExtractor={item => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#20315f']} // Color for the refresh indicator
            />
          }
        />
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
    color:'#20315f',
  },
  description: {
    fontSize: 14,
    color:'#6f7c9a',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginTop: 8,
  },
});

export default UserViewComplaints;
