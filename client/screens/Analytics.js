import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import axios from "axios";
import { LineChart } from "react-native-gifted-charts";

const Analytics = () => {
  const [bloodPressureData, setBloodPressureData] = useState([]);
  const [glucoseData, setGlucoseData] = useState([]);
  const [cholesterolData, setCholesterolData] = useState([]);

  useEffect(() => {
    Alert.alert(
      "Note",
      "Your analytics are fetched from your saved biomarkings."
    );
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/medical/get-diagnostic");
      if (response.data && Array.isArray(response.data)) {
        // Filter data based on category
        const bloodPressure = response.data
          .filter((item) => item.type === "Blood Pressure")
          .map((item) => ({ value: parseInt(item.value) }));
        const glucose = response.data
          .filter((item) => item.type === "Glucose")
          .map((item) => ({ value: parseInt(item.value) }));
        const cholesterol = response.data
          .filter((item) => item.type === "Cholesterol")
          .map((item) => ({ value: parseInt(item.value) }));
        setBloodPressureData(bloodPressure);
        setGlucoseData(glucose);
        setCholesterolData(cholesterol);
      } else {
        console.error("Invalid response data:", response.data);
        Alert.alert(
          "Error",
          "Failed to fetch medical records. Invalid response data."
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "Failed to fetch medical records.");
    }
  };

  return (
    <ScrollView>
      <View>
        <Text style={styles.categoryText}>Blood Pressure</Text>
        <LineChart
          initialSpacing={20}
          data={bloodPressureData}
          spacing={50}
          hideDataPoints
          isAnimated
          lineGradient
          yAxisTextStyle={{ color: "#00f59b" }}
          onDataChangeAnimationDuration={300}
          thickness={5}
          hideRules
          yAxisColor="#00f59b"
          showVerticalLines
          verticalLinesColor="rgba(0, 245, 145,0.5)"
          xAxisColor="#00f59b"
          color="#00f59b"
          yAxisOffset={60}
        />
      </View>
      <View>
        <Text style={styles.categoryText}>Glucose</Text>
        <LineChart
          initialSpacing={20}
          data={glucoseData}
          spacing={50}
          hideDataPoints
          isAnimated
          lineGradient
          yAxisTextStyle={{ color: "#00f59b" }}
          onDataChangeAnimationDuration={300}
          thickness={5}
          hideRules
          yAxisColor="#00f59b"
          showVerticalLines
          verticalLinesColor="rgba(0, 245, 145,0.5)"
          xAxisColor="#00f59b"
          color="#00f59b"
          yAxisOffset={60}
        />
      </View>
      <View>
        <Text style={styles.categoryText}>Cholesterol</Text>
        <LineChart
          initialSpacing={20}
          data={cholesterolData}
          spacing={50}
          hideDataPoints
          isAnimated
          lineGradient
          yAxisTextStyle={{ color: "#00f59b" }}
          onDataChangeAnimationDuration={300}
          thickness={5}
          hideRules
          yAxisColor="#00f59b"
          showVerticalLines
          verticalLinesColor="rgba(0, 245, 145,0.5)"
          xAxisColor="#00f59b"
          color="#00f59b"
          yAxisOffset={60}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryText: {
    color: "#00f59b",
    fontSize: 18,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 15,
  },
});

export default Analytics;
