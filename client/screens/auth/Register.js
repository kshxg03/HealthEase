import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import InputBox from '../../components/Forms/InputBox'
import SubmitButton from '../../components/Forms/SubmitButton'
import axios from 'axios'

const Register = ({ navigation }) => {
    // states
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    //functions
    //button
    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (!name || !email || !password) {
                Alert.alert("Please fill out all the fields.");
                setLoading(false);
                return;

            }
            setLoading(false);
            const { data } = await axios.post('/auth/register', { name, email, password });
            alert(data && data.message)
            navigation.navigate('Login')
            console.log("Register data==> ", { name, email, password });
        } catch (error) {
            alert(error.response.data.message);
            setLoading(false);
            console.log(error);
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.TitleView}>
                <Text style={styles.healthText}>Health</Text>
                <Text style={styles.easeText}>Ease</Text>
            </View>
            <View>
                <View style={{ marginHorizontal: 20 }}>
                    <InputBox inputTitle={'Name'} value={name} setValue={setName} />
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
                {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
                <SubmitButton
                    btnTitle={"Register"}
                    loading={loading}
                    handleSubmit={handleSubmit}
                />
            </View>

            <Text style={styles.linkText}>
                Already have an account?{" "}
                <Text style={styles.link}
                    onPress={() => navigation.navigate('Login')}>
                    Signin
                </Text>
            </Text>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#ffffff",
        gap: 20,
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
    },
    healthText: {
        fontSize: 30,
    },
    easeText: {
        fontSize: 30,
        color: "#80ed99", // Adjust color for "Ease"
    },
    TitleView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Register