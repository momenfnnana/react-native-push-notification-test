import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { I18nManager, Image, ImageStyle, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { CaptainListScreenNavigationProp, DemoTabParamList } from "@navigators"
import {
  ContentContainer,
  EmptyPage,
  HomeHeader,
  Loader,
  Screen,
  SearchInput,
  Text,
} from "@components"
import { colors, spacing, typography } from "theme"
import { useNavigation } from "@react-navigation/native"
import { useQuery } from "react-query"
import { getTopCaptains } from "services"

export const CaptainList: FC<StackScreenProps<DemoTabParamList, "CaptainList">> = observer(
  function CaptainList() {
    const { navigate } = useNavigation<CaptainListScreenNavigationProp>()
    const { data, isLoading } = useQuery("getTopCaptains", getTopCaptains)

    if (isLoading) {
      return <Loader isPageLoading />
    }

    return (
      <Screen style={$root} preset="scroll">
        <HomeHeader title="CaptainListScreen.title" hideBackIcon={true} />
        <ContentContainer>
          {data.data.captains.length > 0 ? (
            data.data.captains.map((item, index) => (
              <View key={index.toString()} style={$containItem}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    style={$image}
                    source={{ uri: "http://captain.salam-it.com" + item.profilePhoto }}
                  />
                  <View>
                    <Text text={item.fullName} style={$driverName} />
                    <Text
                      tx={"CaptainListScreen.tripCount"}
                      txOptions={{ tripCount: item.numberOfTravels }}
                      style={$tripCount}
                    />
                  </View>
                </View>
                <View style={$containId}>
                  <Text text={"#" + item.driverId} style={$idText} />
                </View>
              </View>
            ))
          ) : (
            <EmptyPage title="emptyPage.topCaptians" />
          )}
        </ContentContainer>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.neutral100,
}

const $containItem: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: colors.palette.neutral100,
  borderRadius: spacing.small,
  paddingHorizontal: spacing.small,
  paddingVertical: spacing.medium,
  marginBottom: spacing.medium,
  width: "100%",
}

const $containId: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: colors.errorBackground,
  borderRadius: 24,
  width: 50,
  height: 50,
}

const $image: ImageStyle = {
  width: 70,
  height: 70,
  borderRadius: spacing.medium,
  marginRight: spacing.extraSmall,
}

const $driverName: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 16,
  marginBottom: 5,
}

const $tripCount: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 15,
  color: colors.error,
}

const $idText: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 23,
  color: colors.error,
}
