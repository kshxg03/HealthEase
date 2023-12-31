import { View, Text, Image, Button, StatusBar, StyleSheet, SafeAreaView } from "react-native";
const logoImg = require("./assets/HealthEase.png"); 

export default function App() {
  return(
    <SafeAreaView style={styles.SafeContainer}>
      <View style={styles.container}>
        <StatusBar barStyle={"dark-content"}/>
        <View style={styles.ImageStyle}>
          <Image source={logoImg} style={styles.ImageStyle}/>
        </View>
        <Button title="Get Started" onPress={() => console.log("button is pressed")} color={"green"}/>  
      </View>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  SafeContainer: {
    flex: 1
  },

  container: {
    flex: 1, 
    justifyContent: "space-evenly",
    alignItems: "center",
    
    backgroundColor: "white", 
  },

  ImageStyle: {
    width: 300, 
    height: 300,
  }
})