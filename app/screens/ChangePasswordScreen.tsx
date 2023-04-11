import React, {FC} from 'react';
import {observer} from 'mobx-react-lite';
import {StackScreenProps} from '@react-navigation/stack';
import {ProfileStackNavigatorParamList} from '@navigators';
import {
  Button,
  ContentContainer,
  HomeHeader,
  Screen,
  TextField,
} from '@components';
import {InfoSection} from './ProfileScreen/components';
import {colors, spacing} from '@theme';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {ChangePassword, IChangePassword} from '@services';
import {translate} from '@i18n';
import {useMutation} from 'react-query';
import {StyleSheet, View} from 'react-native';

export const ChangePasswordScreen: FC<
  StackScreenProps<ProfileStackNavigatorParamList, 'ChangePasswordScreen'>
> = observer(function ChangePasswordScreen() {
  const {mutate, isLoading} = useMutation(ChangePassword);
  const formInitialValues: IChangePassword = {
    OldPassword: '',
    NewPassword: '',
    ConfirmPassword: '',
  };
  const validationSchema = Yup.object().shape({
    OldPassword: Yup.string()
      .min(8, translate('validation.minLength', {minLength: 8}))
      .matches(/[a-z]/, translate('validation.lowercase'))
      .matches(/[A-Z]/, translate('validation.uppercase'))
      .matches(
        /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/,
        translate('validation.special'),
      )
      .required(translate('validation.required')),
    NewPassword: Yup.string()
      .min(8, translate('validation.minLength', {minLength: 8}))
      .matches(/[a-z]/, translate('validation.lowercase'))
      .matches(/[A-Z]/, translate('validation.uppercase'))
      .matches(
        /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/,
        translate('validation.special'),
      )
      .required(translate('validation.required')),

    ConfirmPassword: Yup.string()
      .oneOf(
        [Yup.ref('NewPassword'), ''],
        translate('validation.password-must-match'),
      )
      .required(translate('validation.required')),
  });
  const onSubmitHandler = (values: IChangePassword) => {
    mutate({
      OldPassword: values.OldPassword,
      NewPassword: values.NewPassword,
      ConfirmPassword: values.ConfirmPassword,
    });
  };
  const {values, handleChange, handleBlur, handleSubmit, errors, touched} =
    useFormik<IChangePassword>({
      initialValues: formInitialValues,
      onSubmit: onSubmitHandler,
      validationSchema,
    });

  return (
    <Screen style={styles.container} preset="scroll">
      <HomeHeader title="CaptainListScreen.title" />
      <ContentContainer style={styles.contentContainer}>
        <View style={styles.infoSectionContainer}>
          <InfoSection containerStyle={styles.infoSection}>
            <TextField
              labelTx="labelForm.OldPasswordInput"
              value={values.OldPassword}
              onChangeText={handleChange('OldPassword')}
              onBlur={handleBlur('OldPassword')}
              status={touched.OldPassword ? 'error' : undefined}
              helper={(touched.OldPassword && errors.OldPassword) || ''}
              secureTextEntry
            />
            <TextField
              labelTx="labelForm.password"
              value={values.NewPassword}
              onChangeText={handleChange('NewPassword')}
              onBlur={handleBlur('NewPassword')}
              status={touched.NewPassword ? 'error' : undefined}
              helper={(touched.NewPassword && errors.NewPassword) || ''}
              secureTextEntry
            />
            <TextField
              labelTx="labelForm.newPasswordInput"
              value={values.ConfirmPassword}
              onChangeText={handleChange('ConfirmPassword')}
              onBlur={handleBlur('ConfirmPassword')}
              status={touched.ConfirmPassword ? 'error' : undefined}
              helper={(touched.ConfirmPassword && errors.ConfirmPassword) || ''}
              secureTextEntry
            />
          </InfoSection>
        </View>
        <View style={styles.submitBtnContainer}>
          <Button
            preset="filled"
            tx={'changePasswordScreen.title'}
            isLoading={isLoading}
            onPress={handleSubmit}
          />
        </View>
      </ContentContainer>
    </Screen>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.palette.neutral100,
  },
  contentContainer: {
    padding: 0,
  },
  infoSection: {
    paddingTop: spacing.medium + 4,
    width: '100%',
  },
  infoSectionContainer: {
    padding: spacing.medium,
    width: '100%',
  },
  submitBtnContainer: {
    paddingHorizontal: spacing.medium + 4,
    paddingTop: spacing.medium + 2,
    width: '100%',
  },
});
