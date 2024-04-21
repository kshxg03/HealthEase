import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native"; 

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const navigation = useNavigation(); 

  const submitFeedback = () => {
    axios
      .post("/feedback/add-feedback", { feedback })
      .then((response) => {
        Alert.alert("Success", "Feedback submitted successfully");
        setFeedback("");
        navigation.navigate("Profile");
      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Feedback/Report</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your feedback/ Report any issues..."
          placeholderTextColor={"gray"}
          multiline
          numberOfLines={5}
          value={feedback}
          onChangeText={(text) => setFeedback(text)}
          keyboardAppearance="dark"
        />
        <TouchableOpacity style={styles.button} onPress={submitFeedback}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    width: "100%",
    padding: 10,
    marginBottom: 20,
    minHeight: 200,
    paddingTop: 10,
    color: "white",
  },
  button: {
    backgroundColor: "#00f59b",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "black",
  },
});

export default Feedback;
