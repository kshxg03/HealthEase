import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FooterMenu from '../components/Menus/FooterMenu';

const news = require('../assets/news.jpg');
const biomarking = require('../assets/biomarking.jpg');
const medicine = require('../assets/medicines.jpg');
const meditation = require('../assets/meditation.jpg');
const HealthRecords = require('../assets/Test.jpg');
const bmi = require('../assets/bmi.jpg');


const Home = () => {
    const navigation = useNavigation();

    const goToMedicationPage = () => {
        navigation.navigate('Medication');
    };

    const goToMeditationPage = () => {
        navigation.navigate('Meditation');
    };

    const goToNewsPage = () => {
        navigation.navigate('News');
    };

    const goToDiagnosticsPage = () => {
        navigation.navigate('Diagnostics');
    };

    const goToBMIPage = () => {
        navigation.navigate('BMI');
    };

    const goToHealthRecordsPage = () => {
        navigation.navigate('HealthRecords');
    };

    const Card = ({ imageSource, buttonText, onPress }) => {
        return (
            <TouchableOpacity style={[styles.cardContainer, { marginRight: 10 }]} onPress={onPress}>
                <View style={styles.imageContainer}>
                    <Image source={imageSource} style={styles.cardImage} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.cardRow}>
                    <Card imageSource={news} buttonText="Explore Latest News" onPress={goToNewsPage} />
                    <Card imageSource={biomarking} buttonText="Your Biomarkings" onPress={goToDiagnosticsPage} />
                </View>

                <View style={styles.cardRow}>
                    <Card imageSource={medicine} buttonText="Medication Records" onPress={goToMedicationPage} />
                    <Card imageSource={meditation} buttonText="Meditation Session" onPress={goToMeditationPage} />
                </View>

                <View style={styles.cardRow}>
                    <Card imageSource={HealthRecords} buttonText="Health Records" onPress={goToHealthRecordsPage} />
                    <Card imageSource={bmi} buttonText="Calculate BMI" onPress={goToBMIPage} />
                </View>
            </ScrollView>
            <FooterMenu />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16,
        marginTop: 40,
    },
    scrollViewContent: {
        paddingBottom: 80,
    },
    cardContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 20,
    },
    imageContainer: {
        alignItems: 'center',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        overflow: 'hidden',
    },
    cardImage: {
        width: '100%',
        height: 120,
    },
    textContainer: {
        padding: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default Home;
