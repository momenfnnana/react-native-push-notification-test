import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps, ProfileStackNavigatorParamList } from "@navigators"
import { Loader, Screen, ScreenContainer, Text, TextField } from "@components"
import SelectDropdown from "react-native-select-dropdown"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { colors, spacing, typography } from "@theme"
import { translate } from "@i18n"
import { InfoSection } from "./ProfileScreen/components"
import { useMutation, useQuery, useQueryClient } from "react-query"
import {
  DetailsLookup,
  editCaptainCar,
  EditCaptainCarBody,
  getCaptainCar,
  getCarTypes,
  GetCarTypesResponse,
} from "services"
import { useNavigation } from "@react-navigation/native"
import * as Yup from "yup"
import { useFormik } from "formik"

// import { useStores } from "@models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `ChangeVehicleType: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="ChangeVehicleType" component={ChangeVehicleTypeScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const ChangeVehicleTypeScreen: FC<
  StackScreenProps<ProfileStackNavigatorParamList, "ChangeVehicleScreen">
> = observer(function ChangeVehicleTypeScreen() {
  const [stateSelected, setStateSelected] = useState<DetailsLookup>()
  const { isLoading: isLoadingGetCarTypes, data: dataCarTypes } = useQuery(
    "getCarTypes",
    getCarTypes,
  )

  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const ref = useRef<any>()
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(editCaptainCar, {
    onSuccess(data) {
      queryClient.invalidateQueries("getProfile")
      navigation.goBack()
    },
  })

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const initialValues: EditCaptainCarBody = {
    CarId: "",
    Name: "",
    CarNumber: "",
  }

  const validationSchema = Yup.object().shape({
    Name: Yup.string().required(),
    CarNumber: Yup.string().required(),
  })
  const onSubmitHandler = (values: EditCaptainCarBody) => {
    mutate({ ...values, CarId: stateSelected.id.toString() })
  }
  const { values, handleChange, handleBlur, setFieldValue, errors, handleSubmit, touched } =
    useFormik<EditCaptainCarBody>({
      initialValues,
      onSubmit: onSubmitHandler,
      validationSchema,
    })

  const { isLoading: isLoadingGetCaptainCar, data: dataCaptainCar } = useQuery(
    "getCaptainCar",
    getCaptainCar,
    {
      onSuccess(data) {
        setFieldValue("Name", data.data.name)
        setFieldValue("CarNumber", data.data.carNumber)
      },
    },
  )

  useEffect(() => {
    if (dataCarTypes?.data?.detailsLookup.length > 0) {
      const carTypeSelected = dataCarTypes.data.detailsLookup.find(
        (i) => i.id === dataCaptainCar?.data?.carId,
      )
      if (carTypeSelected) {
        setStateSelected({ ...carTypeSelected })
      }
    }
  }, [dataCarTypes?.data?.detailsLookup, dataCaptainCar?.data])

  if (isLoadingGetCarTypes || isLoadingGetCaptainCar) {
    return <Loader isPageLoading />
  }

  return (
    <ScreenContainer
      title="changeVehicleScreen.title"
      withDismissKeyboard={false}
      onSubmit={() => handleSubmit()}
      isSubmitLoading={isLoading}
      withScroll
    >
      <InfoSection containerStyle={styles.contentContainer}>
        <SelectDropdown
          ref={ref}
          defaultButtonText={stateSelected?.name || translate("CaptainListScreen.title")}
          renderDropdownIcon={() => (
            <MaterialIcons
              name={`keyboard-arrow-down`}
              size={18}
              color={colors.palette.neutral900}
            />
          )}
          data={dataCarTypes.data.detailsLookup}
          buttonStyle={styles.dropDownButtonStyle}
          renderCustomizedRowChild={(item: DetailsLookup) => (
            <View key={item?.id?.toString()} style={styles.dropdownItemContainer}>
              <Text>{item?.name}</Text>
            </View>
          )}
          onSelect={(item: DetailsLookup) => {
            setStateSelected({ ...item })
          }}
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem.name
          }}
          rowTextForSelection={(item: any) => item}
        />

        <TextField
          containerStyle={{ marginTop: spacing.medium }}
          labelTx="labelForm.vehicle-brand"
          value={values.Name}
          onChangeText={handleChange("Name")}
          onBlur={handleBlur("Name")}
          status={touched.Name && errors.Name ? "error" : undefined}
          helper={touched.Name && errors.Name}
        />
        <TextField
          labelTx="labelForm.CarNumber"
          value={values.CarNumber}
          onChangeText={handleChange("CarNumber")}
          onBlur={handleBlur("CarNumber")}
          status={touched.CarNumber && errors.CarNumber ? "error" : undefined}
          helper={touched.CarNumber && errors.CarNumber}
        />
      </InfoSection>
    </ScreenContainer>
  )
})

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: spacing.medium + 4,
  },
  dropDownButtonStyle: {
    paddingVertical: spacing.small,
    borderWidth: 1,
    borderColor: colors.palette.neutral300,
    borderRadius: spacing.small,
    backgroundColor: colors.palette.neutral100,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: spacing.extraSmall,
    width: "100%",
  },
  dropdownItemContainer: {
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: spacing.extraSmall,
  },
})
