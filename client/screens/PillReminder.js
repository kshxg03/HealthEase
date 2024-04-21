import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import * as Notifications from 'expo-notifications';
import axios from 'axios';

const PillReminder = () => {
  const [pillName, setPillName] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    // Check notification permissions when the component mounts
    checkNotificationPermissions();
  }, []);

  const checkNotificationPermissions = async () => {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        // If permissions are not granted, request them
        requestNotificationPermissions();
      }
    } catch (error) {
      console.error('Error checking notification permissions:', error);
    }
  };

  const requestNotificationPermissions = async () => {
    try {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus === 'granted') {
        console.log('Notification permissions granted');
      } else {
        console.log('Notification permissions denied');
        // Show an alert asking the user to turn on notifications
        alert('Please enable notifications to use this feature.');
      }
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
    }
  };

  const fetchReminders = async () => {
    try {
      const response = await axios.get('reminder/get-reminder');
      const remindersData = response.data;
  
      // Schedule notifications for fetched reminders
      remindersData.forEach((reminder) => {
        scheduleNotification(reminder);
      });
  
      // Update state with reminders data including notification IDs
      setReminders(remindersData);
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  };
  
  
  const scheduleNotification = async (reminder) => {
    try {
      // Parse reminder time
      const [hours, minutes] = reminder.time.split(':');
  
      // Set trigger for daily notification at the specified time
      const trigger = {
        hour: parseInt(hours, 10),
        minute: parseInt(minutes, 10),
        repeats: true,
      };
  
      // Schedule daily notification
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Pill Reminder',
          body: `Time to take ${reminder.name}`,
        },
        trigger,
      });
  
      // Update the reminder object with the notification ID
      reminder.notificationId = notificationId;
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };
  
  

  const addReminder = async () => {
    try {
      const response = await axios.post('reminder/add-reminder', {
        name: pillName,
        time: reminderTime,
      });
      console.log('Reminder added successfully:', response.data);
      alert('Reminder added successfully!');
      // Clear the TextInput fields
      setPillName('');
      setReminderTime('');
      fetchReminders(); // Fetch and schedule notifications for all reminders including the newly added one
    } catch (error) {
      console.error('Error adding reminder:', error);
      alert('Failed to add reminder.');
    }
  };
  

  const deleteReminder = async (id) => {
    try {
      // Find the reminder to be deleted
      const reminderToDelete = reminders.find(reminder => reminder._id === id);
      if (!reminderToDelete) {
        throw new Error('Reminder not found');
      }
  
      // Cancel the scheduled notification associated with the deleted reminder
      await Notifications.cancelScheduledNotificationAsync(reminderToDelete.notificationId);
  
      // Delete the reminder from the backend
      await axios.delete(`reminder/delete-reminder/${id}`);
  
      // Fetch updated reminders after deletion
      fetchReminders();
      alert('Reminder deleted successfully!');
    } catch (error) {
      console.error('Error deleting reminder:', error);
      alert('Failed to delete reminder.');
    }
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter pill name"
        placeholderTextColor={'gray'}
        value={pillName}
        onChangeText={text => setPillName(text)}
        keyboardAppearance='dark'
      />
      <TextInput
        style={styles.input}
        placeholder="Enter reminder time (HH:MM)"
        placeholderTextColor={'gray'}
        value={reminderTime}
        onChangeText={text => setReminderTime(text)}
        keyboardAppearance='dark'
      />
      <Button title="Set Reminder" onPress={addReminder} />

      <Text style={styles.sectionTitle}>Your Reminders:</Text>
      {reminders.map((reminder) => (
        <View key={reminder._id} style={styles.card}>
          <View style={styles.reminderItem}>
            <View style={styles.textContainer}>
              <Text style={styles.name}>Name: {reminder.name}</Text>
              <Text style={styles.time}>Time: {reminder.time}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteReminder(reminder._id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },
  input: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'white'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 20,
    color: 'white'
  },
  reminderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: '90%',
  },
  card: {
    backgroundColor: '#393939',
    padding: 15,
    marginBottom: 15,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  name: {
    color: 'white',
    marginBottom: 5,
  },
  time: {
    color: 'white',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#ff595e',
},
});

export default PillReminder;
