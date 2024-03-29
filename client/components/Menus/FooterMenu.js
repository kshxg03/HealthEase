import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation, useRoute } from '@react-navigation/native'


const FooterMenu = () => {
    //hooks
    const navigation = useNavigation()
    const route = useRoute()
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} >
                <FontAwesome5 name='home' style={styles.iconStyle} color={route.name === "Home" && "green"} />
                <Text>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Diagnostics')}  >
                <FontAwesome5 name='stethoscope' style={styles.iconStyle} color={route.name === "Diagnostics" && "green"} />
                <Text>Diagnostics</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('News')}  >
                <FontAwesome5 name='newspaper' style={styles.iconStyle} color={route.name === "News" && "green"} />
                <Text>News</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}  >
                <FontAwesome5 name='user' style={styles.iconStyle} color={route.name === "Profile" && "green"} />
                <Text>Profile</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 16,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    iconStyle: {
        marginBottom: 3,
        alignSelf: "center",
        fontSize: 20,
    }
})



export default FooterMenu