import React, { FC, useCallback } from "react"
import { observer } from "mobx-react-lite"
import { Linking, TextStyle, View, ViewStyle } from "react-native"
import { DriverReachRestaurantScreenNavigationProp, OrderDetailsScreenRouteProp } from "@navigators"
import {
  ContentContainer,
  Loader,
  ReviewOrderButton,
  ScreenContainer,
  Text,
  ViewMapButton,
} from "@components"
import { Divider } from "react-native-paper"
import { colors, spacing, typography } from "@theme"
import { useFocusEffect, useRoute } from "@react-navigation/native"
import { useMutation, useQuery } from "react-query"
import { DriverReachRestaurant, getOrderDetails } from "@services"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "@models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `DriverReachRestaurant: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="DriverReachRestaurant" component={DriverReachRestaurantScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const DriverReachRestaurantScreen: FC<DriverReachRestaurantScreenNavigationProp> = observer(
  function DriverReachRestaurantScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    const { navigate } = useNavigation<DriverReachRestaurantScreenNavigationProp>()
    const {
      params: { orderTravelId },
    } = useRoute<OrderDetailsScreenRouteProp>()
    const {
      data: orderData,
      isLoading,
      refetch,
      remove,
    } = useQuery(`getOrderDetails${orderTravelId}`, () => getOrderDetails(orderTravelId))
    const { mutate, isLoading: isSubmitLoading } = useMutation(DriverReachRestaurant, {
      onSuccess: () => {
        navigate("StartTrip", orderData.data)
      },
    })
    const onConfirmHandler = useCallback(() => {
      mutate({
        OrderTravelId: orderTravelId,
      })
    }, [orderTravelId])

    useFocusEffect(
      React.useCallback(() => {
        refetch()
        return () => remove()
      }, [orderTravelId]),
    )
    if (isLoading) {
      return <Loader isPageLoading />
    }
    return (
      <ScreenContainer
        title="orderDetailsScreen.orderDetails"
        withSubmit
        rightComponent={
          <ReviewOrderButton
            markedForReview={orderData?.data?.markedForReview}
            orderTravelId={orderTravelId}
          />
        }
        submiteTx="orderDetailsScreen.reachStartPoint"
        onSubmit={onConfirmHandler}
        isSubmitLoading={isSubmitLoading}
      >
        <ContentContainer style={{ padding: 0 }}>
          <View style={$card}>
            <View style={$itemRow}>
              <Text style={$titleItem} tx="orderDetailsScreen.restaurantName" />
              <Text style={$valueItem} text={orderData?.data?.restaurantName} />
            </View>
            <Divider style={{ marginVertical: spacing.small }} />
            <View style={$itemRow}>
              <Text style={$titleItem} tx="orderDetailsScreen.restaurantAddress" />
              <Text style={$valueItem} text={orderData?.data?.restaurantAddress} />
            </View>
            <Divider style={{ marginVertical: spacing.small }} />
            {orderData?.data?.restaurantMapLocation && (
              <>
                <View style={$itemRow}>
                  <Text style={$titleItem} tx="orderDetailsScreen.restaurantMapLocation" />
                  <ViewMapButton
                    onPress={() =>
                      Linking.openURL(
                        `https://www.google.com/maps/search/?api=1&query=${orderData?.data?.restaurantMapLocation}`,
                      )
                    }
                  />
                </View>
                <Divider style={{ marginVertical: spacing.small }} />
              </>
            )}
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
            <View style={$itemRow}>
              <Text style={$titleItem} tx="orderDetailsScreen.paymentType" />
              <Text style={$valueItem} text={orderData?.data?.paymentType} />
            </View>
          </View>
        </ContentContainer>
      </ScreenContainer>
    )
  },
)

const $card: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderRadius: spacing.small,
  paddingHorizontal: spacing.small,
  paddingVertical: spacing.medium,
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
