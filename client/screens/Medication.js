import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { scheduleNotificationAsync } from 'expo-notifications';

const MedicationPage = () => {
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [medicationRecords, setMedicationRecords] = useState([]);
    const [reminderTime, setReminderTime] = useState('');
    const [selectedMedicationId, setSelectedMedicationId] = useState(null);

    const addMedicationRecord = async () => {
        try {
            const response = await axios.post('medication/add-medication', {
                name,
                dosage,
                reminderTime: reminderTime ? reminderTime.toString() : null,
            });
            if (response.data) {
                Alert.alert('Success', 'Medication record added successfully!');
                getMedicationRecords();
            }
        } catch (error) {
            console.error('Error adding medication record:', error);
            Alert.alert('Error', 'Failed to add medication record.');
        }
    };


    const getMedicationRecords = async () => {
        try {
            const response = await axios.get('medication/get-medication');
            setMedicationRecords(response.data);
        } catch (error) {
            console.error('Error fetching medication records:', error);
            Alert.alert('Error', 'Failed to fetch medication records.');
        }
    };

    const deleteMedicationRecord = async (id) => {
        try {
            const response = await axios.delete(`medication/delete-medication/${id}`);
            if (response.data.message === 'Record deleted successfully') {
                Alert.alert('Success', 'Medication record deleted successfully!');
                getMedicationRecords();
            } else {
                Alert.alert('Error', 'Failed to delete medication record.');
            }
        } catch (error) {
            console.error('Error deleting medication record:', error);
            Alert.alert('Error', 'Failed to delete medication record.');
        }
    };

    const handleSetReminderTime = async (time) => {
        setReminderTime(time);
    };

    const scheduleMedicationReminder = async () => {
        if (!selectedMedicationId || !reminderTime) return;

        const medication = medicationRecords.find(record => record._id === selectedMedicationId);
        if (!medication) return;

        const trigger = new Date();
        trigger.setHours(reminderTime.getHours());
        trigger.setMinutes(reminderTime.getMinutes());

        await scheduleNotificationAsync({
            content: {
                title: 'Medication Reminder',
                body: `It's time to take your ${medication.name} medication!`,
            },
            trigger,
            repeats: true,
        });
    };

    useEffect(() => {
        getMedicationRecords();
    }, []);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Medication Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Dosage"
                value={dosage}
                onChangeText={setDosage}
            />
            <TextInput
                style={styles.input}
                placeholder="Reminder Time (HH:MM)"
                value={reminderTime}
                onChangeText={handleSetReminderTime}
            />
            <Button title="Add Medication" onPress={addMedicationRecord} />
            <Text style={styles.sectionTitle}>Medication Records:</Text>
            <ScrollView>
                {medicationRecords.map((record) => (
                    <View style={styles.card} key={record._id}>
                        <View style={styles.medicationInfo}>
                            <Text style={styles.cardText}>{`Name: ${record.name}`}</Text>
                            <Text style={styles.cardText}>{`Dosage: ${record.dosage}`}</Text>
                        </View>
                        <View style={styles.actions}>
                            <TouchableOpacity onPress={() => setSelectedMedicationId(record._id)}>
                                <Text style={styles.actionButton}>Set Reminder</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteMedicationRecord(record._id)}>
                                <Text style={[styles.actionButton, styles.deleteButton]}>Delete</Text>
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
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardText: {
        fontSize: 16,
        marginBottom: 5,
    },
    medicationInfo: {
        flex: 1,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },


    actionButton: {
        padding: 8,
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor: 'lightblue',
    },
    deleteButton: {
        backgroundColor: '#ff595e',
    },
});

export default MedicationPage;
