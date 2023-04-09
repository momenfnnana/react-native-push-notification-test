import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { I18nManager, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import {
  AppStackScreenProps,
  ResetPasswordNavigationProp,
  ResetPasswordScreenRouteProp,
} from "../navigators"
import { AuthScreen, Button, Card, Icon, Loader, Screen, Text, TextField } from "../components"
import { useNavigation, useRoute } from "@react-navigation/native"
import { colors, spacing } from "../theme"
import { useMutation } from "react-query"
import { resetPassword, ResetPasswordBody } from "@services"
import * as Yup from "yup"
import { useFormik } from "formik"
import { BackIcon } from "@assets"

// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `ResetPassword: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore

export const ResetPasswordScreen: FC<StackScreenProps<AppStackScreenProps, "ResetPassword">> =
  observer(function ResetPasswordScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    const { navigate, goBack } = useNavigation<ResetPasswordNavigationProp>()
    const {
      params: { Code, EncCode, Mobile },
    } = useRoute<ResetPasswordScreenRouteProp>()
    const { mutate, isLoading } = useMutation(resetPassword, {
      onSuccess(data) {
        navigate("Login")
      },
    })
    const initialValues: ResetPasswordBody = {
      CountryCode: "+972",
      Mobile,
      EncCode,
      Code,
      NewPassword: "",
      ConfirmPassword: "",
    }

    const onSubmitHandler = (values: ResetPasswordBody) => {
      mutate({
        Mobile: values.Mobile,
        CountryCode: values.CountryCode,
        EncCode: values.EncCode,
        Code: values.Code,
        NewPassword: values.NewPassword,
        ConfirmPassword: values.ConfirmPassword,
      })
    }

    const passwordValidation = Yup.string()
      .required()
      .min(8)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
      )

    const confirmValidation = Yup.string()
      .required()
      .oneOf([Yup.ref("NewPassword"), null], "Passwords must match")

    const ForgetPasswordSchema = Yup.object().shape({
      NewPassword: passwordValidation,
      ConfirmPassword: confirmValidation,
    })

    const { values, handleChange, handleBlur, handleSubmit, setFieldValue, errors, touched } =
      useFormik<ResetPasswordBody>({
        initialValues,
        onSubmit: onSubmitHandler,
        validationSchema: ForgetPasswordSchema,
      })

    if (isLoading) {
      return <Loader isPageLoading />
    }

    return (
      <AuthScreen>
        <BackIcon
          onPress={() => goBack()}
          height={24}
          width={24}
          style={[
            { marginBottom: spacing.large, marginTop: spacing.extraLarge },
            I18nManager.isRTL ? { transform: [{ rotateY: "180deg" }] } : {},
          ]}
        />
        <Text tx="resetPasswordScreen.title" preset="heading" />
        <Text
          tx="resetPasswordScreen.description"
          style={{ marginTop: spacing.small, color: colors.palette.neutral600 }}
        />
        <Card
          style={{ paddingVertical: 20, paddingHorizontal: 10, marginTop: spacing.extraLarge }}
          ContentComponent={
            <>
              <TextField
                value={values.NewPassword}
                onChangeText={handleChange("NewPassword")}
                onBlur={handleBlur("NewPassword")}
                status={touched.NewPassword && errors.NewPassword ? "error" : undefined}
                labelTx="labelForm.newPasswordInput"
                helper={touched.NewPassword && errors.NewPassword}
                secureTextEntry
              />
              <TextField
                value={values.ConfirmPassword}
                onChangeText={handleChange("ConfirmPassword")}
                onBlur={handleBlur("ConfirmPassword")}
                status={touched.ConfirmPassword && errors.ConfirmPassword ? "error" : undefined}
                labelTx="labelForm.confirmNewPassword"
                helper={touched.ConfirmPassword && errors.ConfirmPassword}
                secureTextEntry
              />
              <Button
                tx="resetPasswordScreen.submitBtn"
                preset="filled"
                style={{ marginTop: spacing.large }}
                onPress={() => handleSubmit()}
              />
            </>
          }
        />
      </AuthScreen>
    )
  })

const $root: ViewStyle = {
  flex: 1,
}
