import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AuthContext } from "../context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Profile = ({ navigation }) => {
  // Global state
  const [state, setState] = useContext(AuthContext);
  const { user, token } = state;

  // Local state
  const [firstname] = useState(user?.firstname);
  const [lastname] = useState(user?.lastname);
  const [email] = useState(user?.email);

  const goToFeedbackPage = () => {
    navigation.navigate("Feedback");
  };

  // Logout
  const handleLogout = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
    alert("Logout successful");
  };

  // Card component to display user details
  const UserDetailCard = ({ label, value }) => (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.avatarContainer}>
          <Image source={require('../assets/Avatar6.png')} style={styles.avatar} />
        </View>
        <UserDetailCard label="First Name" value={firstname} />
        <UserDetailCard label="Last Name" value={lastname} />
        <UserDetailCard label="Email" value={email} />
        <TouchableOpacity
          style={styles.updateBtn}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.updateBtnText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.updateBtn} onPress={goToFeedbackPage}>
          <Text style={styles.updateBtnText}>Give Feeback/ Report Issues</Text>
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
  avatarContainer: {
    alignItems: "center",
    marginBottom: 50,
    marginTop: 50,
  },
  avatar: {
    height: 140,
    width: 140,
    borderRadius: 75,
  },
  card: {
    backgroundColor: "#323232",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  cardLabel: {
    fontWeight: "600",
    marginBottom: 5,
    color: "white",
  },
  cardValue: {
    color: "white",
  },
  updateBtn: {
    backgroundColor: "#00f59b",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logoutBtn: {
    backgroundColor: "#ff595e",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Profile;
