import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import FooterMenu from '../components/Menus/FooterMenu'
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from react-navigation/native

const medicine = require('../assets/medicines.jpg');
const meditation = require('../assets/meditation.jpg');
const news = require('../assets/news.jpg');
const biomarking = require('../assets/biomarking.jpg');

const Home = () => {
    //global state
    const [state] = useContext(AuthContext)
    const navigation = useNavigation(); // Initialize navigation object using useNavigation hook

    const goToMedicationPage = () => {
        navigation.navigate('Medication'); // Navigate to the Meditation page
    };

    const goToMeditationPage = () => {
        navigation.navigate('Meditation'); // Navigate to the Meditation page
    };

    const goToNewsPage = () => {
        navigation.navigate('News'); // Navigate to the Meditation page
    };

    const goToDiagnosticsPage = () => {
        navigation.navigate('Diagnostics'); // Navigate to the Meditation page
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <ImageBackground source={news} style={styles.imageBackground} resizeMode="cover">
                    <TouchableOpacity style={styles.button} onPress={goToNewsPage}>
                        <Text style={styles.buttonText}>Explore Latest News</Text>
                    </TouchableOpacity>
                </ImageBackground>
                <View style={styles.gap}></View>
                <ImageBackground source={biomarking} style={styles.imageBackground} resizeMode="cover">
                    <TouchableOpacity style={styles.button} onPress={goToDiagnosticsPage}>
                        <Text style={styles.buttonText}>Your biomarkings</Text>
                    </TouchableOpacity>
                </ImageBackground>
                <View style={styles.gap}></View>
                <ImageBackground source={medicine} style={styles.imageBackground} resizeMode="cover">
                    <TouchableOpacity style={styles.button} onPress={goToMedicationPage}>
                        <Text style={styles.buttonText}>Medication Records</Text>
                    </TouchableOpacity>
                </ImageBackground>
                <View style={styles.gap}></View>
                <ImageBackground source={meditation} style={styles.imageBackground} resizeMode="cover">
                    <TouchableOpacity style={styles.button} onPress={goToMeditationPage}>
                        <Text style={styles.buttonText}>Meditation Session</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </ScrollView>

            {/* FooterMenu */}
            <FooterMenu />
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: 40,
        padding: 10,
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    imageBackground: {
        height: 200, // Set a fixed height for the ImageBackground
        justifyContent: "center",
        alignItems: "center",
    },
    gap: {
        height: 20
    },
    scrollViewContent: {
        paddingBottom: 80, // Adjust this value according to the height of the FooterMenu
    }
})

export default Home
