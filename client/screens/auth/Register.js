import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import InputBox from '../../components/Forms/InputBox';
import SubmitButton from '../../components/Forms/SubmitButton';
import axios from 'axios';

const Register = ({ navigation }) => {
    // states
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Functions
    const validateEmail = (email) => {
        const emailRegex = /\b[A-Za-z0-9._%+-]+@gmail\.com\b/;
        return emailRegex.test(email);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (!firstname || !lastname || !email || !password) {
                Alert.alert('Please fill out all the fields.');
                setLoading(false);
                return;
            }

            if (!validateEmail(email)) {
                Alert.alert('Invalid Email', 'Please enter a valid Gmail address.');
                setLoading(false);
                return;
            }

            setLoading(false);
            const { data } = await axios.post('/auth/register', { firstname, lastname, email, password });
            alert(data && data.message);
            navigation.navigate('Login');
        } catch (error) {
            alert(error.response.data.message);
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.TitleView}>
                <Text style={styles.healthText}>Health</Text>
                <Text style={styles.easeText}>Ease</Text>
            </View>
            <View>
            <View style={{ marginHorizontal: 20 }}>
                <InputBox inputTitle={'First-Name'} value={firstname} setValue={setFirstName} />
                <InputBox inputTitle={'Last-Name'} value={lastname} setValue={setLastName} />
                <InputBox
                    inputTitle={'Email'}
                    keyboardType="email-address"
                    autoComplete="email"
                    value={email}
                    setValue={setEmail}
                />
                <InputBox
                    inputTitle={'Password'}
                    secureTextEntry={true}
                    autoComplete="password"
                    value={password}
                    setValue={setPassword}
                />
                </View>
                <SubmitButton
                btnTitle={'Register'}
                loading={loading}
                handleSubmit={handleSubmit}
                />
                </View>
            

            <Text style={styles.linkText}>
                Already have an account?{' '}
                <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                    Signin
                </Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        gap: 40,
    },
    pageTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputBox: {
        height: 40,
        marginBottom: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginTop: 10,
        paddingLeft: 10,
    },
    linkText: {
        fontSize: 14,
        textAlign: 'center',
        color: 'white'
    },
    link: {
        color: "#2ec0f9",
    },
    healthText: {
        fontSize: 30,
        color: 'white'
    },
    easeText: {
        fontSize: 30,
        color: "#00f59b", 
    },
    TitleView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Register;
