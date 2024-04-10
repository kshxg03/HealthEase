import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Audio } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';

const Meditation = ({ navigation }) => {
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioName, setAudioName] = useState('');
  const [showCurrentlyPlaying, setShowCurrentlyPlaying] = useState(false);

  useEffect(() => {
    return () => {
      stopSound();
    };
  }, []);

  useEffect(() => {
    if (selectedAudio) {
      loadSound();
    } else {
      stopSound();
    }
  }, [selectedAudio]);

  useEffect(() => {
    const updatePlaybackStatus = (status) => {
      if (status.didJustFinish) {
        setShowCurrentlyPlaying(false);
      }
    };

    if (sound) {
      sound.setOnPlaybackStatusUpdate(updatePlaybackStatus);
    }

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const loadSound = async () => {
    try {
      stopSound();

      const { sound: newSound } = await Audio.Sound.createAsync(selectedAudio);
      setSound(newSound);
      await newSound.playAsync();
      setIsPlaying(true);
      setShowCurrentlyPlaying(true);
    } catch (error) {
      console.error('Error loading audio', error);
    }
  };

  const stopSound = async () => {
    try {
      if (sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
        setSelectedAudio(null);
      }
    } catch (error) {
      console.error('Error stopping audio', error);
    }
  };
  
  const handleCloseCurrentlyPlaying = () => {
    setShowCurrentlyPlaying(false);
    stopSound();
  };

  const handleAudioSelect = (audio, name) => {
    setSelectedAudio(audio);
    setAudioName(name);
  };

  const handlePlayPause = async () => {
    try {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error toggling playback', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', async (e) => {
      if (sound) {
        await stopSound();
      }
      e.preventDefault();
      navigation.dispatch(e.data.action);
    });

    return () => {
      unsubscribe();
    };
  }, [navigation, sound]);

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
      <ScrollView>
        <Text style={styles.Title1}>Guided Meditation Sessions:</Text>
        <TouchableOpacity onPress={() => handleAudioSelect(require('../assets/medi1.mp3'), 'Guided Session 1 - Singing Bowl')} style={styles.card}>
          <View style={styles.cardContent}>
            <MaterialIcons name="headset" size={24} color="black" style={styles.icon} />
            <Text style={styles.cardText}>Guided Session 1 - Singing Bowl</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAudioSelect(require('../assets/medi2.mp3'), 'Guided Session 1 - Tranquil')} style={styles.card}>
          <View style={styles.cardContent}>
            <MaterialIcons name="headset" size={24} color="black" style={styles.icon} />
            <Text style={styles.cardText}>Guided Session-2 - Tranquil</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAudioSelect(require('../assets/medi3.mp3'), 'Guided Session 1 - Serene')} style={styles.card}>
          <View style={styles.cardContent}>
            <MaterialIcons name="headset" size={24} color="black" style={styles.icon} />
            <Text style={styles.cardText}>Guided Session-3 - Serene</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.Title2}>Positive music for relaxation:</Text>
        <TouchableOpacity onPress={() => handleAudioSelect(require('../assets/medi4.mp3'), 'Soothing')} style={styles.card}>
          <View style={styles.cardContent}>
            <MaterialIcons name="headset" size={24} color="black" style={styles.icon} />
            <Text style={styles.cardText}>Soothing</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAudioSelect(require('../assets/medi5.mp3'), 'Mysterious')} style={styles.card}>
          <View style={styles.cardContent}>
            <MaterialIcons name="headset" size={24} color="black" style={styles.icon} />
            <Text style={styles.cardText}>Mysterious</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAudioSelect(require('../assets/medi6.mp3'), 'Calm')} style={styles.card}>
          <View style={styles.cardContent}>
            <MaterialIcons name="headset" size={24} color="black" style={styles.icon} />
            <Text style={styles.cardText}>Calm</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAudioSelect(require('../assets/medi7.mp3'), 'Peaceful')} style={styles.card}>
          <View style={styles.cardContent}>
            <MaterialIcons name="headset" size={24} color="black" style={styles.icon} />
            <Text style={styles.cardText}>Peaceful</Text>
          </View>
        </TouchableOpacity>
        </ScrollView>
      </View>
      {showCurrentlyPlaying && (
        <View style={styles.audioPlaying}>
          <TouchableOpacity onPress={handlePlayPause} style={styles.controlButton}>
            {isPlaying ? (
              <MaterialIcons name="pause" size={24} color="black" />
            ) : (
              <MaterialIcons name="play-arrow" size={24} color="black" />
            )}
          </TouchableOpacity>
          <Text style={styles.currentlyPlayingText}>Currently Playing: {audioName}</Text>
          <TouchableOpacity onPress={handleCloseCurrentlyPlaying} style={styles.closeButton}>
            <MaterialIcons name="close" size={24} color="red" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  cardsContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '90%',
    marginTop: 60,
  },
  card: {
    backgroundColor: '#323232',
    marginVertical: 5,
    padding: 15,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Title1: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
  },
  Title2: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
    marginTop: 60,
  },
  icon: {
    marginRight: 10,
    color: '#00f59b'
  },
  cardText: {
    fontSize: 15,
    color: 'white',
  },
  audioPlaying: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#00f59b',
    padding: 20,
    alignItems: 'center',
  },
  controlButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  currentlyPlayingText: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 16,
    color: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 0,
    padding: 4,
    marginRight: 15,
  },
});

export default Meditation;
