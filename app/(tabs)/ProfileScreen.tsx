import { signOut } from '@/api/auth';
import DangerAlert, { AlertTypes } from '@/components/DangerAlert';
import FastImage from '@/components/FastImage';
import { GRAY, WHITE } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UserContext } from '@/api/UserContext';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState(UserContext);
  const { top } = useSafeAreaInsets();

  const [visible, setVisible] = useState(false);

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <DangerAlert
        visible={visible}
        onClose={() => setVisible(false)}
        alertType={AlertTypes.LOGOUT}
        onConfirm={async () => {
          await signOut();
          setUser({});
        }}
      />

      <View style={styles.settingButton}>
        <Pressable onPress={() => setVisible(true)} hitSlop={10}>
          <MaterialCommunityIcons
            name="logout-variant"
            size={24}
            color={GRAY.DARK}
          />
        </Pressable>
      </View>

      <View style={styles.profile}>
        <View
          style={[
            styles.photo,
            user.photoURL || { backgroundColor: GRAY.DEFAULT },
          ]}
        >
          <FastImage source={{ uri: user.photoURL }} style={styles.photo} />
          <Pressable
            style={styles.editButton}
            onPress={() => navigation.navigate('UpdateProfileScreen')}
          >
            <MaterialCommunityIcons name="pencil" size={20} color={WHITE} />
          </Pressable>
        </View>

        <Text style={styles.nickname}>{user.displayName || 'nickname'}</Text>
      </View>

      <View style={styles.listContainer}>
        <PostList isMyPost={true} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  settingButton: {
    paddingHorizontal: 20,
    alignItems: 'flex-end',
  },
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: GRAY.DEFAULT,
    paddingBottom: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GRAY.DARK,
  },
  nickname: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '500',
  },
  listContainer: {
    flex: 1,
  },
});

export default ProfileScreen;
