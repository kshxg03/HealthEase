import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import axios from "axios";

const HealthRecords = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [uricAcid, setUricAcid] = useState("");
  const [vitaminD, setVitaminD] = useState("");
  const [magnesium, setMagnesium] = useState("");
  const [vitaminB12, setVitaminB12] = useState("");
  const [fastingBloodGlucose, setFastingBloodGlucose] = useState("");
  const [lipidProfile, setLipidProfile] = useState("");
  const [cbc, setCbc] = useState("");

  const generatePdf = async () => {
    if (!name || !age || !gender) {
      Alert.alert("Error", "Name, Age, and Gender are mandatory fields");
      return;
    }

    const currentDate = new Date().toLocaleDateString();

    const html = `
  <html>
    <head>
      <style>
        body {
          margin: 0 20px; /* 20px margin on both sides */
        }
        .title {
          text-align: center;
        }
        .ease {
          color: green;
          
        }
      </style>
    </head>
    <body>
      <h1 class="title">Health-<span class="ease">Ease</span> Record</h1>
      <h4 class="date">Date: ${currentDate}</h4>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Age:</strong> ${age} years</p>
      <p><strong>Gender:</strong> ${gender}</p>
      <p><strong>Blood Pressure:</strong> ${bloodPressure} mmHg</p>
      <p><strong>Uric Acid:</strong> ${uricAcid} mg/dL</p>
      <p><strong>Vitamin D:</strong> ${vitaminD} ng/mL</p>
      <p><strong>Magnesium:</strong> ${magnesium} mg/dL</p>
      <p><strong>Vitamin B12:</strong> ${vitaminB12} pg/mL</p>
      <p><strong>Fasting Blood Glucose:</strong> ${fastingBloodGlucose} mg/dL</p>
      <p><strong>Lipid Profile:</strong> ${lipidProfile} mg/dL</p>
      <p><strong>CBC:</strong> ${cbc} cells/μL</p>
    </body>
  </html>
`;

    try {
      const file = await printToFileAsync({
        html: html,
        base64: false,
      });

      await shareAsync(file.uri);
      clearInputFields();
    } catch (error) {
      console.error("Error generating or sharing PDF:", error);
    }
  };

  const saveHealthRecord = async () => {
    if (!name || !age || !gender) {
      Alert.alert("Error", "Name, Age, and Gender are mandatory fields");
      return;
    }

    try {
      const response = await axios.post("record/health-record", {
        name,
        age,
        gender,
        bloodPressure,
        uricAcid,
        vitaminD,
        magnesium,
        vitaminB12,
        fastingBloodGlucose,
        lipidProfile,
        cbc,
      });

      Alert.alert("Success", response.data.message);
      clearInputFields();
    } catch (error) {
      console.error("Error saving health record:", error);
      Alert.alert("Error", "Failed to save health record");
    }
  };

  const clearInputFields = () => {
    setName("");
    setAge("");
    setGender("");
    setBloodPressure("");
    setUricAcid("");
    setVitaminD("");
    setMagnesium("");
    setVitaminB12("");
    setFastingBloodGlucose("");
    setLipidProfile("");
    setCbc("");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          value={name}
          placeholder="Name"
          placeholderTextColor={"gray"}
          style={styles.textInput}
          onChangeText={(value) => setName(value)}
        />
        <TextInput
          value={age}
          placeholder="Age"
          placeholderTextColor={"gray"}
          style={styles.textInput}
          onChangeText={(value) => setAge(value)}
        />
        <TextInput
          value={gender}
          placeholder="Gender"
          placeholderTextColor={"gray"}
          style={styles.textInput}
          onChangeText={(value) => setGender(value)}
        />
        <TextInput
          value={bloodPressure}
          placeholder="Blood Pressure"
          placeholderTextColor={"gray"}
          style={styles.textInput}
          onChangeText={(value) => setBloodPressure(value)}
        />
        <TextInput
          value={uricAcid}
          placeholder="Uric Acid"
          placeholderTextColor={"gray"}
          style={styles.textInput}
          onChangeText={(value) => setUricAcid(value)}
        />
        <TextInput
          value={vitaminD}
          placeholder="Vitamin D"
          placeholderTextColor={"gray"}
          style={styles.textInput}
          onChangeText={(value) => setVitaminD(value)}
        />
        <TextInput
          value={magnesium}
          placeholder="Magnesium"
          placeholderTextColor={"gray"}
          style={styles.textInput}
          onChangeText={(value) => setMagnesium(value)}
        />
        <TextInput
          value={vitaminB12}
          placeholder="Vitamin B12"
          placeholderTextColor={"gray"}
          style={styles.textInput}
          onChangeText={(value) => setVitaminB12(value)}
        />
        <TextInput
          value={fastingBloodGlucose}
          placeholder="Fasting Blood Glucose"
          placeholderTextColor={"gray"}
          style={styles.textInput}
          onChangeText={(value) => setFastingBloodGlucose(value)}
        />
        <TextInput
          value={lipidProfile}
          placeholder="Lipid Profile"
          placeholderTextColor={"gray"}
          style={styles.textInput}
          onChangeText={(value) => setLipidProfile(value)}
        />
        <TextInput
          value={cbc}
          placeholder="CBC"
          placeholderTextColor={"gray"}
          style={styles.textInput}
          onChangeText={(value) => setCbc(value)}
        />
        <View style={styles.buttonContainer}>
          <Button title="Generate sharable PDF" onPress={generatePdf} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Save Health Record" onPress={saveHealthRecord} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  Title: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    margin: 10,
    color: "white",
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default HealthRecords;
