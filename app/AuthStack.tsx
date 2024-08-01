import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WHITE } from '@/constants/Colors';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: WHITE },
        headerShown: false,
      }}
    >
      <Stack.Screen name="SIGN_IN" component={SignInScreen} />
      <Stack.Screen name="SIGN_UP" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
