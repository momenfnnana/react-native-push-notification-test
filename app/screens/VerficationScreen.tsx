import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { I18nManager, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import {
  AppStackScreenProps,
  VerficationNavigationProp,
  VerficationScreenRouteProp,
} from "../navigators"
import { Button, Card, Icon, Loader, Screen, Text } from "../components"
import { AuthScreen } from "../components/AuthScreen"
import { useNavigation, useRoute } from "@react-navigation/native"
import { colors, spacing } from "../theme"
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field"
import { useMutation } from "react-query"
import { forgetPassword, validateCode, ValidateCodeBody } from "@services"
import * as Yup from "yup"
import { useFormik } from "formik"
import { BackIcon } from "@assets"

// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Verfication: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Verfication" component={VerficationScreen} />`
// Hint: Look for the 🔥!
const CELL_COUNT = 6

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore

export const VerficationScreen: FC<StackScreenProps<AppStackScreenProps, "Verfication">> = observer(
  function VerficationScreen() {
    const [value, setValue] = useState<string>("")

    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    })
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    const { navigate, goBack } = useNavigation<VerficationNavigationProp>()
    const {
      params: { EncCode, Mobile },
    } = useRoute<VerficationScreenRouteProp>()

    const { mutate, isLoading } = useMutation(validateCode, {
      onSuccess(data) {
        navigate("ResetPassword", { Code: values.Code, EncCode, Mobile })
      },
    })

    const { mutate: mutateForgetPassword, isLoading: isLoadingForgetPassword } =
      useMutation(forgetPassword)

    const initialValues: ValidateCodeBody = {
      Mobile,
      CountryCode: "+972",
      EncCode,
      Code: "",
    }

    const onSubmitHandler = (values: ValidateCodeBody) => {
      mutate({
        Mobile: values.Mobile,
        CountryCode: values.CountryCode,
        EncCode: values.EncCode,
        Code: values.Code,
      })
    }
    const ForgetPasswordSchema = Yup.object().shape({
      Code: Yup.string().required().length(6),
    })

    const { values, handleChange, handleBlur, handleSubmit, setFieldValue, errors, touched } =
      useFormik<ValidateCodeBody>({
        initialValues,
        onSubmit: onSubmitHandler,
        validationSchema: ForgetPasswordSchema,
      })

    const resendHandle = () => {
      mutateForgetPassword({ Mobile })
    }

    if (isLoading || isLoadingForgetPassword) {
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
        <Text tx="verficationScreen.title" preset="heading" />
        <Text
          tx="verficationScreen.description"
          style={{ marginTop: spacing.small, color: colors.palette.neutral600 }}
        />
        <Card
          style={{ paddingVertical: 20, paddingHorizontal: 10, marginTop: spacing.extraLarge }}
          ContentComponent={
            <>
              <CodeField
                ref={ref}
                {...props}
                // caretHidden={false}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                // value={value}
                value={values.Code}
                onChangeText={handleChange("Code")}
                onBlur={handleBlur("Code")}
                // onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={{ marginTop: 20, justifyContent: "center", marginBottom: 20 }}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <Text
                    key={index}
                    style={{
                      width: 32,
                      height: 32,
                      lineHeight: 30,
                      fontSize: 24,
                      borderWidth: 1,
                      borderColor: errors.Code
                        ? colors.rejected
                        : isFocused
                        ? colors.palette.neutral900
                        : colors.palette.neutral300,
                      textAlign: "center",
                      borderRadius: 4,
                      marginHorizontal: 5,
                    }}
                    onLayout={getCellOnLayoutHandler(index)}
                  >
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
              {errors.Code && (
                <Text style={{ color: colors.rejected, textAlign: "center" }}>{errors.Code}</Text>
              )}
              <Button
                tx="verficationScreen.submitBtn"
                preset="filled"
                style={{ marginTop: spacing.large }}
                onPress={() => handleSubmit()}
              />
              <Text
                tx="verficationScreen.resendBtn"
                preset="bold"
                style={{ textAlign: "center", marginTop: spacing.medium }}
                onPress={resendHandle}
              />
            </>
          }
        />
      </AuthScreen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
