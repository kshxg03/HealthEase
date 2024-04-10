import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, Dimensions } from 'react-native';

const BreathingExercise = () => {
  const [breathingState, setBreathingState] = useState('inhale');
  const [lineWidth] = useState(new Animated.Value(0));
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const duration = getStateDuration(breathingState) * 1000;
    startLineAnimation(screenWidth, duration); // Start line animation when breathing state changes

    const timer = setTimeout(() => {
      if (breathingState === 'inhale') {
        setBreathingState('hold');
      } else if (breathingState === 'hold') {
        setBreathingState('exhale');
      } else {
        setBreathingState('inhale');
      }
    }, duration);

    return () => clearTimeout(timer); // Clear timeout on component unmount
  }, [breathingState]);

  // Function to start line animation
  const startLineAnimation = (width, duration) => {
    lineWidth.setValue(0); // Reset animation value
    Animated.timing(lineWidth, {
      toValue: 1,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  // Function to calculate duration for each state
  const getStateDuration = (state) => {
    switch (state) {
      case 'inhale':
        return 4;
      case 'hold':
        return 7;
      case 'exhale':
        return 8;
      default:
        return 0;
    }
  };

  // Interpolate animated value to get width
  const interpolateWidth = lineWidth.interpolate({
    inputRange: [0, 1],
    outputRange: [0, screenWidth], // Adjust range as needed
  });

  return (
    <View style={styles.container}>
      <View style={styles.lineContainer}>
        <Animated.View style={[styles.line, { width: interpolateWidth }]} />
      </View>
      <Text style={styles.instructions}>Follow the instructions below:</Text>
      <TouchableOpacity onPress={() => {}} style={styles.breathButton}>
        <Text style={styles.buttonText}>
          {breathingState === 'inhale' ? 'Inhale' : breathingState === 'hold' ? 'Hold' : 'Exhale'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.breathingText}>
        {breathingState === 'inhale' ? 'Breathe in deeply through your nose for 4 seconds.' :
          breathingState === 'hold' ? 'Hold your breath for 7 seconds.' :
          'Exhale slowly through your mouth for 8 seconds.'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineContainer: {
    width: '80%', // Span entire width of the screen
    height: 4, // Adjust height as needed
    backgroundColor: 'lightgray',
  },
  line: {
    height: '80%', // Span entire height of the container
    backgroundColor: 'black',
  },
  instructions: {
    fontSize: 18,
    marginBottom: 20,
  },
  breathButton: {
    backgroundColor: '#1dd3b0',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  breathingText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default BreathingExercise;
