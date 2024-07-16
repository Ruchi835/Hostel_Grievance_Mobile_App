import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <Ionicons
          name="person-circle-outline"
          size={100}
          color="#20315f" // You can customize the color as needed
        />
        <Text style={styles.profileName}>User Name</Text> 
        <Text style={styles.profileEmail}>user@example.com</Text> 
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
});

export default CustomDrawerContent;
