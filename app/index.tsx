import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const Index = () => {
  return (
    <View style={styles.container}>
      <Text>로그인화면</Text>
      <Link href="SignUpScreen">회원가입</Link>
      <Link href="(tabs)">탭화면</Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Index;
