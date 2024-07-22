import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserHomeScreen from '../screens/UserScreens/UserHomeScreen';
import ComplaintScreen from '../screens/UserScreens/ComplaintScreen';
import AboutScreen from '../screens/AboutScreen';
import GatePassScreen from '../screens/GatePassScreen';
import UserViewComplaints from '../screens/UserScreens/UserViewComplaints';
import UserComplaintDetails from '../screens/UserScreens/UserComplaintDetails'; // Import ComplaintDetails
import { Ionicons } from '@expo/vector-icons';
import CustomDrawerContent from './CustomDrawerContent'; // Import the custom drawer content component
import LogoutScreen from '../screens/LogoutScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const ComplaintsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserViewComplaints"
        component={UserViewComplaints}
        options={{ headerShown: false, title: 'View Complaints' }}
      />
      <Stack.Screen
        name="UserComplaintDetails"
        component={UserComplaintDetails}
        options={{ headerShown:false, title: 'Complaint Details',headerShadowVisible: false }}
      />
    </Stack.Navigator>
  );
};

const HeaderRightImage = () => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={require('../assets/images/about.png')} // Replace with your image path
        style={styles.image}
      />
    </View>
  );
};

const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ route }) => ({
        drawerActiveBackgroundColor: '#20315f',
        drawerInactiveTintColor: '#20315f',
        drawerActiveTintColor: '#F5B041',
        drawerIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home-outline' : 'home-outline';
          } else if (route.name === 'ViewComplaint') {
            iconName = focused ? 'chatbox-outline' : 'chatbox-outline';
          } else if (route.name === 'UserComplaint') {
            iconName = focused ? 'alert-circle-outline' : 'alert-circle-outline';
          } else if (route.name === 'About') {
            iconName = focused ? 'information-circle-outline' : 'information-circle-outline';
          } else if (route.name === 'GatePass') {
            iconName = focused ? 'document-outline' : 'document-outline';
          } else if (route.name === 'Logout') {
            iconName = focused ? 'log-out-outline' : 'log-out-outline';
          } else if (route.name === 'AddUser') {
            iconName = focused ? 'person-add-outline' : 'person-add-outline';
          }
          return <Ionicons name={iconName} size={size} color={focused ? '#F5B041' : '#20315f'} />;
        },
        headerRight: () => <HeaderRightImage />, // Add the image to the header
      })}
      drawerPosition="left"
    >
      <Drawer.Screen
        name="Home"
        component={UserHomeScreen}
        options={{
          headerShown: true,
          title: 'Home',
          headerTitleStyle: {
            color: '#20315f', // Set the title color here
          },
          headerShadowVisible: false,
        }}
      />
      <Drawer.Screen
        name="ViewComplaint"
        component={ComplaintsStack} // Use ComplaintsStack instead of ViewComplaints directly
        options={{
          headerShown: true,
          title: 'View Complaints',
          headerTitleStyle: {
            color: '#20315f', // Set the title color here
          },
          headerShadowVisible: false,
        }}
      />
       <Drawer.Screen
        name="UserComplaint"
        component={ComplaintScreen}
        options={{
          headerShown: true,
          title: 'Report Issue',
          headerTitleStyle: {
            color: '#20315f', // Set the title color here
          },
          headerShadowVisible: false,
        }}
      />
      <Drawer.Screen
        name="GatePass"
        component={GatePassScreen}
        options={{
          headerShown: true,
          title: 'GatePass',
          headerTitleStyle: {
            color: '#20315f', // Set the title color here
          },
          headerShadowVisible: false,
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerShown: true,
          title: 'About',
          headerTitleStyle: {
            color: '#20315f', // Set the title color here
          },
          headerShadowVisible: false,
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          headerShown: false,
          title: 'Logout',
          headerShadowVisible: false,
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default AppStack;
