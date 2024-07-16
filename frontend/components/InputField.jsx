import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

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
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}
    >
      {icon}
      <TextInput
        placeholder={label}
        keyboardType={keyboardType}
        style={{ flex: 1, paddingVertical: 0 }}
        secureTextEntry={inputType === 'password'}
        value={value}
        onChangeText={onChangeText}
      />
      {fieldButtonLabel && (
        <TouchableOpacity onPress={fieldButtonFunction}>
          <Text style={{ color: '#AD40AF', fontWeight: '700' }}>{fieldButtonLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
