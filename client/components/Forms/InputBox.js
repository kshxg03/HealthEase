import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

const InputBox = ({
  inputTitle,
  keyboardType,
  autoComplete,
  secureTextEntry = false,
  value,
  setValue,
}) => {
  return (
    <View>
      <Text style={styles.inputTitle}>{inputTitle}</Text>
      <TextInput
        style={styles.inputBox}
        autoCorrect={false}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputTitle: {
    color: "white",
  },
  inputBox: {
    height: 40,
    marginBottom: 20,
    backgroundColor: "black",
    borderColor: "gray",
    marginTop: 10,
    paddingLeft: 10,
    borderWidth: 1,
    color: "white",
  },
});

export default InputBox;
