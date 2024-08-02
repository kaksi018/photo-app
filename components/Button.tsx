import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { WHITE, GRAY, PRIMARY, DANGER } from '@/constants/Colors';

export const ButtonTypes = {
  PRIMARY: 'PRIMARY',
  DANGER: 'DANGER',
  CANCEL: 'CANCEL',
};

const ButtonTypeColors = {
  PRIMARY: {
    DEFAULT: PRIMARY.DEFAULT,
    LIGHT: PRIMARY.LIGHT,
    DARK: PRIMARY.DARK,
  },
  DANGER: {
    DEFAULT: DANGER.DEFAULT,
    LIGHT: DANGER.LIGHT,
    DARK: DANGER.DARK,
  },
  CANCEL: { DEFAULT: GRAY.DEFAULT, LIGHT: GRAY.LIGHT, DARK: GRAY.DARK },
};

type Props = {
  styles?: { title: object; container: object; button: object };
  title: string;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  buttonType?: string;
};

const Button = ({
  styles,
  title,
  onPress,
  disabled,
  isLoading,
  buttonType,
}: Props) => {
  return (
    <View style={[defaultStyles.container, styles?.container]}>
      <Pressable
        onPress={() => onPress()}
        disabled={disabled || isLoading}
        style={({ pressed }) => [
          defaultStyles.button,
          {
            backgroundColor: (() => {
              switch (true) {
                case disabled || isLoading:
                  return DANGER.LIGHT;
                case pressed:
                  return DANGER.DARK;
                default:
                  return DANGER.DEFAULT;
              }
            })(),
          },
          styles?.button,
        ]}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={GRAY.DARK} />
        ) : (
          <Text style={[defaultStyles.title, styles?.title]}>{title}</Text>
        )}
      </Pressable>
    </View>
  );
};

Button.propTypes = {
  styles: PropTypes.object,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  buttonType: PropTypes.oneOf(Object.values(ButtonTypes)),
};

const defaultStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  button: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
  },
});

export default Button;
