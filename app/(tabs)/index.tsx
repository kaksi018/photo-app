import { Image, Text, View } from 'react-native';

const HomeScreen = () => {
  return (
    <View>
      <Text>홈화면</Text>
      <Image
        source={require('../../assets/images/react-logo.png')}
        style={{ width: 200, height: 200 }}
      />
      <Image
        source={{
          uri: 'https://cdn.pixabay.com/photo/2017/08/01/11/38/sea-2564601_640.jpg',
        }}
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
};

export default HomeScreen;
