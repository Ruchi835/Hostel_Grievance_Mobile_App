import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginSVG from '../assets/images/logo.jpeg';
import CustomButton from '../components/CustomButton.jsx';
import InputField from '../components/InputField.jsx';

const LoginScreen = () => {

    const navigation = useNavigation();

  // Dynamically set header options when component is rendered
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Onboarding')}>
          <MaterialIcons name="arrow-back" size={24} color="#20315f" />
        </TouchableOpacity>
      ),
      title: '', // Set the header title
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center',backgroundColor:'#ffffff'}}>
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          
        </View>

        <Text
          style={{
           // fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#20315f',
            marginBottom: 30,
          }}>
          Login
        </Text>

        <InputField
          label={'UserName'}
          icon={
            <MaterialIcons
            name="person"
            size={20}
            color="#20315f"
            style={{marginRight: 5}}
          />
          }
          keyboardType="default"
        />

        <InputField
          label={'Password'}
          icon={
            <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#20315f"
            style={{marginRight: 5}}
          />
          }
          inputType="password"
        //   fieldButtonLabel={"Forgot?"}
        //   fieldButtonFunction={() => {}}
        />
        
        <CustomButton label={"Login"} onPress={() => { navigation.navigate('AppStack')}} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;