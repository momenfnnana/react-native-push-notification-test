import * as React from "react"
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "../theme"
import { Text } from "./Text"
import { RedPin } from "@assets"
import { Button } from "./Button"
import { Modal } from "./Modal"
import { useMutation, useQueryClient } from "react-query"
import { acceptOrder, NewTrip } from "@services"
import { useNavigation } from "@react-navigation/native"
import { HomeScreenNavigationProp } from "navigators/HomeStackNavigator"

export interface NewTripCardProps extends NewTrip {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

type IContent = {
  preset?: "normal" | "popup"
}
/**
 * Describe your component here
 */
export const NewTripCard = observer(function NewTripCard(props: NewTripCardProps) {
  const {
    style,
    restaurantName,
    paymentTypeName,
    restaurantAddress,
    customerAddress,
    orderTravelId,
  } = props
  const { width } = useWindowDimensions()
  const { navigate } = useNavigation<HomeScreenNavigationProp>()
  const $styles = [$container, { width: width - 32 }, style]
  const [isConfirmModalOpen, setIsConfirmModalOpen] = React.useState<boolean>(false)
  const queryClient = useQueryClient()
  const { mutate: mutateAcceptOrder } = useMutation(acceptOrder, {
    onSuccess: (data, { IsAccepted }) => {
      closeConfirmModal()
      if (IsAccepted) {
        navigate("DriverReachRestaurant", {
          orderTravelId,
        })
      } else {
        queryClient.invalidateQueries({ queryKey: ['getNewTrips'] })
      }
    },
  })

  const onConfirmOrder = (IsAccepted: boolean) => {
    mutateAcceptOrder({
      IsAccepted,
      OrderTravelId: orderTravelId,
    })
  }

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false)
  }

  const openConfirmModal = () => {
    setIsConfirmModalOpen(true)
  }

  const Content = ({ preset = "normal" }: IContent) => {
    return (
      <View style={$styles}>
        <View style={$header}>
          <View style={$row}>
            <Text style={$restaurantName} tx="homeScreen.newTripCard.title" />
            <Text style={$restaurantNameValue}> {`(${restaurantName})`}</Text>
          </View>
          <View style={$paymentType}>
            <Text style={$paymentTypeText} text={paymentTypeName} />
          </View>
        </View>
        <Text style={$textTitle} tx="homeScreen.newTripCard.receipt" />
        <View style={$row}>
          <RedPin />
          <Text style={$textValue}>{restaurantAddress}</Text>
        </View>
        <Text style={$textTitle} tx="homeScreen.newTripCard.delivery" />
        <View style={$row}>
          <RedPin />
          <Text style={$textValue}>{customerAddress}</Text>
        </View>
        {preset === "normal" ? (
          <Button
            preset="filled"
            style={{ backgroundColor: colors.accepted, marginTop: spacing.medium }}
            tx="homeScreen.newTripCard.acceptBtn"
            onPress={openConfirmModal}
          />
        ) : (
          <View style={[$row, { justifyContent: "space-between" }]}>
            <Button
              preset="filled"
              style={{ backgroundColor: colors.accepted, marginTop: spacing.medium, flex: 0.48 }}
              tx="homeScreen.newTripCard.acceptBtn"
              onPress={() => onConfirmOrder(true)}
            />
            <Button
              preset="filled"
              style={{
                backgroundColor: colors.palette.reject,
                marginTop: spacing.medium,
                flex: 0.48,
              }}
              tx="homeScreen.newTripCard.rejectBtn"
              onPress={() => onConfirmOrder(false)}
            />
          </View>
        )}
      </View>
    )
  }

  return (
    <>
      <Modal isVisible={isConfirmModalOpen} onBackdropPress={closeConfirmModal}>
        <Content preset="popup" />
      </Modal>
      <Content />
    </>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  backgroundColor: colors.palette.neutral100,
  borderRadius: spacing.medium,
  marginTop: spacing.small,
  padding: spacing.small,
}

const $row: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
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

const $paymentType: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 8,
  backgroundColor: colors.background,
}

const $paymentTypeText: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 12,
  marginRight: spacing.tiny,
}

const $restaurantName: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 15,
}

const $restaurantNameValue: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 15,
  color: "#707070",
}

const $textTitle: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 13,
  color: "#707070",
}

const $textValue: TextStyle = {
  fontFamily: typography.primary.medium,
  fontSize: 15,
  marginLeft: spacing.extraSmall,
}
const styles = StyleSheet.create({
  modalContainer: {
    flex: 0.3,
    backgroundColor: colors.palette.neutral100,
    borderRadius: spacing.medium,
  },
})
