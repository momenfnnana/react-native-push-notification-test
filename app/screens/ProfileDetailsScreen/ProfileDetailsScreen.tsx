import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import {
  View,
  ImageBackground,
  ImageProps,
  StyleSheet,
  TouchableOpacity,
  I18nManager,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import {
  ProfileDetailsScreenNavigationProp,
  ProfileScreenDetailsRouteProp,
  ProfileStackNavigatorParamList,
} from "@navigators"
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
import { colors, spacing } from "theme"
import AntDesign from "react-native-vector-icons/AntDesign"
import { IMAGE_SIZE, EDIT_SIZE } from "screens/ProfileScreen/components"
import { profileImage } from "@assets"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useStores } from "models"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useMutation, useQueryClient } from "react-query"
import { editProfile } from "services"

interface IHeader {
  source: ImageProps["source"]
}
interface userInfoForm {
  Name: string
  Mobile: string
  CarNumber: string
}

const Header = ({ source }: IHeader) => {
  const onPressUpload = () => {}
  return (
    <View style={styles.uploadImageContainer}>
      <ImageBackground
        source={source}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        {/* <TouchableOpacity onPress={onPressUpload} style={styles.uploadBtn}>
          <AntDesign name="upload" color={colors.palette.underReview2} size={spacing.medium} />
        </TouchableOpacity> */}
      </ImageBackground>
      {/* <Text
        tx="profileScreen.upload-image"
        preset="formLabel"
        style={{ color: colors.palette.gray, marginLeft: spacing.medium }}
      /> */}
    </View>
  )
}

export const ProfileDetailsScreen: FC<
  StackScreenProps<ProfileStackNavigatorParamList, "ProfileDetails">
> = observer(function ProfileDetailsScreen() {
  const {
    params: { name, mobile, carNumber, profilePhoto },
  } = useRoute<ProfileScreenDetailsRouteProp>()
  const { goBack } = useNavigation<ProfileDetailsScreenNavigationProp>()
  // Pull in one of our MST stores
  // read user data from store
  // update global userdata on confirm edit request
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(editProfile, {
    onSuccess(data) {
      queryClient.invalidateQueries("getProfile")
      goBack()
    },
  })

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const initialValues: userInfoForm = {
    Name: name || "",
    Mobile: mobile || "",
    CarNumber: carNumber || "",
  }

  const validationSchema = Yup.object().shape({
    Name: Yup.string().required(),
    Mobile: Yup.string().required(),
    CarNumber: Yup.string().required(),
  })
  const onSubmitHandler = (values: userInfoForm) => {
    mutate({ Name: values.Name, CarNumber: values.CarNumber, Mobile: values.Mobile })
  }
  const { values, handleChange, handleBlur, setFieldValue, errors, handleSubmit, touched } =
    useFormik<userInfoForm>({
      initialValues,
      onSubmit: onSubmitHandler,
      validationSchema,
    })

  if (isLoading) {
    return <Loader isPageLoading />
  }

  return (
    <Screen style={styles.root} preset="scroll">
      <HomeHeader title="profileScreen.edit-profile" />
      <ContentContainer>
        <View style={{ width: "100%" }}>
          <Header
            source={
              profilePhoto ? { uri: "http://captain.salam-it.com" + profilePhoto } : profileImage
            }
          />
          <TextField
            labelTx="labelForm.name"
            value={values.Name}
            onChangeText={handleChange("Name")}
            onBlur={handleBlur("Name")}
            status={touched.Name && errors.Name ? "error" : undefined}
            helper={touched.Name && errors.Name}
          />
          <TextField
            labelTx="labelForm.mobile"
            value={values.Mobile}
            onChangeText={handleChange("Mobile")}
            onBlur={handleBlur("Mobile")}
            status={touched.Mobile && errors.Mobile ? "error" : undefined}
            helper={touched.Mobile && errors.Mobile}
          />
          <TextField
            labelTx="labelForm.card-number"
            value={values.CarNumber}
            onChangeText={handleChange("CarNumber")}
            onBlur={handleBlur("CarNumber")}
            status={touched.CarNumber && errors.CarNumber ? "error" : undefined}
            helper={touched.CarNumber && errors.CarNumber}
          />
        </View>
        <Button
          preset="filled"
          tx={"common.submit"}
          style={{ marginTop: spacing.massive, width: "100%" }}
          isLoading={isLoading}
          onPress={() => handleSubmit()}
        />
      </ContentContainer>
    </Screen>
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.palette.neutral100,
  },
  imageBackground: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    position: "relative",
  },
  imageStyle: {
    borderRadius: 21,
  },
  uploadBtn: {
    width: EDIT_SIZE,
    height: EDIT_SIZE,
    borderRadius: EDIT_SIZE / 2,
    backgroundColor: colors.palette.neutral100,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: -5,
    ...(I18nManager.isRTL ? { left: -5 } : { right: -5 }),
  },
  uploadImageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.medium,
  },
})
