import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HeaderMenu = () => {
    const [state, setState] = useContext(AuthContext)
}

const styles = StyleSheet.create({
    iconStyle: {
        marginBottom: 3,
        alignSelf: "center",
        fontSize: 20,
    }
})

export default HeaderMenu