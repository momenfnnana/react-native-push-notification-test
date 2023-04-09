import React, { FC, useEffect, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { StyleSheet, View, useWindowDimensions } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { ProfileScreenNavigationProp, ProfileStackNavigatorParamList } from "@navigators"
import {
  Button,
  ProfileContainer,
  ProgressBar,
  Screen,
  Text,
  Modal,
  Radio,
  Loader,
} from "@components"
import Feather from "react-native-vector-icons/Feather"
import { InfoLabel, InfoSection, ProfileHeader, SettingTab } from "./components"
import { colors, spacing } from "@theme"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { arLanguageKey, enLanguageKey } from "@i18n"
import i18n from "i18n-js"
import { I18nManager } from "react-native"
import { saveString, setAxiosAccessToken } from "@utils"
import RNRestart from "react-native-restart"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "@models"
import { useQuery } from "react-query"
import { getLanguages, getProfile } from "@services"
import { useAccessToken } from "@hooks"

export const ProfileScreen: FC<StackScreenProps<ProfileStackNavigatorParamList, "Profile">> =
  observer(function ProfileScreen() {
    const { navigate } = useNavigation<ProfileScreenNavigationProp>()
    const { top, bottom } = useSafeAreaInsets()
    const { width } = useWindowDimensions()
    const styles = s({ width })
    const [isVisibleLanguageModal, setIsVisibleLanguageModal] = useState<boolean>(false)
    const { reload } = useAccessToken()
    const {
      // userStoreModel: { setUserData, ...userData },
      authenticationStore: { setAccessToken },
    } = useStores()

    const { isLoading, data } = useQuery("getProfile", getProfile)
    const userData = data?.data
    const { isLoading: isLoadingLanguages, data: dataLanguages } = useQuery(
      "getLanguages",
      getLanguages,
    )

    const openLanguageModalHandler = () => {
      setIsVisibleLanguageModal(true)
    }

    const closeLanguageModalHandler = () => {
      setIsVisibleLanguageModal(false)
    }

    const changeDirection = async () => {
      const isRTL = i18n.locale === arLanguageKey
      await I18nManager.allowRTL(isRTL)
      await I18nManager.forceRTL(isRTL)
      RNRestart.restart()
    }

    type ILanguageType = number

    //   "detailsLookup": [
    //     {
    //         "id": 8,
    //         "name": "English"
    //     },
    //     {
    //         "id": 7,
    //         "name": "Arabic"
    //     }
    // ]

    const selectLanguageHandler = (type: ILanguageType) => {
      closeLanguageModalHandler()
      setTimeout(() => {
        const languageKey = type === 7 ? arLanguageKey : enLanguageKey
        saveString("language", languageKey)
        i18n.locale = languageKey
        changeDirection()
      }, 1000)
    }
    const logoutHandler = () => {
      setAccessToken("")
      setAxiosAccessToken("")
      reload("")
    }

    if (isLoading || isLoadingLanguages) {
      return <Loader isPageLoading />
    }
    return (
      <Screen style={styles.container} preset="scroll">
        <ProfileContainer
          header={<ProfileHeader {...userData} />}
          style={{ flex: 1, backgroundColor: colors.palette.neutral100 }}
        >
          <View style={styles.cardsContainer}>
            <InfoSection
              data={{
                name: userData?.name,
                mobile: userData?.mobile,
                vehicleType: userData?.vehicleType,
                modalHeading: userData?.modalHeading,
                balance: userData?.balance.toString(),
              }}
            />
            <InfoSection
              children={
                <>
                  <SettingTab
                    label="profileScreen.change-car-type"
                    onPress={() => navigate("ChangeVehicleScreen")}
                  />
                  <SettingTab
                    label="profileScreen.language"
                    onPress={openLanguageModalHandler}
                    behindArrow={
                      <Text
                        tx={i18n.locale === "ar-US" ? "common.arabic" : "common.english"}
                        preset="default"
                        size="xxs"
                        style={{ color: colors.palette.overlay60 + 57 }}
                      />
                    }
                  />
                  <SettingTab
                    label="profileScreen.call-us"
                    onPress={() => navigate("ContactUsScreen")}
                  />
                  <SettingTab
                    label="resetPasswordScreen.title"
                    onPress={() => navigate("ChangePasswordScreen")}
                  />
                  <SettingTab label="common.logOut" withDevider={false} onPress={logoutHandler} />
                </>
              }
            />
          </View>
        </ProfileContainer>
        <Modal
          isVisible={isVisibleLanguageModal}
          onBackdropPress={closeLanguageModalHandler}
          style={{ margin: 0 }}
        >
          <View style={[styles.modalContainer, { paddingBottom: bottom }]}>
            <Text tx="common.select-language" style={styles.ModalTitle} preset="bold" size="md" />
            <InfoSection
              containerStyle={{ paddingHorizontal: 0 }}
              children={
                <>
                  {dataLanguages.data.detailsLookup.map((item, index) => (
                    <Radio
                      label={item.name}
                      isActive={
                        (i18n.locale === "ar-US" && item.id == 7) ||
                        (i18n.locale === "en-US" && item.id == 8)
                      }
                      onPress={() => selectLanguageHandler(item.id)}
                      withDevider={
                        index === dataLanguages.data.detailsLookup.length - 1 ? false : true
                      }
                    />
                  ))}
                </>
              }
            />
            <Button preset="filled" tx="common.submit" />
          </View>
        </Modal>
      </Screen>
    )
  })

interface IStyle {
  width: number
}

const s = ({ width }: IStyle) =>
  StyleSheet.create({
    container: {},
    cardsContainer: {
      flex: 1,
      backgroundColor: colors.palette.neutral200,
      paddingVertical: spacing.huge + 10,
      paddingHorizontal: spacing.medium + 4,
      borderTopRightRadius: spacing.extraLarge,
      borderTopLeftRadius: spacing.extraLarge,
    },
    cardContainer: {
      position: "relative",
    },
    editButton: {
      width: width * 0.23 || 0,
      position: "absolute",
      zIndex: 10,
      top: -spacing.large + 4,
      borderRadius: 7,
      height: spacing.extraLarge + 1,
      justifyContent: "center",
      alignItems: "center",
      minHeight: undefined,
      paddingVertical: spacing.tiny + 2,
      paddingHorizontal: spacing.medium + 1,
    },
    chargeStatusContainer: {
      paddingBottom: spacing.medium + 4,
    },
    modalContainer: {
      position: "absolute",
      backgroundColor: colors.palette.neutral150,
      right: 0,
      left: 0,
      bottom: 0,
      borderTopRightRadius: spacing.extraLarge,
      borderTopLeftRadius: spacing.extraLarge,
      paddingTop: spacing.huge,
      paddingHorizontal: spacing.medium + 4,
    },
    ModalTitle: {
      textAlign: "center",
      marginBottom: spacing.extraLarge + 2,
    },
  })
