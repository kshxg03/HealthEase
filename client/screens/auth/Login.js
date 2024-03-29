import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import InputBox from '../../components/Forms/InputBox'
import SubmitButton from '../../components/Forms/SubmitButton'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import Home from '../Home'

const Login = ({ navigation }) => {
    //global state
    const [state, setState] = useContext(AuthContext)


    // states
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    //functions
    //button
    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (!email || !password) {
                Alert.alert("Please fill out all the fields.");
                setLoading(false);
                return;
            }
            setLoading(false);
            const { data } = await axios.post('/auth/login', { email, password });
            setState(data)
            await AsyncStorage.setItem('@auth', JSON.stringify(data));
            alert(data && data.message)
            navigation.navigate('Home')
            console.log("Login data==> ", { email, password });
        } catch (error) {
            alert(error.response.data.message);
            setLoading(false);
            console.log(error);
        }
        //localstorage temp function
        const getLocalStorageData = async () => {
            let data = await AsyncStorage.getItem('@auth');
            console.log("Local Storage data ==> ", data);
        };
        getLocalStorageData();
    };
    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Login</Text>
            <View style={{ marginHorizontal: 20 }}>
                <InputBox inputTitle={'Email'}
                    keyboardType="email-address"
                    autoComplete="email"
                    value={email}
                    setValue={setEmail}
                />
                <InputBox inputTitle={'Password'}
                    secureTextEntry={true}
                    autoComplete="password"
                    value={password}
                    setValue={setPassword}
                />
            </View>
            {/* <Text>{JSON.stringify({email, password }, null, 4)}</Text> */}
            <SubmitButton
                btnTitle={"Login"}
                loading={loading}
                handleSubmit={handleSubmit}
            />
            <Text style={styles.linkText}>
                Dont have an account?{" "}
                <Text style={styles.link}
                    onPress={() => navigation.navigate('Register')}>
                    Signup
                </Text>{" "}
            </Text>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#ffffff"
    },
    pageTitle: {
        fontSize: 30,
        // fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    inputBox: {
        height: 40,
        marginBottom: 20,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        marginTop: 10,
        paddingLeft: 10,
    },
    linkText: {
        fontSize: 14,
        textAlign: "center",
    },
    link: {
        color: "blue",
    }
})

export default Login