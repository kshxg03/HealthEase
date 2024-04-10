import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import MaterialIcons
import { useNavigation, useRoute } from "@react-navigation/native";

const FooterMenu = () => {
  //hooks
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <MaterialCommunityIcons
          name="home"
          style={[
            styles.iconStyle,
            { color: route.name === "Home" ? "#80ed99" : "white" },
          ]}
        />
        <Text
          style={[
            styles.barText,
            { color: route.name === "Home" ? "#80ed99" : "white" },
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Diagnostics")}>
        <MaterialCommunityIcons
          name="dna" // Using "dna" icon for Diagnostics
          style={[
            styles.iconStyle,
            { color: route.name === "Diagnostics" ? "#80ed99" : "white" },
          ]}
        />
        <Text
          style={[
            styles.barText,
            { color: route.name === "Diagnostics" ? "#80ed99" : "white" },
          ]}
        >
          Diagnostics
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("News")}>
        <MaterialCommunityIcons
          name="newspaper"
          style={[
            styles.iconStyle,
            { color: route.name === "News" ? "#80ed99" : "white" },
          ]}
        />
        <Text
          style={[
            styles.barText,
            { color: route.name === "News" ? "#80ed99" : "white" },
          ]}
        >
          News
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <MaterialCommunityIcons
          name="account-circle"
          style={[
            styles.iconStyle,
            { color: route.name === "Profile" ? "#80ed99" : "white" },
          ]}
        />
        <Text
          style={[
            styles.barText,
            { color: route.name === "Profile" ? "#80ed99" : "white" },
          ]}
        >
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconStyle: {
    marginBottom: 3,
    alignSelf: "center",
    fontSize: 24, // Adjust size if needed
  },
  barText: {
    color: "white",
  },
});

export default FooterMenu;
