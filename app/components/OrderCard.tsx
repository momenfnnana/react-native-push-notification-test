import * as React from "react"
import {
  I18nManager,
  Pressable,
  StyleProp,
  TextStyle,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "../theme"
import { Text } from "./Text"
import moment from "moment"
import { EditIcon, OrderBoxIcon, WhatsappIcon } from "../../assets/icons"
import { useNavigation } from "@react-navigation/native"
import { OrderScreenNavigationProp } from "navigators"

export interface OrderCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  orderName: string
  clientNo: string
  costAndFees: string
  orderStatus: string
  orderNumber: number
  orderDate?: Date
  onPressCard?: (pro: any) => void
}

/**
 * Describe your component here
 */
export const OrderCard = observer(function OrderCard(props: OrderCardProps) {
  const { width } = useWindowDimensions()
  const { navigate } = useNavigation<OrderScreenNavigationProp>()
  const {
    onPressCard,
    style,
    orderName,
    orderNumber,
    orderDate,
    clientNo,
    costAndFees,
    orderStatus,
  } = props
  const $styles = [$container, { width: width - 32 }, style]

  return (
    <Pressable onPress={onPressCard} style={$styles}>
      <View style={$header}>
        <View style={$orderTitleContainer}>
          <View style={$orderBoxContainer}>
            <OrderBoxIcon />
          </View>
          <Text style={$orderTitle}>{orderName}</Text>
        </View>
        <Text style={$orderDate}>{moment(orderDate).format("DD/MM/YYYY")}</Text>
      </View>
      <View style={$content}>
        <View style={$column}>
          <Text style={$colTitle} tx={"common.clientNo"} />
          <Text style={$colValue}>{clientNo}</Text>
        </View>
        <View style={$column}>
          <Text style={$colTitle} tx={"common.costAndFees"} />
          <Text style={$colValue}>{costAndFees}</Text>
        </View>
        <View style={$column}>
          <Text style={$colTitle} tx={"common.orderNo"} />
          <Text style={$colValue}>{orderNumber}</Text>
        </View>
      </View>
      <View style={$footer}>
        <View>
          <Text style={$colTitle} tx={"common.orderStatus"} />
          <Text style={[$colValue, { color: colors.accepted }]}>{orderStatus}</Text>
        </View>
        <View style={$buttonsContainer}>
          <Pressable
            style={[
              $button,
              { backgroundColor: colors.primary + "20", marginRight: spacing.extraSmall },
            ]}
          >
            <EditIcon />
          </Pressable>
          <Pressable style={[$button, { backgroundColor: colors.accepted + "20" }]}>
            <WhatsappIcon />
          </Pressable>
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

const $buttonsContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $column: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
}

const $button: ViewStyle = {
  padding: spacing.extraSmall,
  borderRadius: 6,
}

const $orderTitleContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $orderBoxContainer: ViewStyle = {
  padding: 10,
  backgroundColor: colors.background,
  borderRadius: spacing.small,
  marginRight: spacing.extraSmall,
}

const $orderTitle: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 15,
}

const $orderDate: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 15,
  color: "#707070",
}

const $colTitle: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 15,
  color: "#707070",
  textTransform: "capitalize",
}

const $colValue: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 15,
}
