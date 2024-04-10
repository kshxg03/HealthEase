import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ChooseLevel = () => {
  const navigation = useNavigation();

  const goToGameLevel1 = () => {
    navigation.navigate('Level1');
  };

  const goToGameLevel2 = () => {
    navigation.navigate('Level2');
  };

  const goToGameLevel3 = () => {
    navigation.navigate('Level3');
  };

  const goToGameLevel4 = () => {
    navigation.navigate('Level4');
  };

  const goToGameLevel5 = () => {
    navigation.navigate('Level5');
  };

  const goToGameLevel6 = () => {
    navigation.navigate('Level6');
  };

  const goToGameLevel7 = () => {
    navigation.navigate('Level7');
  };

  const goToGameLevel8 = () => {
    navigation.navigate('Level8');
  };

  const goToGameLevel9 = () => {
    navigation.navigate('Level9');
  };

  const goToGameLevel10 = () => {
    navigation.navigate('Level10');
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Fruits Quest</Text>
      <Text style={styles.info1}>Rule: Match all the fruits pairs.</Text>
      <Text style={styles.info2}>Gradually increase level to train your brain.</Text>
      <View style={styles.levelsContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={goToGameLevel1} style={styles.levelButton}>
            <Text style={styles.ButtonText}>01</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToGameLevel2} style={styles.levelButton}>
            <Text style={styles.ButtonText}>02</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={goToGameLevel3} style={styles.levelButton}>
            <Text style={styles.ButtonText}>03</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToGameLevel4} style={styles.levelButton}>
            <Text style={styles.ButtonText}>04</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={goToGameLevel5} style={styles.levelButton}>
            <Text style={styles.ButtonText}>05</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToGameLevel6} style={styles.levelButton}>
            <Text style={styles.ButtonText}>06</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={goToGameLevel7} style={styles.levelButton}>
            <Text style={styles.ButtonText}>07</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToGameLevel8} style={styles.levelButton}>
            <Text style={styles.ButtonText}>08</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={goToGameLevel9} style={styles.levelButton}>
            <Text style={styles.ButtonText}>09</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToGameLevel10} style={styles.levelButton}>
            <Text style={styles.ButtonText}>10</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    marginTop: 20,
    color: 'orange'
  },
  description: {
    fontSize: 16,
    marginBottom: 30,
    marginHorizontal: 40,
  },
  info1: {
    fontSize: 15,
    marginBottom: 20,
    marginHorizontal: 40,
    fontWeight: '500',
    color: 'red'
  },
  info2: {
    fontSize: 15,
    marginBottom: 20,
    marginHorizontal: 40,
    fontWeight: '500',
    color: 'white'
  },
  levelsContainer: {
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10
  },
  levelButton: {
    backgroundColor: '#00f59b',
    padding: 40,
    width: '40%', 
    alignItems: 'center'
  },
  ButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default ChooseLevel;
