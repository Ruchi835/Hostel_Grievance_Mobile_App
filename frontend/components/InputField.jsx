import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  value,
  onChangeText,
  fieldButtonLabel,
  fieldButtonFunction,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
        alignItems: 'center',
      }}
    >
      {icon}
      <TextInput
        placeholder={label}
        keyboardType={keyboardType}
        style={{ flex: 1, paddingVertical: 0 }}
        secureTextEntry={inputType === 'password' && !isPasswordVisible}
        value={value}
        onChangeText={onChangeText}
      />
      {inputType === 'password' && (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Ionicons
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={20}
            color="#20315f"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
