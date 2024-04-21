import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";
import moment from "moment";
import CustomPicker from "../components/CustomPicker";
import FooterMenu from "../components/Menus/FooterMenu";

const MedicalRecordsApp = () => {
  const [records, setRecords] = useState([]);
  const [newRecordValue, setNewRecordValue] = useState("");
  const [newRecordType, setNewRecordType] = useState("Blood Pressure");
  const [newRecordUnit, setNewRecordUnit] = useState("mmHg");

  const unitMapping = {
    "Blood Pressure": "mmHg",
    Glucose: "mg/dL",
    Cholesterol: "mg/dL",
  };

  const normalRanges = {
    "Blood Pressure": { low: 90, high: 120 },
    Glucose: { low: 70, high: 100 },
    Cholesterol: { low: 125, high: 200 },
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
        setRecords(records.filter((record) => record._id !== id));
        Alert.alert("Success", "Medical record deleted successfully!");
      } else {
        Alert.alert("Error", "Failed to delete medical record.");
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      Alert.alert("Error", "Failed to delete medical record.");
    }
  };

  const confirmDeleteRecord = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this record?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteRecord(id), // Call deleteRecord if confirmed
        },
      ],
      { cancelable: false }
    );
  };

  const handlePickerChange = (itemValue) => {
    setNewRecordType(itemValue);
    setNewRecordUnit(unitMapping[itemValue] || "Unit");
  };

  const assessRecord = (type, value) => {
    const range = normalRanges[type];
    const numValue = parseFloat(value);
    if (numValue < range.low) return { status: "Low", color: "red" };
    if (numValue > range.high) return { status: "High", color: "red" };
    return { status: "Normal", color: "green" };
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView>
          <View style={styles.inputContainer}>
            <CustomPicker
              value={newRecordType}
              options={Object.keys(unitMapping)}
              onSelect={handlePickerChange}
            />
            <TextInput
              style={styles.input}
              placeholder="New Record Value"
              placeholderTextColor="gray"
              value={newRecordValue}
              onChangeText={setNewRecordValue}
              keyboardType="number-pad"
              keyboardAppearance="dark"
            />
            <Button title="Save" onPress={saveData} />
            <Text style={styles.sectionTitle}>Your Biomarkings:</Text>
          </View>
          {records.map((item, index) => (
            <View key={index} style={styles.item}>
              <View style={styles.itemContent}>
                <Text
                  style={styles.itemText}
                >{`${item.type}: ${item.value} ${item.unit}`}</Text>
                <Text
                  style={{
                    ...styles.itemText,
                    ...styles.assessmentText,
                    color: assessRecord(item.type, item.value).color,
                  }}
                >
                  Status: {assessRecord(item.type, item.value).status}
                </Text>
                {item.createdAt && (
                  <Text style={{ ...styles.itemText, ...styles.timeText }}>
                    Added on:{" "}
                    {moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.deleteButtonContainer}
                onPress={() => confirmDeleteRecord(item._id)} 
              >
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </TouchableWithoutFeedback>
      <FooterMenu />
    </View>
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "white",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#323232",
    padding: 20,
    marginBottom: 10,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: "lightcoral",
  },
  deleteButtonContainer: {
    marginLeft: 10,
  },
  timeText: {
    marginTop: 4,
    color: "#f4f4f4",
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    color: "white",
  },
  assessmentText: {
    marginTop: 4,
  },
  itemText: {
    color: "white",
  },
});

export default MedicalRecordsApp;
