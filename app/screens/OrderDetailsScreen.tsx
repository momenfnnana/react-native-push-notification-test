import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Linking, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { HomeStackNavigatorParamList, DriverReachRestaurantScreenRouteProp } from "@navigators"
import {
  Button,
  ContentContainer,
  HomeHeader,
  Loader,
  ReviewOrderButton,
  Screen,
  ScreenContainer,
  Text,
  TextField,
} from "@components"
import { colors, spacing, typography } from "@theme"
import { Divider } from "react-native-paper"
import { useFocusEffect, useRoute } from "@react-navigation/native"
import { useQuery } from "react-query"
import { getOrderDetails } from "@services"
import { PinIcon, RedPin } from "@assets"

export const OrderDetailsScreen: FC<StackScreenProps<HomeStackNavigatorParamList, "OrderDetails">> =
  observer(function OrderDetailsScreen() {
    const {
      params: { orderTravelId },
    } = useRoute<DriverReachRestaurantScreenRouteProp>()
    const {
      data: orderData,
      isLoading,
      refetch,
      remove,
    } = useQuery(`getOrderDetails${orderTravelId}`, () => getOrderDetails(orderTravelId))
    useFocusEffect(
      React.useCallback(() => {
        refetch()
        return () => remove()
      }, [orderTravelId]),
    )
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    if (isLoading) {
      return <Loader isPageLoading />
    }

    return (
      <Screen style={$root} preset="scroll">
        <HomeHeader
          title="orderDetailsScreen.orderDetails"
          RightComponent={
            <ReviewOrderButton
              markedForReview={orderData?.data?.markedForReview}
              orderTravelId={orderTravelId}
            />
          }
        />
        <ContentContainer>
          <View style={$card}>
            <View style={$itemRow}>
              <Text style={$titleItem} tx="orderDetailsScreen.restaurantName" />
              <Text style={$valueItem} text={orderData?.data?.restaurantName} />
            </View>
            <Divider style={{ marginVertical: spacing.small }} />
            <View style={$itemRow}>
              <Text style={$titleItem} tx="orderDetailsScreen.restaurantPhoneNumber" />
              <Text style={$valueItem} text={orderData?.data?.restaurantPhoneNumber} />
            </View>
          </View>
          <View style={[$card, { marginTop: spacing.medium }]}>
            <View style={$itemRow}>
              <Text style={$titleItem} tx="orderDetailsScreen.customerName" />
              <Text style={$valueItem} text={orderData?.data?.customerName} />
            </View>
            <Divider style={{ marginVertical: spacing.small }} />
            <View style={$itemRow}>
              <Text style={$titleItem} tx="orderDetailsScreen.customerMobileNumber" />
              <Text style={$valueItem} text={orderData?.data?.customerMobileNumber} />
            </View>
            <Divider style={{ marginVertical: spacing.small }} />
            {orderData?.data?.customerMapLocation && (
              <>
                <View style={$itemRow}>
                  <Text style={$titleItem} tx="orderDetailsScreen.customerAddress" />
                  <Pressable
                    onPress={() =>
                      Linking.openURL(
                        `https://www.google.com/maps/search/?api=1&query=${orderData?.data?.customerMapLocation}`,
                      )
                    }
                    style={$onMapLocation}
                  >
                    <Text style={$onMapText} tx="common.onMap" />
                    <RedPin />
                  </Pressable>
                </View>
                <Divider style={{ marginVertical: spacing.small }} />
              </>
            )}
            <View style={$itemRow}>
              <Text style={$titleItem} tx="orderDetailsScreen.travelCost" />
              <Text
                style={[$valueItem, { color: colors.primary }]}
                text={`${orderData?.data?.travelCost} NIS`}
              />
            </View>
            <Divider style={{ marginVertical: spacing.small }} />
            <View style={$itemRow}>
              <Text style={$titleItem} tx="orderDetailsScreen.paidAmount" />
              <Text
                style={[$valueItem, { color: colors.primary }]}
                text={`${orderData?.data?.paidAmount} NIS`}
              />
            </View>
            <Divider style={{ marginVertical: spacing.small }} />
            <View style={$itemRow}>
              <Text style={$titleItem} tx="orderDetailsScreen.total" />
              <Text
                style={[$valueItem, { color: colors.primary }]}
                text={`${orderData?.data?.total} NIS`}
              />
            </View>
            <Divider style={{ marginVertical: spacing.small }} />
            <View style={$itemRow}>
              <Text style={$titleItem} tx="orderDetailsScreen.paymentType" />
              <Text style={$valueItem} text={orderData?.data?.paymentType} />
            </View>
          </View>
        </ContentContainer>
      </Screen>
    )
  })

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.neutral100,
}

const $card: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderRadius: spacing.small,
  paddingHorizontal: spacing.small,
  paddingVertical: spacing.medium,
  width: "100%",
}
const $buttonContainer: ViewStyle = {
  paddingHorizontal: spacing.medium + 4,
  marginBottom: spacing.medium + 1,
  paddingTop: spacing.medium + 2,
  width: "100%",
}
const $itemRow: ViewStyle = {
  justifyContent: "space-between",
  flexDirection: "row",
  alignItems: "center",
}

const $titleItem: TextStyle = {
  fontFamily: typography.primary.medium,
  fontSize: 16,
  color: "#707070",
}

const $valueItem: TextStyle = {
  fontFamily: typography.primary.medium,
  fontSize: 14,
}

const $onMapLocation: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 8,
  backgroundColor: colors.palette.angry300,
}

const $onMapText: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 12,
  marginRight: spacing.tiny,
  color: colors.primary,
}
