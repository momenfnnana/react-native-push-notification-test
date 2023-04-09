import React from "react"
import { View, ImageBackground, TouchableOpacity, StyleSheet, I18nManager } from "react-native"
import Feather from "react-native-vector-icons/Feather"
import { colors, spacing } from "@theme"
import { Text } from "@components"
import { useNavigation } from "@react-navigation/native"
import { ProfileScreenNavigationProp } from "@navigators"
import { profileImage } from "@assets"
import { UserStoreSnapshot } from "@models"
import { UserInfo } from "@services"

export const EDIT_SIZE = 39
export const IMAGE_SIZE = 94

export const ProfileHeader = ({ ...userData }: UserInfo) => {
  const navigation = useNavigation<ProfileScreenNavigationProp>()

  const onPressEdit = () => {
    navigation.navigate("ProfileDetails", { ...userData })
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={
          userData.profilePhoto
            ? { uri: "http://captain.salam-it.com" + userData.profilePhoto }
            : profileImage
        }
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <TouchableOpacity onPress={onPressEdit} style={styles.editButton}>
          <Feather name="edit-2" color={colors.offWhite} size={spacing.medium} />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.large,
  },
  imageBackground: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    position: "relative",
  },
  imageStyle: {
    borderRadius: 21,
  },
  editButton: {
    width: EDIT_SIZE,
    height: EDIT_SIZE,
    borderRadius: EDIT_SIZE / 2,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: -5,
    ...(I18nManager.isRTL ? { left: -5 } : { right: -5 }),
  },
  userInfo: {
    marginLeft: spacing.small,
  },
})
