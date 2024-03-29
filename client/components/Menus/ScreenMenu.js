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
import Profile from '../../screens/Profile';

const ScreenMenu = () => {
    //global state
    const [state] = useContext(AuthContext)
    //auth condition
    const authenticatedUser = state?.user && state?.token

    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator initialRouteName="Login">
            {authenticatedUser ? (
                <>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{
                            headerRight: () => <HeaderMenu />
                        }}
                    />
                    <Stack.Screen
                        name="Diagnostics"
                        component={Diagnostics}
                        options={{
                            headerBackVisible: false,
                            headerRight: () => <HeaderMenu />
                        }}
                    />
                    <Stack.Screen
                        name="News"
                        component={News}
                        options={{
                            headerBackVisible: false,
                            headerRight: () => <HeaderMenu />
                        }}
                    />
                    <Stack.Screen
                        name="Profile"
                        component={Profile}
                        options={{
                            headerBackVisible: false,
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