import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, RefreshControl } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

// Define the priority order for complaint types
const priorityOrder = ['maintenance','cleanliness', 'food', 'other'];

const getPriority = (type) => {
  return priorityOrder.indexOf(type.toLowerCase());
};

// Function to convert date string to Date object
const parseDate = (dateString) => {
  return new Date(dateString);
};

// Common logic for fetching and sorting complaints
const fetchComplaints = async (status, setComplaints) => {
  try {
    const response = await axios.get('http://192.168.243.94:8000/complaints/');
    const filteredComplaints = response.data.filter(complaint => complaint.status === status);
    
    const sortedComplaints = filteredComplaints.sort((a, b) => {
      const dateComparison = parseDate(a.created_at) - parseDate(b.created_at);
      
      if (dateComparison !== 0) {
        return dateComparison; // Sort by date first
      }
      
      // If dates are the same, sort by priority
      return getPriority(a.complaint_type) - getPriority(b.complaint_type);
    });
    
    setComplaints(sortedComplaints);
  } catch (error) {
    console.error(error);
  }
};

// Component to display pending complaints
const PendingComplaints = () => {
  const navigation = useNavigation();
  const [complaints, setComplaints] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchComplaints('Pending', setComplaints).finally(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    fetchComplaints('Pending', setComplaints);
  }, []);

  const renderComplaint = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('AdminComplaintDetails', { complaint: item })}
    >
      <Text style={styles.title}>{item.complaint_type}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.description}>{item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={complaints}
        renderItem={renderComplaint}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#20315f']}
          />
        }
      />
    </View>
  );
};

// Component to display resolved complaints
const ResolvedComplaints = () => {
  const navigation = useNavigation();
  const [complaints, setComplaints] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchComplaints('Resolved', setComplaints).finally(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    fetchComplaints('Resolved', setComplaints);
  }, []);

  const renderComplaint = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('AdminComplaintDetails', { complaint: item })}
    >
      <Text style={styles.title}>{item.complaint_type}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.description}>{item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={complaints}
        renderItem={renderComplaint}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#20315f']}
          />
        }
      />
    </View>
  );
};

const AdminViewComplaints = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#F5B041',
        tabBarInactiveTintColor: '#20315f',
        tabBarIndicatorStyle: { backgroundColor: '#F5B041' },
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
      }}
    >
      <Tab.Screen name="Pending" component={PendingComplaints} />
      <Tab.Screen name="Resolved" component={ResolvedComplaints} />
    </Tab.Navigator>
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
});

export default AdminViewComplaints;
