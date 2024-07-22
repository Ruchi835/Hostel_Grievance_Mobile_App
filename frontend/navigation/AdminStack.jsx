// AppStack.jsx
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminHomeScreen from '../screens/AdminScreens/AdminHomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import AboutScreen from '../screens/AboutScreen';
import GatePassScreen from '../screens/GatePassScreen';
import AddStudent from '../screens/AdminScreens/AddStudent';
import AdminViewComplaints from '../screens/AdminScreens/AdminViewComplaints';
import AdminComplaintDetails from '../screens/AdminScreens/AdminComplaintDetails'; // Import ComplaintDetails
import { Ionicons } from '@expo/vector-icons';
import LogoutScreen from '../screens/LogoutScreen';
import CustomDrawerContent from './CustomDrawerContent'; // Import the custom drawer content component

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const ComplaintsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminViewComplaints"
        component={AdminViewComplaints}
        options={{ headerShown: false, title: 'View Complaints' }}
      />
      <Stack.Screen
        name="AdminComplaintDetails"
        component={AdminComplaintDetails}
        options={{ headerShown: false, title: 'Complaint Details', headerShadowVisible: false }}
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

const AdminStack = () => {
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
        component={AdminHomeScreen}
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
        name="AddUser"
        component={AddStudent}
        options={{
          headerShown: true,
          title: 'Add User',
          headerTitleStyle: {
            color: '#20315f', // Set the title color here
          },
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

export default AdminStack;
