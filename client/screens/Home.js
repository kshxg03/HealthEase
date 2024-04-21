import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FooterMenu from "../components/Menus/FooterMenu";
import { AuthContext } from "../context/authContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const news = require("../assets/news.jpg");
const biomarking = require("../assets/biomarking.jpg");
const medicine = require("../assets/medicines.jpg");
const meditation = require("../assets/meditation.jpg");
const HealthRecords = require("../assets/Test.jpg");
const bmi = require("../assets/bmi.jpg");

const Home = () => {
  const navigation = useNavigation();
  const [state] = useContext(AuthContext);
  const { user } = state;

  const goToMedicationPage = () => {
    navigation.navigate("Medication");
  };

  const goToMeditationPage = () => {
    navigation.navigate("Meditation");
  };

  const goToNewsPage = () => {
    navigation.navigate("News");
  };

  const goToDiagnosticsPage = () => {
    navigation.navigate("Diagnostics");
  };

  const goToBMIPage = () => {
    navigation.navigate("BMI");
  };

  const goToHealthRecordsPage = () => {
    navigation.navigate("HealthRecords");
  };

  const goToChooseLevel = () => {
    navigation.navigate("ChooseLevel");
  };

  const goToPillReminderPage = () => {
    navigation.navigate("PillReminder");
  };

  const goToRecordDetails = () => {
    navigation.navigate("RecordDetails");
  };

  const Card = ({ iconName, buttonText, onPress }) => {
    return (
      <TouchableOpacity
        style={[styles.cardContainer, { marginRight: 10 }]}
        onPress={onPress}
      >
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name={iconName} size={60} color="#00f59b" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.buttonText}>{buttonText}</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="white"
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Welcome, {user.firstname}</Text>
        <View style={styles.cardRow}>
          <Card
            iconName="newspaper"
            buttonText="Explore News"
            onPress={goToNewsPage}
          />
          <Card
            iconName="dna"
            buttonText="Your Biomarkings"
            onPress={goToDiagnosticsPage}
          />
        </View>

        <View style={styles.cardRow}>
          <Card
            iconName="pill"
            buttonText="Medication Records"
            onPress={goToMedicationPage}
          />
          <Card
            iconName="meditation"
            buttonText="Meditation Session"
            onPress={goToMeditationPage}
          />
        </View>

        <View style={styles.cardRow}>
          <Card
            iconName="hospital"
            buttonText="Add Report"
            onPress={goToHealthRecordsPage}
          />
          <Card
            iconName="file-document"
            buttonText="Health Reports"
            onPress={goToRecordDetails}
          />
        </View>

        <View style={styles.cardRow}>
        <Card
            iconName="clock"
            buttonText="Pill Reminder"
            onPress={goToPillReminderPage}
          />
          <Card
            iconName="scale-bathroom"
            buttonText="Calculate BMI"
            onPress={goToBMIPage}
          />
        </View>
        <Card
            iconName="gamepad-variant"
            buttonText="Memory Game"
            onPress={goToChooseLevel}
          />
      </ScrollView>

      <FooterMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    marginTop: 20,
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 25,
    color: "#00f59b",
  },
  cardContainer: {
    flex: 1,
    backgroundColor: "#323232",
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: "center",
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 120,
  },
  textContainer: {
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "white",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 120, 
    backgroundColor: "#323232",
  },
});

export default Home;
