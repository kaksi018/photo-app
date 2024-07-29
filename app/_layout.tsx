import { initFirebase } from '@/api/firebase';
import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="updateProfileScreen" />
    </Stack>
  );
};

export default RootLayout;
