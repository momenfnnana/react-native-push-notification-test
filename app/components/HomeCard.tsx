import * as React from "react"
import {
  Linking,
  Pressable,
  StyleProp,
  TextStyle,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "@theme"
import { Text } from "./Text"
import { PinIcon, RedPin } from "@assets"
import { useNavigation } from "@react-navigation/native"
import { HomeScreenNavigationProp } from "navigators/HomeStackNavigator"

export interface HomeCardProps {
  style?: StyleProp<ViewStyle>
  onPressCard?: (pro: any) => void
  restaurantName: string
  travelDistance: number
  customerAddress: string
  orderTravelId: number
  travelCost: number
  paidAmount: number
  total: number
  restaurantMapLocation?: any
  currentStatusCode: number
}

export const HomeCard = observer(function HomeCard(props: HomeCardProps) {
  const {
    style,
    onPressCard,
    restaurantName,
    orderTravelId,
    restaurantMapLocation,
    travelDistance,
    customerAddress,
    travelCost,
    paidAmount,
    total,
    currentStatusCode,
  } = props
  const { width } = useWindowDimensions()
  const $styles = [$container, { width: width - 32 }, style]
  const { navigate } = useNavigation<HomeScreenNavigationProp>()

  const onPressCardHandler = () => {
    switch (currentStatusCode) {
      case 1:
        navigate("DriverReachRestaurant", {
          orderTravelId,
        })
        break
      case 2:
        navigate("StartTrip", props)
        break
      case 3:
        navigate("DriverReachCustomer", props)
        break
      case 4:
        navigate("EndTrip", props)
        break

      default:
        navigate("OrderDetails", {
          orderTravelId,
        })
        break
    }
  }
  return (
    <Pressable onPress={onPressCardHandler} style={$styles}>
      <View style={$header}>
        <View style={$row}>
          <Text style={$orderTitle}>{restaurantName}</Text>
          <Text style={$orderNumber}> {"#" + orderTravelId}</Text>
        </View>
        {restaurantMapLocation && (
          <Pressable
            onPress={() =>
              Linking.openURL(
                `https://www.google.com/maps/search/?api=1&query=${restaurantMapLocation}`,
              )
            }
            style={$onMapLocation}
          >
            <Text style={$onMapText} tx="common.onMap" />
            <PinIcon />
          </Pressable>
        )}
      </View>
      <View style={$content}>
        <View>
          <Text style={$titleSection} tx="common.customerAddress" />
          <View style={$row}>
            <RedPin />
            <Text style={$textValue}>{customerAddress}</Text>
          </View>
        </View>
        <Text style={$textValue} tx="common.travelDistance" txOptions={{ travelDistance }} />
      </View>
      <View style={$footer}>
        <View>
          <Text style={$titleSection} tx="common.travelCost" />
          <Text style={$textValueFooter}>{travelCost + " NIS"}</Text>
        </View>
        <View>
          <Text style={$titleSection} tx="common.paidAmount" />
          <Text style={$textValueFooter}>{paidAmount + " NIS"}</Text>
        </View>
        <View>
          <Text style={$titleSection} tx="common.total" />
          <Text style={$textValueFooter}>{total + " NIS"}</Text>
        </View>
      </View>
    </Pressable>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  backgroundColor: colors.palette.neutral100,
  borderRadius: spacing.medium,
  marginTop: spacing.small,
  padding: spacing.small,
}

const $header: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBottom: spacing.extraSmall,
  borderBottomWidth: 1,
  borderBottomColor: "#DBDBDB",
  marginBottom: spacing.small,
}

const $row: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $onMapLocation: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 8,
  backgroundColor: colors.background,
}

const $content: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: spacing.extraSmall,
}

const $footer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $onMapText: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 12,
  marginRight: spacing.tiny,
}

const $orderTitle: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 15,
}

const $orderNumber: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 15,
  color: "#707070",
}

const $textValue: TextStyle = {
  fontFamily: typography.primary.medium,
  fontSize: 15,
  marginLeft: spacing.extraSmall,
}

const $textValueFooter: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 15,
  color: colors.primary,
}

const $titleSection: TextStyle = {
  fontFamily: typography.primary.medium,
  fontSize: 13,
  color: "#707070",
}
