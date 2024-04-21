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
} from "react-native";
import axios from "axios";

const MedicationPage = () => {
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [medicationRecords, setMedicationRecords] = useState([]);

  const addMedicationRecord = async () => {
    try {
      const response = await axios.post("medication/add-medication", {
        name,
        dosage,
      });
      if (response.data) {
        Alert.alert("Success", "Medication record added successfully!");
        getMedicationRecords();
      }
    } catch (error) {
      console.error("Error adding medication record:", error);
      Alert.alert("Error", "Failed to add medication record.");
    }
  };

  const getMedicationRecords = async () => {
    try {
      const response = await axios.get("medication/get-medication");
      setMedicationRecords(response.data);
    } catch (error) {
      console.error("Error fetching medication records:", error);
      Alert.alert("Error", "Failed to fetch medication records.");
    }
  };

  const deleteMedicationRecord = async (id) => {
    try {
      const response = await axios.delete(`medication/delete-medication/${id}`);
      if (response.data.message === "Record deleted successfully") {
        Alert.alert("Success", "Medication record deleted successfully!");
        getMedicationRecords();
      } else {
        Alert.alert("Error", "Failed to delete medication record.");
      }
    } catch (error) {
      console.error("Error deleting medication record:", error);
      Alert.alert("Error", "Failed to delete medication record.");
    }
  };

  const confirmDelete = (id) => {
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
          onPress: () => deleteMedicationRecord(id),
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    getMedicationRecords();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          style={styles.input}
          placeholder="Medication Name"
          placeholderTextColor={"gray"}
          value={name}
          onChangeText={setName}
          keyboardAppearance="dark"
        />
        <TextInput
          style={styles.input}
          placeholder="Dosage"
          placeholderTextColor={"gray"}
          value={dosage}
          onChangeText={setDosage}
          keyboardAppearance="dark"
        />
        <Button title="Add Medication" onPress={addMedicationRecord} />
        <Text style={styles.sectionTitle}>Medication Records:</Text>
        {medicationRecords.map((record) => (
          <View style={styles.card} key={record._id}>
            <View style={styles.medicationInfo}>
              <Text style={styles.cardText}>{`Name: ${record.name}`}</Text>
              <Text style={styles.cardText}>{`Dosage: ${record.dosage}`}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => confirmDelete(record._id)}>
                <Text style={[styles.actionButton, styles.deleteButton]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "white",
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#323232",
    padding: 10,
    marginBottom: 10,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
    color: "white",
  },
  medicationInfo: {
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  actionButton: {
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: "lightblue",
  },
  deleteButton: {
    backgroundColor: "#ff595e",
  },
});

export default MedicationPage;
