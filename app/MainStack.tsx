import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WHITE } from '@/constants/Colors';
import ContentTab from './ContentTab';
import SelectPhotosScreen from './SelectPhotosScreen';
import UpdateProfileScreen from './updateProfileScreen';
import HeaderLeft from '@/components/HeaderLeft';
import ImagePickerScreen from './ImagePickerScreen';
import WriteTextScreen from './WriteTextScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: WHITE },
        title: '',
        headerLeft: HeaderLeft,
      }}
    >
      <Stack.Screen
        name="CONTENT_TAB"
        component={ContentTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="SELECT_PHOTOS" component={SelectPhotosScreen} />
      <Stack.Screen name="UPDATE_PROFILE" component={UpdateProfileScreen} />
      <Stack.Screen name="IMAGE_PICKER" component={ImagePickerScreen} />
      <Stack.Screen name="WRITE_TEXT" component={WriteTextScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
