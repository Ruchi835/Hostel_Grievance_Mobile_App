import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import AppStack from './AppStack';
import AdminStack from './AdminStack';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
      <>
      <StatusBar barStyle="dark-content" backgroundColor="#e6e6e6" /> 
      <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen  name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShadowVisible:false,backgroundColor:'#ffffff'}} />
      <Stack.Screen name="AppStack" component={AppStack} options={{ headerShown: false }} />
      <Stack.Screen name="AdminStack" component={AdminStack} options={{ headerShown: false }} />
      </Stack.Navigator>
      </>
    );
};
export default AuthStack;