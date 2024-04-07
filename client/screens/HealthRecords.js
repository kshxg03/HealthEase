import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { Permissions } from 'expo-permissions';

const HealthRecords = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please grant permission to access the photo library.');
      }
    })();
  }, []);

  const handleImagePicker = async () => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please grant permission to access the photo library.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setSelectedImage({ uri: result.uri });
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 20}}>
      {selectedImage && (
        <Image source={selectedImage} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Upload Test Result Photo" onPress={handleImagePicker} />
    </View>
  );
};

export default HealthRecords;
