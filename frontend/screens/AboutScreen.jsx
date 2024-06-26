import React from 'react';
import { View, Text } from 'react-native';

const AboutScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
      }}
    >
      <Text style={{ fontSize: 20 }}>About Screen</Text>
    </View>
  );
};

export default AboutScreen;
