import { View, Text } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import Register from "../../screens/auth/Register";
import Login from "../../screens/auth/Login";
import { AuthContext } from "../../context/authContext";
import Diagnostics from "../../screens/Diagnostics";
import News from "../../screens/News";
import Medication from "../../screens/Medication";
import Meditation from "../../screens/Meditation";
import Profile from "../../screens/Profile";
import BMI from "../../screens/BMI";
import HealthRecords from "../../screens/HealthRecords";
import EditProfile from "../../screens/EditProfile";
import Level1 from "../../screens/game/Level1";
import Level2 from "../../screens/game/Level2";
import Level4 from "../../screens/game/Level4";
import Level3 from "../../screens/game/Level3";
import ChooseLevel from "../../screens/ChooseLevel";
import Level5 from "../../screens/game/Level5";
import Level6 from "../../screens/game/Level6";
import Level7 from "../../screens/game/Level7";
import Level8 from "../../screens/game/Level8";
import Level9 from "../../screens/game/Level9";
import Level10 from "../../screens/game/Level10";
import Feedback from "../../screens/Feedback";
import PillReminder from "../../screens/PillReminder";
import RecordDetails from "../../screens/RecordDetails";
import Analytics from "../../screens/Analytics";

const ScreenMenu = () => {
  //global state
  const [state] = useContext(AuthContext);
  //auth condition
  const authenticatedUser = state?.user && state?.token;

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitleStyle: {
          color: "#00f59b",
        },
        statusBarColor: "black",
        headerStyle: {
          backgroundColor: "black",
        },
        contentStyle: {
          backgroundColor: "black",
        },
        headerTitleAlign: "center",
        headerTintColor: "#00f59b",
      }}
    >
      {authenticatedUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="Diagnostics"
            component={Diagnostics}
            options={{
              headerBackVisible: true,
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="News"
            component={News}
            options={{
              headerBackVisible: true,
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerBackVisible: true,
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="Medication"
            component={Medication}
            options={{
              headerBackVisible: true,
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="Meditation"
            component={Meditation}
            options={{
              headerBackVisible: true,
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="HealthRecords"
            component={HealthRecords}
            options={{
              headerBackVisible: true,
              headerBackTitleVisible: false,
              headerTitle: "Add Report",
            }}
          />
          <Stack.Screen
            name="BMI"
            component={BMI}
            options={{
              headerBackVisible: true,
              headerBackTitleVisible: false,
            }}
          />

          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              headerBackVisible: true,
              headerBackTitleVisible: false,
              headerTitle: "Edit Profile",
            }}
          />

          <Stack.Screen
            name="ChooseLevel"
            component={ChooseLevel}
            options={{
              headerBackVisible: true,
              headerBackTitleVisible: false,
              headerTitle: "Game",
            }}
          />

          <Stack.Screen
            name="Level1"
            component={Level1}
            options={{
              headerBackVisible: true,
              headerBackTitleVisible: false,
              headerTitle: "Level-1",
            }}
          />

          <Stack.Screen
            name="Level2"
            component={Level2}
            options={{
              headerBackVisible: true,
              headerBackTitleVisible: false,
              headerTitle: "Level-2",
            }}
          />

          <Stack.Screen
            name="Level3"
            component={Level3}
            options={{
              headerBackVisible: true,
              headerBackTitleVisible: false,
              headerTitle: "Level-3",
            }}
          />

          <Stack.Screen
            name="Level4"
            component={Level4}
            options={{
              headerBackVisible: true,
              headerBackTitleVisible: false,
              headerTitle: "Level-4",
            }}
          />

          <Stack.Screen
            name="Level5"
            component={Level5}
            options={{
              headerBackVisible: true,
              headerBackTitleVisible: false,
              headerTitle: "Level-5",
            }}
          />

          <Stack.Screen
            name="Level6"
            component={Level6}
            options={{
              headerBackVisible: true,
              headerBackTitleVisible: false,
              headerTitle: "Level-6",
            }}
          />

          <Stack.Screen
            name="Level7"
            component={Level7}
            options={{
              headerBackVisible: true,
              headerBackTitleVisible: false,
              headerTitle: "Level-7",
            }}
          />

          <Stack.Screen
            name="Level8"
            component={Level8}
            options={{
              headerBackVisible: true,
              headerBackTitleVisible: false,
              headerTitle: "Level-8",
            }}
          />

          <Stack.Screen
            name="Level9"
            component={Level9}
            options={{
              headerBackVisible: true,
              headerBackTitleVisible: false,
              headerTitle: "Level-9",
            }}
          />

          <Stack.Screen
            name="Level10"
            component={Level10}
            options={{
              headerBackVisible: true,
              headerBackTitleVisible: false,
              headerTitle: "Level-10",
            }}
          />

          <Stack.Screen
            name="Feedback"
            component={Feedback}
            options={{
              headerBackVisible: true,
              headerBackTitleVisible: false,
              headerTitle: "Feedback",
            }}
          />

          <Stack.Screen
            name="PillReminder"
            component={PillReminder}
            options={{
              headerBackVisible: true,
              headerBackTitleVisible: false,
              headerTitle: "Pill Reminder",
            }}
          />
          <Stack.Screen
            name="RecordDetails"
            component={RecordDetails}
            options={{
              headerBackVisible: true,
              headerBackTitleVisible: false,
              headerTitle: "Health Reports",
            }}
          />
          <Stack.Screen
            name="Analytics"
            component={Analytics}
            options={{
              headerBackVisible: true,
              headerBackTitleVisible: false,
              headerTitle: "Analytics",
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;
