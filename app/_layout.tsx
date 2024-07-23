import { initFirebase } from '@/api/firebase';
import { UserProvider, useUserState } from '@/api/UserContext';
import { Stack } from 'expo-router';

const RootLayout = () => {
  const [user] = useUserState();
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {user.uid ? (
          <Stack.Screen name="(tabs)" />
        ) : (
          <Stack.Screen name="index" />
        )}
        <Stack.Screen name="SignUpScreen" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </UserProvider>
  );
};

export default RootLayout;
