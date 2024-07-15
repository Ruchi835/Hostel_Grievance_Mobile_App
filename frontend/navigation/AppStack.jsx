import React, { useState } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ComplaintScreen from '../screens/ComplaintScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import AboutScreen from '../screens/AboutScreen';
import GatePassScreen from '../screens/GatePassScreen';
import AddStudent from '../screens/AddStudent';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from 'react-native';

const Drawer = createDrawerNavigator();

// const CustomDrawerContent = (props) => {
//   const [showAddUserSubmenu, setShowAddUserSubmenu] = useState(false);

//   const toggleAddUserSubmenu = () => {
//     setShowAddUserSubmenu(!showAddUserSubmenu);
//   };

//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//       <DrawerItem
//         label="Add User"
//         icon={({ focused, color, size }) => (
//           <Ionicons name={focused ? 'person-add-outline' : 'person-add-outline'} size={size} color={focused ? '#F5B041' : '#20315f'} />
//         )}
//         onPress={toggleAddUserSubmenu}
//       />
//       {showAddUserSubmenu && (
//         <>
//           <DrawerItem
//             label="Add Student"
//             onPress={() => props.navigation.navigate('AddStudent')}
//             icon={({ focused, color, size }) => (
//               <Ionicons name="person-outline" size={size} color={focused ? '#F5B041' : '#20315f'} />
//             )}
//           />
//           <DrawerItem
//             label="Add Admin"
//             onPress={() => props.navigation.navigate('AddAdmin')}
//             icon={({ focused, color, size }) => (
//               <Ionicons name="person-outline" size={size} color={focused ? '#F5B041' : '#20315f'} />
//             )}
//           />
//           <DrawerItem
//             label="Add Security"
//             onPress={() => props.navigation.navigate('AddSecurity')}
//             icon={({ focused, color, size }) => (
//               <Ionicons name="person-outline" size={size} color={focused ? '#F5B041' : '#20315f'} />
//             )}
//           />
//         </>
//       )}
//     </DrawerContentScrollView>
//   );
// };

const AppStack = () => {
  const handleSubmit = () => {
    // Validate the form fields
    if (!formData.username || !formData.password || !formData.email || !formData.branch || !formData.semester || !formData.roomno) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Perform submission logic here (e.g., send data to backend, show confirmation)
    console.log('Adding student:', formData);

    // Optionally, reset form fields after submission
    setFormData({
      username: '',
      password: '',
      email: '',
      branch: '',
      semester: '',
      roomno: '',
    });

    // Navigate or show a success message
    Alert.alert('Success', 'Student added successfully');
  };

  return (
    <Drawer.Navigator
      // drawerContent={(props) => <CustomDrawerContent {...props} />}
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
          }else if(route.name === 'AddUser') {
            iconName = focused ? 'person-add-outline' : 'person-add-outline';
          }
          return <Ionicons name={iconName} size={size} color={focused ? '#F5B041' : '#20315f'} />;
        },
      })}
      drawerPosition="left" // Default is 'left', can also use 'right'
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
        component={ComplaintScreen}
        options={{
          headerShown: true,
          title: 'Complaint',
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
