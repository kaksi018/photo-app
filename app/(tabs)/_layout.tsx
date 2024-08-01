import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={32}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ListScreen"
        options={{
          title: 'List',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="SelectPhotosScreen"
        options={{
          title: 'Add',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'add' : 'add-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="MapScreen"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
