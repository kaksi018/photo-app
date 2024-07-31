import { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Image, StyleSheet, View } from 'react-native';

const ImageListIos = ({ id }: { id: string }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    const getImageUri = async () => {
      const assetId = id;
      const asset = await MediaLibrary.getAssetInfoAsync(assetId);
      setImageUri(asset.localUri);
    };
    getImageUri();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.photo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
});

export default ImageListIos;
