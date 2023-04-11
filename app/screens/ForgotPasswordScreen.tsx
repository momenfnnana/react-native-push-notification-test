import React, {FC} from 'react';
import {observer} from 'mobx-react-lite';
import {I18nManager, ViewStyle} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {AppStackScreenProps, ForgotPasswordNavigationProp} from '../navigators';
import {
  Button,
  Card,
  Header,
  Icon,
  Loader,
  Screen,
  Text,
  TextField,
} from '../components';
import {useNavigation} from '@react-navigation/native';
import {AuthScreen} from '../components/AuthScreen';
import {isRTL} from '../i18n';
import {colors, spacing, typography} from '../theme';
import {forgetPassword, ForgetPasswordBody} from '@services';
import * as Yup from 'yup';
import {useMutation} from 'react-query';
import {useFormik} from 'formik';
import {BackIcon} from '@assets';
import {translate} from '@i18n';
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `ForgotPassword: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const ForgotPasswordScreen: FC<
  StackScreenProps<AppStackScreenProps, 'ForgotPassword'>
> = observer(function ForgotPasswordScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const {navigate, goBack} = useNavigation<ForgotPasswordNavigationProp>();

  const {mutate, isLoading} = useMutation(forgetPassword, {
    onSuccess(data) {
      const param = data.data;
      navigate('Verfication', {Mobile: param.mobile, EncCode: param.encCode});
    },
  });
  const initialValues: ForgetPasswordBody = {
    Mobile: '',
  };

  const onSubmitHandler = (values: ForgetPasswordBody) => {
    mutate({
      Mobile: values.Mobile,
    });
  };
  const ForgetPasswordSchema = Yup.object().shape({
    Mobile: Yup.string().required(translate('validation.required')),
  });

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
  } = useFormik<ForgetPasswordBody>({
    initialValues,
    onSubmit: onSubmitHandler,
    validationSchema: ForgetPasswordSchema,
  });

  if (isLoading) {
    return <Loader isPageLoading />;
  }

  return (
    <AuthScreen>
      <BackIcon
        onPress={() => goBack()}
        height={24}
        width={24}
        style={[
          {marginBottom: spacing.large, marginTop: spacing.extraLarge},
          I18nManager.isRTL ? {transform: [{rotateY: '180deg'}]} : {},
        ]}
      />
      <Text tx="forgetPasswordScreen.title" preset="heading" />
      <Text
        tx="forgetPasswordScreen.description"
        style={{marginTop: spacing.small, color: colors.palette.neutral600}}
      />
      <Card
        style={{
          paddingVertical: 20,
          paddingHorizontal: 10,
          marginTop: spacing.extraLarge,
        }}
        ContentComponent={
          <>
            <TextField
              labelTx="labelForm.mobile"
              keyboardType="phone-pad"
              value={values.Mobile}
              onChangeText={handleChange('Mobile')}
              onBlur={handleBlur('Mobile')}
              status={touched.Mobile && errors.Mobile ? 'error' : undefined}
              helper={touched.Mobile && errors.Mobile}
            />
            <Button
              tx="forgetPasswordScreen.submitBtn"
              preset="filled"
              style={{marginTop: spacing.large}}
              onPress={() => handleSubmit()}
            />
          </>
        }
      />
    </AuthScreen>
  );
});

const $root: ViewStyle = {
  flex: 1,
};
