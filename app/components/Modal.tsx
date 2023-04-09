import * as React from "react"
import { StyleProp, View, ViewStyle, StyleSheet, ImageBackground, Image } from "react-native"
import { observer } from "mobx-react-lite"
import RNModal, { ModalProps as RNModalProps } from "react-native-modal"
import { Text } from "./Text"
import { TxKeyPath } from "@i18n"
import { IOrder } from "@services"
import { colors, spacing } from "@theme"
import { faildOrderScane, orderImage } from "@assets"
import { Button } from "./Button"

export interface ModalProps extends Partial<RNModalProps> {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  preset?: "default" | "fixed"
  order?: IOrder
  isConfirmed?: boolean
}
const OrderImageContainerSize = 154
/**
 * Describe your component here
 */
export const Modal = observer(function Modal(props: ModalProps) {
  const { style, children, preset = "default", order, isConfirmed } = props
  if (preset === "fixed") {
    return (
      <RNModal style={[styles.container, style]} {...props}>
        <View style={styles.fixedContainer}>
          <Text
            preset="bold"
            tx={isConfirmed ? "scanQr.qr-scanned" : "scanQr.qr-scanned-error"}
            size="md"
            style={styles.flexModalTitle}
          />
          <ImageBackground
            source={isConfirmed ? orderImage : faildOrderScane}
            style={styles.orderContainerImage}
          >
            <Image
              source={order.orderImage}
              style={{ resizeMode: "contain", width: 80, height: 80, borderRadius: 80 / 2 }}
            />
          </ImageBackground>
          <Text text={order.orderName} preset="bold" style={{ textAlign: "center" }} />
          <Text
            tx="scanQr.check-order"
            preset="default"
            style={{ textAlign: "center", color: colors.defult }}
          />
          <View style={styles.btnsContainer}>
            <Button tx={isConfirmed ? "scanQr.see-orders" : "scanQr.scan-again"} />
            <Button
              tx={isConfirmed ? "scanQr.scan-new-order" : "scanQr.return-to-orders"}
              preset="filled"
              style={styles.btn}
            />
          </View>
        </View>
      </RNModal>
    )
  }
  return (
    <RNModal style={[styles.container, style]} {...props}>
      {children}
    </RNModal>
  )
})

const styles = StyleSheet.create({
  container: {},
  fixedContainer: {
    flex: 0.7,
    backgroundColor: colors.palette.neutral150,
    borderRadius: spacing.extraLarge,
  },
  orderContainerImage: {
    width: OrderImageContainerSize,
    height: OrderImageContainerSize,
    alignSelf: "center",
    marginTop: spacing.large - 3,
    justifyContent: "center",
    alignItems: "center",
  },
  flexModalTitle: {
    color: colors.palette.neutral750,
    textAlign: "center",
    paddingHorizontal: spacing.huge,
    paddingTop: spacing.large - 4,
  },
  btnsContainer: {
    paddingHorizontal: spacing.large,
  },
  btn: {
    marginTop: spacing.small,
  },
})
