import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../screens/Home';
import Register from '../../screens/auth/Register';
import Login from '../../screens/auth/Login';
import { AuthContext } from '../../context/authContext';
import HeaderMenu from './HeaderMenu';
import Diagnostics from '../../screens/Diagnostics';
import News from '../../screens/News';
import Medication from '../../screens/Medication'
import Meditation from '../../screens/Meditation'
import Profile from '../../screens/Profile';
import BMI from '../../screens/BMI';
import HealthRecords from '../../screens/HealthRecords';

const ScreenMenu = () => {
    //global state
    const [state] = useContext(AuthContext)
    //auth condition
    const authenticatedUser = state?.user && state?.token

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{
            headerTitleStyle: {
                color: '#80ed99',
            },
            animationTypeForReplace: 'pop'
        }}>
            {authenticatedUser ? (
                <>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{
                            headerBackVisible: false,
                            headerRight: () => <HeaderMenu />
                        }}
                    />
                    <Stack.Screen
                        name="Diagnostics"
                        component={Diagnostics}
                        options={{
                            headerBackVisible: true,
                            headerBackTitleVisible: false,
                            headerRight: () => <HeaderMenu />
                        }}
                    />
                    <Stack.Screen
                        name="News"
                        component={News}
                        options={{
                            headerBackVisible: true,
                            headerBackTitleVisible: false,
                            headerRight: () => <HeaderMenu />
                        }}
                    />
                    <Stack.Screen
                        name="Profile"
                        component={Profile}
                        options={{
                            headerBackVisible: true,
                            headerBackTitleVisible: false,
                            headerRight: () => <HeaderMenu />
                        }}
                    />
                    <Stack.Screen
                        name="Medication"
                        component={Medication}
                        options={{
                            headerBackVisible: true,
                            headerBackTitleVisible: false,
                            headerRight: () => <HeaderMenu />
                        }}
                    />
                    <Stack.Screen
                        name="Meditation"
                        component={Meditation}
                        options={{
                            headerBackVisible: true,
                            headerBackTitleVisible: false,
                            headerRight: () => <HeaderMenu />
                        }}
                    />
                    <Stack.Screen
                        name="HealthRecords"
                        component={HealthRecords}
                        options={{
                            headerBackVisible: true,
                            headerBackTitleVisible: false,
                            headerRight: () => <HeaderMenu />
                        }}
                    />
                    <Stack.Screen
                        name="BMI"
                        component={BMI}
                        options={{
                            headerBackVisible: true,
                            headerBackTitleVisible: false,
                            headerRight: () => <HeaderMenu />
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
    )
}

export default ScreenMenu