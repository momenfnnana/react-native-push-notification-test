import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { ProfileStackNavigatorParamList } from "@navigators"
import {
  Button,
  ContentContainer,
  HomeHeader,
  Loader,
  Screen,
  ScreenContainer,
  Text,
  TextField,
} from "@components"
import { Image, Linking, StyleSheet, View, ViewStyle } from "react-native"
import { PhoneNumberIcon } from "@assets"
import { InfoSection, SettingTab } from "./ProfileScreen/components"
import { colors, spacing } from "theme"
import { useFormik } from "formik"
import { ContactUs, IContactUs } from "services"
import { useMutation } from "react-query"
import { useNavigation } from "@react-navigation/native"
import * as Yup from "yup"

// import { useStores } from "@models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `ContactUs: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="ContactUs" component={ContactUsScreen} />`
// Hint: Look for the 🔥!

export const ContactUsScreen: FC<
  StackScreenProps<ProfileStackNavigatorParamList, "ContactUsScreen">
> = observer(function ContactUsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  const { mutate, isLoading } = useMutation(ContactUs, {
    onSuccess(data) {
      navigation.goBack()
    },
  })

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const initialValues: IContactUs = {
    Name: "",
    Mobile: "",
    Email: "",
    Address: "",
    MessageBody: "",
  }

  const validationSchema = Yup.object().shape({
    Name: Yup.string().required(),
    Mobile: Yup.string().required(),
    Email: Yup.string().required(),
    Address: Yup.string().required(),
    MessageBody: Yup.string().required(),
  })
  const onSubmitHandler = (values: IContactUs) => {
    mutate({ ...values })
  }
  const { values, handleChange, handleBlur, setFieldValue, errors, handleSubmit, touched } =
    useFormik<IContactUs>({
      initialValues,
      onSubmit: onSubmitHandler,
      validationSchema,
    })

  const phoneNumber = "+972 56-816-0912"

  if (isLoading) {
    return <Loader isPageLoading />
  }

  return (
    <Screen style={$root} preset="scroll">
      <HomeHeader title="contactUs.title" />
      <ContentContainer>
        <View style={{ width: "100%" }}>
          <TextField
            labelTx="labelForm.name"
            value={values.Name}
            onChangeText={handleChange("Name")}
            onBlur={handleBlur("Name")}
            status={touched.Name && errors.Name ? "error" : undefined}
            helper={touched.Name && errors.Name}
          />
          <TextField
            labelTx="labelForm.email"
            value={values.Email}
            onChangeText={handleChange("Email")}
            onBlur={handleBlur("Email")}
            status={touched.Email && errors.Email ? "error" : undefined}
            helper={touched.Email && errors.Email}
          />
          <TextField
            labelTx="labelForm.Address"
            value={values.Address}
            onChangeText={handleChange("Address")}
            onBlur={handleBlur("Address")}
            status={touched.Address && errors.Address ? "error" : undefined}
            helper={touched.Address && errors.Address}
          />
          <TextField
            labelTx="labelForm.phonenumber"
            value={values.Mobile}
            onChangeText={handleChange("Mobile")}
            onBlur={handleBlur("Mobile")}
            status={touched.Mobile && errors.Mobile ? "error" : undefined}
            helper={touched.Mobile && errors.Mobile}
            keyboardType="phone-pad"
          />
          <TextField
            labelTx="labelForm.sendMessage"
            multiline
            value={values.MessageBody}
            onChangeText={handleChange("MessageBody")}
            onBlur={handleBlur("MessageBody")}
            status={touched.MessageBody && errors.MessageBody ? "error" : undefined}
            helper={touched.MessageBody && errors.MessageBody}
          />
          <Button
            preset="filled"
            tx={"common.submit"}
            style={{ marginTop: spacing.small }}
            // isLoading={isSubmitLoading}
            onPress={() => handleSubmit()}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: spacing.small,
            }}
          >
            <Text tx="common.or" />
          </View>
          <InfoSection
            children={
              <SettingTab
                label="contactUs.callUs-into"
                labelOption={{ number: phoneNumber }}
                withDevider={false}
                onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
              />
            }
            rightIcon={<Image source={PhoneNumberIcon} style={styles.phoneIcon} />}
          />
        </View>
      </ContentContainer>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.neutral100,
}

const styles = StyleSheet.create({
  phoneIcon: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
})
