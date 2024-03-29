import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { AuthContext } from '../context/authContext';
import FooterMenu from '../components/Menus/FooterMenu';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const avatar = require('../assets/Avatar.jpg');

const Profile = () => {
    // Global state
    const [state, setState] = useContext(AuthContext);
    const { user, token } = state;

    // Local state
    const [name, setName] = useState(user?.name);
    const [password, setPassword] = useState(user?.password);
    const [email] = useState(user?.email);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        try {
            setLoading(true);
            const { data } = await axios.put('/auth/update-user', {
                name,
                password,
                email
            });
            setLoading(false);
            let updatedUser = data.updatedUser;
            setState({ ...state, user: updatedUser });
            alert(data.message);
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
        alert('logout successfull')
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
                    <Text style={styles.inputLabel}>Name</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <Text style={styles.inputLabel}>{email}</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
                    <Text style={styles.updateBtnText}>{loading ? "Please wait" : "Update Profile"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    <Text style={styles.logoutBtnText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
            <FooterMenu />
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
        width: 80,
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: 'green',
        flex: 1,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#f4f4f4',
        paddingLeft: 10,
    },
    updateBtn: {
        backgroundColor: 'green',
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    updateBtnText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    logoutBtn: {
        backgroundColor: 'red',
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutBtnText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Profile;
