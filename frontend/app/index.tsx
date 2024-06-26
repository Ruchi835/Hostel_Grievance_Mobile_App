import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthStack from '../navigation/AuthStack.jsx';
import AppStack from '../navigation/AppStack.jsx';

function App() {
  return (
    <NavigationContainer independent={true} >
       {/* <AppStack />  */}
      <AuthStack /> 
      
    </NavigationContainer>
  );
}

export default App;