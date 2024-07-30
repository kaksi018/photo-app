import { initFirebase } from '@/api/firebase';
import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="SignInScreen" />
      <Stack.Screen name="SignUpScreen" />
      <Stack.Screen name="ImagePickerScreen" />
      <Stack.Screen name="../components/ImagePicker" />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="updateProfileScreen" />
    </Stack>
  );
};

export default RootLayout;
