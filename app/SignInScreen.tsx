import { getAuthErrorMessages, signIn } from '@/api/auth';
import { UserContext } from '@/api/UserContext';
import {
  authFormReducer,
  AuthFormTypes,
  initAuthForm,
} from '@/components/AuthFormReducer';
import Button from '@/components/Button';
import HR from '@/components/Hr';
import Input, { InputTypes, ReturnKeyTypes } from '@/components/Input';
import SafeInputView from '@/components/SafeInputView';
import { WHITE } from '@/constants/Colors';
import { useFocusEffect } from '@react-navigation/native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useReducer, useRef, useState } from 'react';
import { Alert, Image, Keyboard, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  email: string;
  password: string;
  passwordConfirm?: string;
  disabled: boolean;
  isLoading: boolean;
};

const [, setUser] = useState(UserContext);

const SignInScreen = () => {
  const passwordRef = useRef();
  const { top, bottom } = useSafeAreaInsets();

  const [form, dispatch] = useReducer(authFormReducer, initAuthForm);

  useFocusEffect(
    useCallback(() => {
      console.log('focus');
      return () => dispatch({ type: AuthFormTypes.RESET });
    }, [])
  );

  const updateForm = (payload: Props) => {
    const newForm = { ...form, ...payload };
    const disabled = !newForm.email || !newForm.password;

    dispatch({
      type: AuthFormTypes.UPDATE_FORM,
      payload: { disabled, ...payload },
    });
  };

  const onSubmit = async () => {
    Keyboard.dismiss();
    if (!form.disabled && !form.isLoading) {
      dispatch({ type: AuthFormTypes.TOGGLE_LOADING });
      try {
        const user = await signIn(form);
        setUser(user);
      } catch (e) {
        const message = getAuthErrorMessages(e.code);
        Alert.alert('로그인 실패', message, [
          {
            text: '확인',
            onPress: () => dispatch({ type: AuthFormTypes.TOGGLE_LOADING }),
          },
        ]);
      }
    }
  };
  return (
    <SafeInputView>
      <StatusBar style="light" />
      <View style={[styles.container, { paddingTop: top }]}>
        {/* 배경이미지 */}
        <View style={StyleSheet.absoluteFill}>
          <Image
            source={require('../assets/images/cover.png')}
            style={{ width: '100%' }}
            resizeMode="cover"
          />
        </View>

        {/* 컨텐츠영역 */}
        <View
          style={[styles.form, { paddingBottom: bottom ? bottom + 10 : 40 }]}
        >
          <Text>Sign In</Text>
          <Input
            value={form.email}
            onChangeText={(text) => updateForm({ email: text.trim() })}
            inputType={InputTypes.EMAIL}
            returnKeyType={ReturnKeyTypes.NEXT}
            styles={inputStyles}
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <Input
            ref={passwordRef}
            value={form.password}
            onChangeText={(text) => updateForm({ password: text.trim() })}
            inputType={InputTypes.PASSWORD}
            returnKeyType={ReturnKeyTypes.DONE}
            styles={inputStyles}
            onSubmitEditing={onSubmit}
          />

          <Button
            title="Sign In"
            onPress={onSubmit}
            disabled={form.disabled}
            isLoading={form.isLoading}
            styles={{ button: { borderRadius: 8 } }}
          />

          <HR text="OR" styles={{ container: { marginTop: 30 } }} />

          <Link
            href="SignUpScreen"
            style={{ paddingHorizontal: 20, marginTop: 20 }}
          >
            회원가입
          </Link>
        </View>
      </View>
    </SafeInputView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  form: {
    alignItems: 'center',
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    paddingTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

const inputStyles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default SignInScreen;
