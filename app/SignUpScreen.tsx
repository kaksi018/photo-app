import { Link } from 'expo-router';
import { Text, View } from 'react-native';

const SignUpScreen = () => {
  return (
    <View>
      <Text>회원가입화면</Text>
      <Link href="/">로그인화면</Link>
    </View>
  );
};

export default SignUpScreen;
