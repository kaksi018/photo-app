import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import { UserProvider } from '@/api/UserContext';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import Navigation from './Navigation';

const Index = () => {
  LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);

  return (
    <ActionSheetProvider>
      <UserProvider>
        <StatusBar style="dark" />
        <Navigation />
      </UserProvider>
    </ActionSheetProvider>
  );
};

export default Index;
