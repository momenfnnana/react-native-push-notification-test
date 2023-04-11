import React, {FC, useState, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {
  Image,
  ImageBackground,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {
  AppStackParamList,
  AppStackScreenProps,
  LoginNavigationProp,
} from '@navigators';
import {
  AutoImage,
  Button,
  Card,
  Screen,
  Text,
  TextField,
  Toggle,
  AuthScreen,
  Loader,
} from '@components';
import {colors, spacing} from '@theme';
import Logo from '../../assets/images/logo.png';
import UndrawLogin from '../../assets/images/undraw_login.png';
import AuthBackground from '../../assets/images/authBackground.png';
import {useNavigation} from '@react-navigation/native';
import {useStores} from '@models';
import {CaptainImage} from '@assets';
import {useMutation} from 'react-query';
import {login, LoginBody} from '@services';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useAccessToken} from '@hooks';
import {setAxiosAccessToken} from '@utils';
// import messaging from "@react-native-firebase/messaging"
import {translate} from '@i18n';

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Login: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Login" component={LoginScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore

export const LoginScreen: FC<StackScreenProps<AppStackScreenProps, 'Login'>> =
  observer(function LoginScreen() {
    const [isRemmber, setRemmber] = useState<boolean>(false);
    const {reload} = useAccessToken();
    const {height} = useWindowDimensions();
    // Pull in navigation via hook
    const {navigate} = useNavigation<LoginNavigationProp>();
    // Pull in one of our MST stores
    const {
      authenticationStore: {setAccessToken},
    } = useStores();
    const {mutate, isLoading} = useMutation(login, {
      onSuccess(data) {
        if (data.data.accessToken) {
          setAxiosAccessToken(data.data.accessToken);
          setAccessToken(data.data.accessToken);
          reload(data.data.accessToken);
        }
      },
    });
    const initialValues: LoginBody = {
      Username: 'salam-cs@hotmail.com',
      Password: 'Salam@123',
      RememberMe: false,
      NotificationToken: '',
    };

    const validationSchema = Yup.object().shape({
      Username: Yup.string().required(translate('validation.required')),
      Password: Yup.string().required(translate('validation.required')),
      RememberMe: Yup.boolean().required(translate('validation.required')),
    });

    const onSubmitHandler = (values: LoginBody) => {
      mutate({
        Username: values.Username,
        Password: values.Password,
        RememberMe: values.RememberMe,
        NotificationToken: values.NotificationToken,
      });
    };
    const {
      values,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue,
      errors,
    } = useFormik<LoginBody>({
      initialValues,
      onSubmit: onSubmitHandler,
      validationSchema,
    });

    // useEffect(() => {
    //   messaging()
    //     .getToken()
    //     .then((token) => {
    //       setFieldValue("NotificationToken", token)
    //     })
    // }, [])

    if (isLoading) {
      return <Loader isPageLoading />;
    }

    return (
      <AuthScreen>
        <View style={[$container, {height}]}>
          <Card
            style={{paddingVertical: 20, paddingHorizontal: 10}}
            ContentComponent={
              <>
                <Image
                  source={CaptainImage}
                  resizeMode="contain"
                  style={{width: 170, height: 170, alignSelf: 'center'}}
                />
                <Text
                  tx="loginScreen.welcome"
                  preset="heading"
                  style={{textAlign: 'center'}}
                />
                <Text
                  tx="loginScreen.description"
                  style={{textAlign: 'center', marginBottom: 20, fontSize: 14}}
                />
                <TextField
                  labelTx="labelForm.name"
                  value={values.Username}
                  onChangeText={handleChange('Username')}
                  onBlur={handleBlur('Username')}
                  autoCapitalize="none"
                />
                <TextField
                  labelTx="labelForm.password"
                  value={values.Password}
                  onChangeText={handleChange('Password')}
                  onBlur={handleBlur('Password')}
                  autoCapitalize="none"
                  secureTextEntry
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    onPress={() => navigate('ForgotPassword')}
                    preset="formLabel"
                    tx="loginScreen.foget"
                    style={{textAlign: 'center', marginBottom: 20}}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      // alignItems: "center",
                    }}>
                    <Text
                      preset="formLabel"
                      tx="loginScreen.remmberMe"
                      style={{textAlign: 'center', marginBottom: 20}}
                    />
                    <Toggle
                      value={isRemmber}
                      onValueChange={value => {
                        setFieldValue('RememberMe', value);
                        setRemmber(value);
                      }}
                      containerStyle={{
                        transform: [{scaleX: 0.7}, {scaleY: 0.7}],
                        marginTop: -10,
                      }}
                      variant="switch"
                    />
                  </View>
                </View>
                <Button
                  tx="loginScreen.signIn"
                  preset="filled"
                  onPress={() => handleSubmit()}
                />
              </>
            }
          />
        </View>
      </AuthScreen>
    );
  });

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.transparent,
};

const $container: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

const $metadata: ViewStyle = {
  marginTop: spacing.extraSmall,
  width: 100,
  height: 100,
  flexDirection: 'row',
};
