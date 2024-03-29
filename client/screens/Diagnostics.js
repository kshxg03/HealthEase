import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import FooterMenu from '../components/Menus/FooterMenu';
import moment from 'moment';
import axios from 'axios';

const MedicalRecordsApp = () => {
    const [records, setRecords] = useState([]);
    const [newRecordValue, setNewRecordValue] = useState('');
    const [newRecordType, setNewRecordType] = useState('Blood Pressure');
    const [newRecordUnit, setNewRecordUnit] = useState('mmHg'); // Default unit

    // Mapping of medical record types to units
    const unitMapping = {
        'Blood Pressure': 'mmHg',
        'Glucose': 'mg/dL',
        'Cholesterol': 'mg/dL',
        // Add more record types and their corresponding units as needed
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/medical/get-diagnostic');
                setRecords(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                Alert.alert('Error', 'Failed to fetch medical records.');
            }
        };

        fetchData();
    }, []); // Empty dependency array to ensure this effect runs only once on mount

    const saveData = async () => {
        try {
            const response = await axios.post('/medical/add-diagnostic', {
                type: newRecordType,
                value: newRecordValue,
                unit: newRecordUnit,
            });

            if (response.data) {
                setRecords([...records, response.data]); // Update records with the newly saved data
                setNewRecordValue('');
                Alert.alert('Success', 'Medical record saved successfully!');
            } else {
                Alert.alert('Error', 'Failed to save medical record.');
            }
        } catch (error) {
            console.error('Error saving data:', error);
            Alert.alert('Error', 'Failed to save medical record.');
        }
    };

    const deleteRecord = async (id) => {
        try {
            const response = await axios.delete(`/medical/delete-diagnostic/${id}`);

            if (response.data.message === 'Record deleted successfully') {
                setRecords(prevRecords => prevRecords.filter(record => record._id !== id));
                Alert.alert('Success', 'Medical record deleted successfully!');
            } else {
                Alert.alert('Error', 'Failed to delete medical record.');
            }
        } catch (error) {
            console.error('Error deleting record:', error);
            Alert.alert('Error', 'Failed to delete medical record.');
        }
    };

    const handlePickerChange = (itemValue) => {
        setNewRecordType(itemValue);
        // Set the unit based on the selected record type
        setNewRecordUnit(unitMapping[itemValue]);
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <View>
                <Text>{`${item.type}: ${item.value} ${item.unit}`}</Text>
                {item.createdAt && (
                    <Text style={styles.timeText}>Added on: {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                )}
            </View>
            <TouchableOpacity onPress={() => deleteRecord(item._id)}>
                <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
        </View>
    );


    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Picker
                    selectedValue={newRecordType}
                    style={styles.picker}
                    onValueChange={handlePickerChange}
                >
                    <Picker.Item label="Blood Pressure" value="Blood Pressure" />
                    <Picker.Item label="Glucose" value="Glucose" />
                    <Picker.Item label="Cholesterol" value="Cholesterol" />
                    {/* Add more items as needed */}
                </Picker>
                <TextInput
                    style={styles.input}
                    placeholder="New Record Value"
                    value={newRecordValue}
                    onChangeText={setNewRecordValue}
                />
                <Button title="Save" onPress={saveData} />
            </View>
            <FlatList
                data={records}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={<Text>No records found</Text>}
            />
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
    picker: {
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        padding: 20,
        marginBottom: 10,
        borderRadius: 5,
    },
    deleteButton: {
        color: 'red',
    },
    timeText: {
        marginTop: 4,
        color: 'gray',
        fontSize: 12,
    },
});

export default MedicalRecordsApp;