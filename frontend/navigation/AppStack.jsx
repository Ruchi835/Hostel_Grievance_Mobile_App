import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ComplaintScreen from '../screens/ComplaintScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import AboutScreen from '../screens/AboutScreen';
import GatePassScreen from '../screens/GatePassScreen';
import AddStudent from '../screens/AddStudent';
import ViewComplaints from '../screens/ViewComplaints';
import { Ionicons } from '@expo/vector-icons';
import CustomDrawerContent from './CustomDrawerContent'; // Import the custom drawer content component
import ComplaintDetails from '../screens/ComplaintDetails';


const Drawer = createDrawerNavigator();

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
          } else if (route.name === 'Complaint') {
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
      })}
      drawerPosition="left"
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          title: 'Home',
          headerShadowVisible: false,
        }}
      />
      <Drawer.Screen
        name="Complaint"
        component={ViewComplaints}
        options={{
          headerShown: true,
          title: 'View Complaints',
          headerShadowVisible: false,
        }}
      />
      <Drawer.Screen
        name="GatePass"
        component={GatePassScreen}
        options={{
          headerShown: true,
          title: 'GatePass',
          headerShadowVisible: false,
        }}
      />
      <Drawer.Screen
        name="AddUser"
        component={AddStudent}
        options={{ headerShown: true, title: 'Add User' }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerShown: true,
          title: 'About',
          headerShadowVisible: false,
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={OnboardingScreen}
        options={{
          headerShown: false,
          title: 'Logout',
          headerShadowVisible: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;
