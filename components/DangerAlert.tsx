import { BLACK, DANGER, WHITE } from '@/constants/Colors';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button, { ButtonTypes } from './Button';

export const AlertTypes = {
  LOGOUT: 'LOGOUT',
};

const DangerAlertProps = {
  LOGOUT: {
    iconName: 'logout-variant',
    title: '로그아웃',
    message: '정말 로그아웃 하시겠습니까?',
  },
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  alertType: string;
};

const DangerAlert = ({ visible, onClose, alertType, onConfirm }: Props) => {
  const { iconName, title, message } = DangerAlertProps[alertType];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Pressable style={styles.background} onPress={onClose} />
        <View style={styles.alert}>
          <View style={styles.imageBackground}>
            <View style={styles.image}>
              <MaterialCommunityIcons name={iconName} size={30} color={WHITE} />
            </View>
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desc}>{message}</Text>

          {/* 확인/취소버튼 */}
          <View style={styles.buttonContainer}>
            <Button
              title="취소"
              onPress={onClose}
              buttonType={ButtonTypes.CANCEL}
              styles={buttonStyles}
            />
            <Button
              title="확인"
              onPress={onConfirm}
              buttonType={ButtonTypes.DANGER}
              styles={buttonStyles}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

DangerAlert.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  alertType: PropTypes.oneOf(Object.values(AlertTypes)),
};

const buttonStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
  },
  button: {
    borderRadius: 8,
  },
});

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFill,
    backgroundColor: BLACK,
    opacity: 0.6,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alert: {
    backgroundColor: WHITE,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 20,
    width: '80%',
    borderRadius: 8,
  },
  imageBackground: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: WHITE,
    top: -40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: DANGER.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 50,
    fontSize: 20,
    fontWeight: '700',
  },
  desc: {
    marginVertical: 10,
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
  },
});

export default DangerAlert;
