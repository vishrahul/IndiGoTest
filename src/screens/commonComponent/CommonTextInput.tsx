import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

interface inputType {
  placeholder: string;
  value: string;
  onChangeText: () => {};
  onFocus: () => {};
}

const CommonTextInput = ({
  placeholder,
  value,
  onChangeText,
  onFocus,
}: inputType) => {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        style={stylesInput.input}
      />
    </View>
  );
};

const stylesInput = StyleSheet.create({
  input: {
    width: '95%',
    height: 45,
    borderColor: '#000000',
    borderWidth: 1,
    margin: 5,
    padding: 5,
    alignSelf: 'center',
    borderRadius: 10,
  },
});

export default CommonTextInput;
