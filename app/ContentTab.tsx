import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ListScreen from './ListScreen';
import MapScreen from './MapScreen';
import ProfileScreen from './ProfileScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GRAY, PRIMARY } from '@/constants/Colors';
import TabBarAddButton from '@/components/TabBarAddButton';

const Tab = createBottomTabNavigator();

const getTabBarIcon = ({ focused, color, size, name }) => {
  const iconName = focused ? name : `${name}-outline`;
  return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
};

const AddButtonScreen = () => null;

const ContentTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PRIMARY.DARK,
        tabBarInactiveTintColor: GRAY.DARK,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="HOME"
        component={HomeScreen}
        options={{
          tabBarIcon: (props) => getTabBarIcon({ ...props, name: 'home' }),
        }}
      />
      <Tab.Screen
        name="LIST"
        component={ListScreen}
        options={{
          tabBarIcon: (props) => getTabBarIcon({ ...props, name: 'post' }),
        }}
      />

      <Tab.Screen
        name="AddButton"
        component={AddButtonScreen}
        options={{ tabBarButton: () => <TabBarAddButton /> }}
      />

      <Tab.Screen
        name="MAP"
        component={MapScreen}
        options={{
          tabBarIcon: (props) => getTabBarIcon({ ...props, name: 'map' }),
        }}
      />
      <Tab.Screen
        name="PROFILE"
        component={ProfileScreen}
        options={{
          tabBarIcon: (props) => getTabBarIcon({ ...props, name: 'account' }),
        }}
      />
    </Tab.Navigator>
  );
};

export default ContentTab;
