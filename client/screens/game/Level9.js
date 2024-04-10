import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Level9 = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const symbols = ['🍎', '🍌', '🍉', '🍇', '🍓', '🍒', '🍑', '🥭', '🍍', '🥥'];
    const allCards = symbols.concat(symbols);
    setMatchedCards([]);
    setSelectedCards([]);
    setGameOver(false);
    setCards(shuffleArray(allCards)); // Shuffle cards on initial render
  }, []);

  useEffect(() => {
    const shuffleInterval = setInterval(() => {
      // Shuffle cards every 20 seconds and reset matched cards
      setCards((prevCards) => {
        setMatchedCards([]);
        return shuffleArray([...prevCards]);
      });
    }, 15000);
    return () => clearInterval(shuffleInterval);
  }, []);

  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  const handleCardPress = (index) => {
    if (selectedCards.length < 2 && !selectedCards.includes(index) && !matchedCards.includes(index)) {
      setSelectedCards([...selectedCards, index]);
    }
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [card1, card2] = selectedCards;
      if (cards[card1] === cards[card2]) {
        setMatchedCards([...matchedCards, card1, card2]);
        setSelectedCards([]);
      } else {
        setTimeout(() => setSelectedCards([]), 200);
      }
    }

    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameOver(true);
      Alert.alert(
        'Congratulations!',
        'You have completed Level-9',
        [
          { text: 'OK', onPress: () => navigation.navigate('ChooseLevel') }
        ]
      );
    }
  }, [selectedCards, matchedCards, cards]);

  const renderGameBoard = () => {
    return cards.map((symbol, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.card, 
          {
            backgroundColor: selectedCards.includes(index) || matchedCards.includes(index) ? '#fff' : '#fff'
          }
        ]}
        onPress={() => handleCardPress(index)}
        disabled={matchedCards.includes(index) || gameOver}
      >
        <Text style={styles.symbol}>{selectedCards.includes(index) || matchedCards.includes(index) ? symbol : ''}</Text>
      </TouchableOpacity>
    ));
  };


  return (
    <View style={styles.container}>
      <Text style={styles.Title1}>Match 10 pairs of fruits to complete.</Text>
      <Text style={styles.Title2}>Difficulty: Very Hard</Text>
      <Text style={styles.Title3}>Note: Every 15 seconds the fruits get reshuffled and all the matches gets reset.</Text>
      <View style={styles.gameBoard}>
        {renderGameBoard()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    
  },
  Title1: {
    color: 'white',
    marginTop: 40,
    fontSize: 16,
  },
  Title2: {
    color: '#ff7b00',
    marginTop: 20,
    fontSize: 16,
  },
  Title3: {
    color: 'red',
    marginTop: 20,
    marginBottom: 50,
    fontSize: 16,
    marginHorizontal: 60,
    fontSize: 14,
  },
  gameBoard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20
  },
  card: {
    width: 80,
    height: 80,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbol: {
    fontSize: 24,
  },
  congrats: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white'
  },
  newGameButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Level9;
