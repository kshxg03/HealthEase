import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { AuthContext } from '../context/authContext';
import FooterMenu from '../components/Menus/FooterMenu';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const avatar = require('../assets/Avatar.jpg');

const EditProfile = () => {
   // Global state
   const [state, setState] = useContext(AuthContext);
   const { user, token } = state;

   // Local state
   const [firstname, setFirstName] = useState(user?.firstname);
   const [lastname, setLastName] = useState(user?.lastname);
   const [password, setPassword] = useState(''); // Initialize the password state
   const [email] = useState(user?.email);
   const [loading, setLoading] = useState(false);

   const handleUpdate = async () => {

    // Check if any required field is empty
    if (!password.trim()) {
        alert('Please enter your old password or a new one.');
        return;
      }

    if (firstname === user.firstname && lastname === user.lastname && password === user.password) {
        alert("No new changes to update.");
        return;
    }

    try {
        setLoading(true);
        const { data } = await axios.put('/auth/update-user', {
            firstname,
            lastname,
            password,
            email
        });
        setLoading(false);
        let updatedUser = data.updatedUser;
        setState({ ...state, user: updatedUser });
        alert(data.message);
        handleLogout();
    } catch (error) {
        alert(error.response.data.message);
        setLoading(false);
        console.log(error);
    }
};

//logout
const handleLogout = async () => {
    setState({ token: '', user: null })
    await AsyncStorage.removeItem('@auth')
}


   return (
       <View style={styles.container}>
           <ScrollView>
               <Text style={styles.note}>Note: You can only change your name and password!</Text>
               <View style={styles.avatarContainer}>
                   <Image
                       source={avatar}
                       style={styles.avatar}
                   />
               </View>
               <View style={styles.inputContainer}>
                   <Text style={styles.inputLabel}>First-Name</Text>
                   <TextInput
                       style={styles.input}
                       value={firstname}
                       onChangeText={(text) => setFirstName(text)}
                   />
               </View>
               <View style={styles.inputContainer}>
               <Text style={styles.inputLabel}>Last-Name</Text>
                   <TextInput
                       style={styles.input}
                       value={lastname}
                       onChangeText={(text) => setLastName(text)}
                   />
               </View>
               <View style={styles.inputContainer}>
                   <Text style={styles.inputLabel}>Email</Text>
                   <Text style={styles.labeltext}>{email}</Text>
               </View>
               <View style={styles.inputContainer}>
                   <Text style={styles.inputLabel}>Password</Text>
                   <TextInput
                       style={styles.input}
                       placeholder="Old or new password"
                       placeholderTextColor="gray"
                       onChangeText={(text) => setPassword(text)}
                       secureTextEntry={true}
                       
                   />
               </View>
               <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
                   <Text style={styles.updateBtnText}>{loading ? "Please wait" : "Update Profile"}</Text>
               </TouchableOpacity>
           </ScrollView>
       </View>
   );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    note: {
        marginTop: 20,
        marginBottom: 30,
        color: 'red',
        textAlign: 'center',
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        height: 150,
        width: 150,
        borderRadius: 75,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    inputLabel: {
        width: 90,
        color: 'white',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        flex: 1,
        height: 40,
        backgroundColor: 'black',
        paddingLeft: 10,
        color: 'white'
    },
    updateBtn: {
        backgroundColor: '#00f59b',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    logoutBtn: {
        backgroundColor: '#ff595e',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    labeltext: {
        color: 'white'
    }
});


export default EditProfile;
