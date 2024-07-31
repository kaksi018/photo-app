import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Asset } from 'expo-asset';
import { initFirebase } from '@/api/firebase';
import { UserContext, useUserState } from '@/api/UserContext';
import { onAuthStateChanged } from '@/api/auth';
import TabLayout from './(tabs)/_layout';
import SignInScreen from './SignInScreen';

const ImageAssets = [
  require('../assets/images/cover.png'),
  require('../assets/images/home-clock.png'),
  require('../assets/images/home-map.png'),
  require('../assets/images/icon.png'),
];

const Navigation = () => {
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

        const unsubscribe = onAuthStateChanged((user: any) => {
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

  return (
    <NavigationContainer onReady={onReady}>
      {user !== undefined ? <TabLayout /> : <SignInScreen />}
    </NavigationContainer>
  );
};

export default Navigation;
