import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import FooterMenu from '../components/Menus/FooterMenu'
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from react-navigation/native

const Home = () => {
    //global state
    const [state] = useContext(AuthContext)
    const navigation = useNavigation(); // Initialize navigation object using useNavigation hook

    const goToMeditationPage = () => {
        navigation.navigate('Meditation'); // Navigate to the Meditation page
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goToMeditationPage} style={styles.button}>
                <Text style={styles.buttonText}>Go to Meditation</Text>
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: "flex-end" }} >
                <FooterMenu />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16,
        justifyContent: "space-between",
        marginTop: 40,
    },
    button: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
})

export default Home
