import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import axios from 'axios';
import moment from 'moment';

const RecordDetails = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetchRecords();
    }, []);
  
    const fetchRecords = async () => {
      try {
        const response = await axios.get('record/get-health-records');
        setRecords(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching records:', error);
        setError('Failed to fetch records');
        setLoading(false);
      }
    };
  
    if (loading) {
      return <Text>Loading...</Text>;
    }
  
    if (error) {
      return <Text>Error: {error}</Text>;
    }
  
    if (records.length === 0) {
      return <Text style={styles.noReports}>No reports to show</Text>;
    }

    const deleteRecord = async (id) => {
      try {
        const response = await axios.delete(`/record/delete-record/${id}`);
  
        if (response.data.message === "Record deleted successfully") {
          setRecords(records.filter((record) => record._id !== id));
          Alert.alert("Success", "Record deleted successfully!");
        } else {
          Alert.alert("Error", "Failed to delete record.");
        }
      } catch (error) {
        console.error("Error deleting record:", error);
        Alert.alert("Error", "Failed to delete record.");
      }
    };
  
    const confirmDeleteRecord = (id) => {
      Alert.alert(
        "Confirm Delete",
        "Are you sure you want to delete this record?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Delete",
            onPress: () => deleteRecord(id) // Call deleteRecord if confirmed
          }
        ],
        { cancelable: false }
      );
    };
  
    return (
      <View style={styles.container}>
        {records.map((record, index) => (
          <View key={index} style={styles.card}>
            <TouchableOpacity style={styles.deleteIcon} onPress={() => confirmDeleteRecord(record._id)}>
              <Ionicons name="trash-outline" size={20} color="#ff595e" />
            </TouchableOpacity>
            <Text style={styles.cardTitle}>HealthEase Record</Text>
            <Text style={styles.dateShown}>{moment(record.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</Text>
            <Text style={styles.bodyText}>Name: {record.name}</Text>
            <Text style={styles.bodyText}>Age: {record.age} years</Text>
            <Text style={styles.bodyText}>Gender: {record.gender}</Text>
            <Text style={styles.bodyText}>Blood Pressure: {record.bloodPressure} mmHg</Text>
            <Text style={styles.bodyText}>Uric Acid: {record.uricAcid} mg/dL</Text>
            <Text style={styles.bodyText}>Vitamin D: {record.vitaminD} ng/mL</Text>
            <Text style={styles.bodyText}>Magnesium: {record.magnesium} mg/dL</Text>
            <Text style={styles.bodyText}>Vitamin B12: {record.vitaminB12} pg/mL</Text>
            <Text style={styles.bodyText}>Fasting Blood Glucose: {record.fastingBloodGlucose} mg/dL</Text>
            <Text style={styles.bodyText}>Lipid Profile: {record.lipidProfile} mg/dL</Text>
            <Text style={styles.bodyText}>CBC: {record.cbc} cells/μL</Text>
          </View>
        ))}
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#323232'
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center', // Align title to center
    marginBottom: 3,
    color: '#00f59b'
  },
  dateShown: {
    fontSize: 10,
    textAlign: 'center', // Align title to center
    marginBottom: 5,
    color: 'white'
  },
  bodyText: {
    fontSize: 12,
    marginBottom: 5,
    color: 'white'
  },
  noReports: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    color: 'white',
    marginTop: 30,
  },
  deleteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1, // Ensure the delete icon is above other elements
},
});

export default RecordDetails;
