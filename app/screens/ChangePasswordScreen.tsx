import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { ProfileStackNavigatorParamList } from "@navigators"
import { ScreenContainer, TextField } from "@components"
import { InfoSection } from "./ProfileScreen/components"
import { colors, spacing } from "@theme"
import { useFormik } from "formik"
import * as Yup from "yup"
import { ChangePassword, IChangePassword } from "@services"
import { translate } from "@i18n"
import { useMutation } from "react-query"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `ChangePassword: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const ChangePasswordScreen: FC<
  StackScreenProps<ProfileStackNavigatorParamList, "ChangePasswordScreen">
> = observer(function ChangePasswordScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const { mutate, isLoading } = useMutation(ChangePassword)
  // Pull in navigation via hook
  // const navigation = useNavigation()
  const formInitialValues: IChangePassword = {
    OldPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
  }
  const validationSchema = Yup.object().shape({
    OldPassword: Yup.string()
      .min(8, translate("validation.minLength", { minLength: 8 }))
      .matches(/[a-z]/, translate("validation.lowercase"))
      .matches(/[A-Z]/, translate("validation.uppercase"))
      .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/, translate("validation.special"))
      .required(translate("validation.required")),
    NewPassword: Yup.string()
      .min(8, translate("validation.minLength", { minLength: 8 }))
      .matches(/[a-z]/, translate("validation.lowercase"))
      .matches(/[A-Z]/, translate("validation.uppercase"))
      .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/, translate("validation.special"))
      .required(translate("validation.required")),

    ConfirmPassword: Yup.string()
      .oneOf([Yup.ref("NewPassword"), ""], translate("validation.password-must-match"))
      .required(translate("validation.required")),
  })
  const onSubmitHandler = (values: IChangePassword) => {
    mutate({
      OldPassword: values.OldPassword,
      NewPassword: values.NewPassword,
      ConfirmPassword: values.ConfirmPassword,
    })
  }
  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik<IChangePassword>({
      initialValues: formInitialValues,
      onSubmit: onSubmitHandler,
      validationSchema,
    })

  return (
    <ScreenContainer
      title="changePasswordScreen.title"
      onSubmit={() => handleSubmit()}
      isSubmitLoading={isLoading}
      withScroll
    >
      <InfoSection containerStyle={{ paddingTop: spacing.medium + 4 }}>
        <TextField
          labelTx="labelForm.OldPasswordInput"
          value={values.OldPassword}
          onChangeText={handleChange("OldPassword")}
          onBlur={handleBlur("OldPassword")}
          status={touched.OldPassword ? "error" : undefined}
          helper={touched.OldPassword && errors.OldPassword}
        />
        <TextField
          labelTx="labelForm.password"
          value={values.NewPassword}
          onChangeText={handleChange("NewPassword")}
          onBlur={handleBlur("NewPassword")}
          status={touched.NewPassword ? "error" : undefined}
          helper={touched.NewPassword && errors.NewPassword}
        />
        <TextField
          labelTx="labelForm.newPasswordInput"
          value={values.ConfirmPassword}
          onChangeText={handleChange("ConfirmPassword")}
          onBlur={handleBlur("ConfirmPassword")}
          status={touched.ConfirmPassword ? "error" : undefined}
          helper={touched.ConfirmPassword && errors.ConfirmPassword}
        />
      </InfoSection>
    </ScreenContainer>
  )
})
