import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const SubmitButton = ({ handleSubmit, btnTitle, loading }) => {
    return (
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.btnText}>{loading ? "Please wait..." : btnTitle}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    submitBtn: {
        backgroundColor: "green",
        height: 50,
        marginHorizontal: 20,
        borderRadius: 10,
        justifyContent: "center",
        marginBottom: 20,
        marginTop: 10,
    },
    btnText: {
        color: "#ffffff",
        textAlign: "center",
        fontSize: 16,
    }
})

export default SubmitButton