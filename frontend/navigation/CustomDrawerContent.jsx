import React, { useEffect, useState  } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawerContent = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        const username = await AsyncStorage.getItem('username');
        if (userData && username) {
          setUser({ ...JSON.parse(userData), username });
        }
      } catch (error) {
        console.error('Failed to load user data', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <Ionicons
          name="person-circle-outline"
          size={100}
          color="#20315f" // You can customize the color as needed
        />
        {user ? (
          <>
            <Text style={styles.profileName}>Welcome, {user.username}</Text>
            <Text style={styles.profileEmail}>{user.usertype}</Text>
          </>
        ) : (
          <Text style={styles.loadingText}>Loading...</Text>
        )}
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    
  },
  profileName: {
    marginTop: 10,
    fontSize: 18,
    color: '#20315f',
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 14,
    color: '#20315f',
  },
  loadingText: {
    fontSize: 16,
    color: '#20315f',
  },
  
});

export default CustomDrawerContent;
