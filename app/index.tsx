import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import { UserContext, UserProvider } from '@/api/UserContext';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { initFirebase } from '@/api/firebase';
import { onAuthStateChanged } from '@/api/auth';
import { Asset } from 'expo-asset';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SplashScreen } from 'expo-router';
import MainStack from './MainStack';
import AuthStack from './AuthStack';

const ImageAssets = [
  require('../assets/images/cover.png'),
  require('../assets/images/home-clock.png'),
  require('../assets/images/home-map.png'),
  require('../assets/images/icon.png'),
];

const Index = () => {
  const [user, setUser] = useState(UserContext);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();

        await Promise.all(
          ImageAssets.map((image) => Asset.fromModule(image).downloadAsync())
        );

        initFirebase();

        const unsubscribe = onAuthStateChanged((user) => {
          if (user) {
            setUser(user);
          }
          setIsReady(true);
          unsubscribe();
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        setIsReady(true);
      }
    })();
  }, [setUser]);

  const onReady = async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  };

  if (!isReady) {
    return null;
  }

  LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);

  return (
    <ActionSheetProvider>
      <UserProvider>
        <StatusBar style="dark" />
        <NavigationContainer onReady={onReady}>
          {user.uid ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
      </UserProvider>
    </ActionSheetProvider>
  );
};

export default Index;
