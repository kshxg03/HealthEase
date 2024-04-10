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
        backgroundColor: "#00f59b",
        height: 40,
        marginHorizontal: 20,
        justifyContent: "center",
        marginBottom: 20,
        marginTop: 10,
    },
    btnText: {
        textAlign: "center",
    }
})

export default SubmitButton