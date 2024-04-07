import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomPicker from "../components/CustomPicker"; // Import the CustomPicker component
import FooterMenu from "../components/Menus/FooterMenu";
import moment from "moment";
import axios from "axios";

const MedicalRecordsApp = () => {
  const [records, setRecords] = useState([]);
  const [newRecordValue, setNewRecordValue] = useState("");
  const [newRecordType, setNewRecordType] = useState("Blood Pressure");
  const [newRecordUnit, setNewRecordUnit] = useState("mmHg"); // Default unit

  const unitMapping = {
    "Blood Pressure": "mmHg",
    Glucose: "mg/dL",
    Cholesterol: "mg/dL",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/medical/get-diagnostic");
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "Failed to fetch medical records.");
      }
    };

    fetchData();
  }, []);

  const saveData = async () => {
    if (!newRecordValue.trim()) {
      Alert.alert("Alert", "Please enter a record value.");
      return;
    }

    try {
      const response = await axios.post("/medical/add-diagnostic", {
        type: newRecordType,
        value: newRecordValue,
        unit: newRecordUnit,
      });

      if (response.data) {
        setRecords([...records, response.data]);
        setNewRecordValue("");
        Alert.alert("Success", "Medical record saved successfully!");
      } else {
        Alert.alert("Error", "Failed to save medical record.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      Alert.alert("Error", "Failed to save medical record.");
    }
  };

  const deleteRecord = async (id) => {
    try {
      const response = await axios.delete(`/medical/delete-diagnostic/${id}`);

      if (response.data.message === "Record deleted successfully") {
        setRecords((prevRecords) =>
          prevRecords.filter((record) => record._id !== id)
        );
        Alert.alert("Success", "Medical record deleted successfully!");
      } else {
        Alert.alert("Error", "Failed to delete medical record.");
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      Alert.alert("Error", "Failed to delete medical record.");
    }
  };

  const handlePickerChange = (itemValue) => {
    setNewRecordType(itemValue);
    setNewRecordUnit(unitMapping[itemValue]);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          {/* Replace Picker with CustomPicker */}
          <CustomPicker
            value={newRecordType}
            options={["Blood Pressure", "Glucose", "Cholesterol"]}
            onSelect={handlePickerChange}
          />
          <TextInput
            style={styles.input}
            placeholder="New Record Value"
            value={newRecordValue}
            onChangeText={setNewRecordValue}
            keyboardType="number-pad"
          />
          <Button title="Save" onPress={saveData} />
          <Text style={styles.sectionTitle}>Your Biomarkings:</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          {records.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => deleteRecord(item._id)}
            >
              <View style={styles.item}>
                <View style={styles.itemContent}>
                  <Text>{`${item.type}: ${item.value} ${item.unit}`}</Text>
                  {item.createdAt && (
                    <Text style={styles.timeText}>
                      Added on:{" "}
                      {moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                    </Text>
                  )}
                </View>
                <View style={styles.deleteButtonContainer}>
                  <Text style={styles.deleteButton}>Delete</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FooterMenu />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  picker: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fafafa",
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: "lightcoral",
  },
  deleteButtonContainer: {
    marginLeft: 10, // Adjust this value as needed
  },
  timeText: {
    marginTop: 4,
    color: "gray",
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  footerMenu: {
    position: "absolute", // Position it absolutely
    bottom: 0, // At the bottom
    left: 0, // Stretching across the screen
    right: 0,
  },
});

export default MedicalRecordsApp;
