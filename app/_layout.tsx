import { initFirebase } from '@/api/firebase';
import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignInScreen" />
      <Stack.Screen name="SignUpScreen" />
      <Stack.Screen name="ImagePickerScreen" />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="updateProfileScreen" />
      <Stack.Screen name="WriteTextScreen" />
    </Stack>
  );
};

export default RootLayout;
