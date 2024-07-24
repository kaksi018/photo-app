import { signOut } from '@/api/auth';
import { useUserState } from '@/api/UserContext';
import Button from '@/components/Button';
import FastImage from '@/components/FastImage';
import { GRAY, WHITE } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  /* const [user, setUser] = useUserState(); */
  const { top } = useSafeAreaInsets();
  const user = {
    email: 'me@email.com',
    password: 'a12345',
    photoURL:
      'https://firebasestorage.googleapis.com/v0/b/rn-photo-5a2df.appspot.com/o/profile.jpg?alt=media',
    displayName: 'test',
  };

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      {/* 나가기버튼 */}
      <View style={styles.settingButton}>
        <Pressable
          onPress={async () => {
            await signOut();
            /* setUser({}); */
          }}
          hitSlop={10}
        >
          <MaterialCommunityIcons
            name="logout-variant"
            size={24}
            color={GRAY.DARK}
          />
        </Pressable>
      </View>

      {/* 프로파일 */}
      <View style={styles.profile}>
        <View style={[styles.photo]}>
          <FastImage source={{ uri: user.photoURL }} style={styles.photo} />
          <Pressable style={styles.editButton}>
            <MaterialCommunityIcons name="pencil" size={20} color={WHITE} />
          </Pressable>
        </View>
        <Text style={styles.nickname}>{user.displayName || 'nickname'}</Text>
      </View>

      {/* 내가올린사진목록 */}
      <View style={styles.listContainer}></View>
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
    fontWeight: '700',
  },
  listContainer: {
    flex: 1,
  },
});
export default ProfileScreen;
