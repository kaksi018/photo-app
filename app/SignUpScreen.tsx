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
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useReducer, useRef } from 'react';
import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SignUpScreen = () => {
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { top, bottom } = useSafeAreaInsets();

  const [form, dispatch] = useReducer(authFormReducer, initAuthForm);

  type Props = {
    email: string;
    password: string;
    passwordConfirm?: string;
    disabled: boolean;
    isLoading: boolean;
  };
  const updateForm = (payload: Props) => {
    const newForm = { ...form, ...payload };
    const disabled =
      !newForm.email ||
      !newForm.password ||
      newForm.password !== newForm.passwordConfirm;

    dispatch({
      type: AuthFormTypes.UPDATE_FORM,
      payload: { disabled, ...payload },
    });
  };

  const onSubmit = () => {
    Keyboard.dismiss();
    if (!form.disabled && !form.isLoading) {
      dispatch({ type: AuthFormTypes.TOGGLE_LOADING });
      console.log(form.email, form.password);
      dispatch({ type: AuthFormTypes.TOGGLE_LOADING });
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
        <ScrollView
          style={[styles.form, { paddingBottom: bottom ? bottom + 10 : 40 }]}
          contentContainerStyle={{ alignItems: 'center' }}
          keyboardShouldPersistTaps="always"
        >
          <Text>Sign Up</Text>
          <Input
            value={form.email}
            onChangeText={(text) => updateForm({ email: text.trim() })}
            inputType={InputTypes.EMAIL}
            returnKeyType={ReturnKeyTypes.NEXT}
            styles={{ container: { marginBottom: 20 } }}
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <Input
            ref={passwordRef}
            value={form.password}
            onChangeText={(text) => updateForm({ password: text.trim() })}
            inputType={InputTypes.PASSWORD}
            returnKeyType={ReturnKeyTypes.NEXT}
            styles={{ container: { marginBottom: 20 } }}
            onSubmitEditing={() => passwordConfirmRef.current.focus()}
          />
          <Input
            ref={passwordConfirmRef}
            value={form.passwordConfirm}
            onChangeText={(text) =>
              updateForm({ passwordConfirm: text.trim() })
            }
            inputType={InputTypes.PASSWORD}
            returnKeyType={ReturnKeyTypes.DONE}
            styles={{ container: { marginBottom: 20 } }}
            onSubmitEditing={onSubmit}
          />

          <Button
            title="회원가입"
            onPress={onSubmit}
            disabled={form.disabled}
            isLoading={form.isLoading}
            styles={{ container: { marginTop: 20 } }}
          />

          <HR text="OR" styles={{ container: { marginTop: 30 } }} />

          <Link href="/" style={{ paddingHorizontal: 20, marginTop: 20 }}>
            로그인
          </Link>
        </ScrollView>
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
    flexGrow: 0,
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    paddingTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
export default SignUpScreen;
