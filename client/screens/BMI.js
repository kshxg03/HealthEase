import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

const BMI = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [optimalWeight, setOptimalWeight] = useState('');

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100; 
      const bmiValue = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(2));
      setBmi(bmiValue);

      let category = '';
      if (bmiValue < 18.5) category = 'Underweight';
      else if (bmiValue >= 18.5 && bmiValue <= 24.9) category = 'Normal weight';
      else if (bmiValue >= 25 && bmiValue <= 29.9) category = 'Overweight';
      else category = 'Obesity';
      setBmiCategory(category);

      const optimalWeightMin = (18.5 * heightInMeters * heightInMeters).toFixed(2);
      const optimalWeightMax = (24.9 * heightInMeters * heightInMeters).toFixed(2);
      setOptimalWeight(`${optimalWeightMin} kg - ${optimalWeightMax} kg`);
    } else {
      alert('Please enter both height and weight');
    }
  };

  // Define text color based on BMI category
  const getTextColor = (category) => {
    switch (category) {
      case 'Underweight':
        return 'red';
      case 'Normal weight':
        return 'green';
      case 'Overweight':
        return 'red';
      default:
        return 'white'; // Default color
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>BMI Calculator</Text>
        <TextInput
          style={styles.input}
          placeholder="Height in cm"
          placeholderTextColor={'gray'}
          value={height}
          keyboardType='numeric'
          keyboardAppearance='dark'
          onChangeText={setHeight}
        />
        <TextInput
          style={styles.input}
          placeholder="Weight in kg"
          placeholderTextColor={'gray'}
          keyboardType="number-pad"
          keyboardAppearance='dark'
          value={weight}
          onChangeText={setWeight}
        />
        <TouchableOpacity style={styles.button} onPress={calculateBMI}>
          <Text style={styles.buttonText}>Calculate BMI</Text>
        </TouchableOpacity>
        {bmi && (
          <>
            <Text style={[styles.result, { color: getTextColor(bmiCategory) }]}>
              Your BMI is: {bmi} ({bmiCategory})
            </Text>
            <Text style={styles.suggestion}>
              Optimal weight for your height: {optimalWeight}
            </Text>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
    color: 'white'
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    color: 'white'
  },
  button: {
    backgroundColor: '#00f59b',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    color: 'white'
  },
  suggestion: {
    marginTop: 10,
    fontSize: 16,
    color: 'white',
  },
});

export default BMI;
