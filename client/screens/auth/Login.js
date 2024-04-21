import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Home from "../Home";

const Login = ({ navigation }) => {
  const [state, setState] = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const getLocalStorageData = async () => {
    try {
      let data = await AsyncStorage.getItem("@auth");
      console.log("Local Storage data ==> ", data);
    } catch (error) {
      console.error("Error while getting local storage data: ", error);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert("Please fill out all the fields.");
        setLoading(false);
        return;
      }
      const { data } = await axios.post("/auth/login", { email, password });
      setState(data);
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      alert(data && data.message);
      navigation.navigate("Home");
    } catch (error) {
      if (error.response && error.response.status === 500) {
        Alert.alert("User not found. Please check your email and password.");
      } else {
        alert(error.response.data.message);
      }
      setLoading(false);
    }
    getLocalStorageData();
  };

  return (
    <View style={styles.container}>
      <View style={styles.TitleView}>
        <Text style={styles.healthText}>Health</Text>
        <Text style={styles.easeText}>Ease</Text>
      </View>
      <View>
        <View style={{ marginHorizontal: 20 }}>
          <InputBox
            inputTitle={"Email"}
            keyboardType="email-address"
            autoComplete="email"
            value={email}
            setValue={setEmail}
          />
          <InputBox
            inputTitle={"Password"}
            secureTextEntry={true}
            autoComplete="password"
            value={password}
            setValue={setPassword}
          />
        </View>

        <SubmitButton
          btnTitle={"Login"}
          loading={loading}
          handleSubmit={handleSubmit}
          style={styles.submitbtn}
        />
      </View>

      <Text style={styles.linkText}>
        Don't have an account?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Register")}
        >
          Signup
        </Text>{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 40,
  },
  pageTitle: {
    fontSize: 30,
    // fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputBox: {
    height: 30,
    marginBottom: 20,
    marginTop: 10,
    paddingLeft: 10,
  },
  linkText: {
    fontSize: 14,
    textAlign: "center",
    color: "white",
  },
  link: {
    color: "#2ec0f9",
  },
  healthText: {
    fontSize: 30,
    color: "white",
  },
  easeText: {
    fontSize: 30,
    color: "#00f59b",
  },
  TitleView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Login;
