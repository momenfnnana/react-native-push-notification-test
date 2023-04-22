import React, {FC, useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {Linking, TextStyle, View, ViewStyle} from 'react-native';
import {
  DriverReachCustomerScreenNavigationProp,
  DriverReachCustomerScreenRouteProp,
} from '@navigators';
import {
  ContentContainer,
  ReviewOrderButton,
  ScreenContainer,
  Text,
  ViewMapButton,
} from '@components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation} from 'react-query';
import {DriverReachCustomer} from '@services';
import {Divider} from 'react-native-paper';
import {colors, spacing, typography} from '@theme';

export const DriverReachCustomerScreen: FC<DriverReachCustomerScreenRouteProp> =
  observer(function DriverReachCustomerScreen() {
    const {navigate} = useNavigation<DriverReachCustomerScreenNavigationProp>();
    const {params: orderData} = useRoute<DriverReachCustomerScreenRouteProp>();
    const {mutate, isLoading: isSubmitLoading} = useMutation(
      DriverReachCustomer,
      {
        onSuccess: () => {
          navigate('EndTrip', orderData);
        },
      },
    );
    const onConfirmHandler = useCallback(() => {
      mutate({
        OrderTravelId: orderData.orderTravelId,
      });
    }, [orderData.orderTravelId]);

    return (
      <ScreenContainer
        title="orderDetailsScreen.orderDetails"
        withSubmit
        rightComponent={
          <ReviewOrderButton
            markedForReview={orderData?.markedForReview}
            orderTravelId={orderData.orderTravelId}
          />
        }
        submiteTx="orderDetailsScreen.reachEndPoint"
        onSubmit={onConfirmHandler}
        isSubmitLoading={isSubmitLoading}>
        <ContentContainer style={{padding: 0}}>
          <View style={$card}>
            <View style={$itemRow}>
              <Text style={$titleItem} tx="orderDetailsScreen.restaurantName" />
              <Text style={$valueItem} text={orderData?.restaurantName} />
            </View>
            <Divider style={{marginVertical: spacing.small}} />
            <View style={$itemRow}>
              <Text
                style={$titleItem}
                tx="orderDetailsScreen.restaurantPhoneNumber"
              />
              <Text
                style={$valueItem}
                text={orderData?.restaurantPhoneNumber}
              />
            </View>
          </View>
          <View style={[$card, {marginTop: spacing.medium}]}>
            <View style={$itemRow}>
              <Text style={$titleItem} tx="orderDetailsScreen.customerName" />
              <Text style={$valueItem} text={orderData?.customerName} />
            </View>
            <Divider style={{marginVertical: spacing.small}} />
            <View style={$itemRow}>
              <Text
                style={$titleItem}
                tx="orderDetailsScreen.customerMobileNumber"
              />
              <Text
                onPress={() =>
                  Linking.openURL(`tel:${orderData?.customerMobileNumber}`)
                }
                style={$valueItem}
                text={orderData?.customerMobileNumber}
              />
            </View>
            <Divider style={{marginVertical: spacing.small}} />
            {orderData?.restaurantMapLocation && (
              <>
                <View style={$itemRow}>
                  <Text
                    style={$titleItem}
                    tx="orderDetailsScreen.customerAddress"
                  />
                  <ViewMapButton
                    onPress={() =>
                      Linking.openURL(
                        `https://www.google.com/maps/search/?api=1&query=${orderData?.restaurantMapLocation}`,
                      )
                    }
                  />
                </View>
                <Divider style={{marginVertical: spacing.small}} />
              </>
            )}
            <View style={$itemRow}>
              <Text style={$titleItem} tx="orderDetailsScreen.travelCost" />
              <Text
                style={[$valueItem, {color: colors.primary}]}
                text={`${orderData?.travelCost} ₪`}
              />
            </View>
            <Divider style={{marginVertical: spacing.small}} />
            <View style={$itemRow}>
              <Text style={$titleItem} tx="orderDetailsScreen.paymentType" />
              <Text style={$valueItem} text={orderData?.paymentType} />
            </View>
          </View>
        </ContentContainer>
      </ScreenContainer>
    );
  });

const $card: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderRadius: spacing.small,
  paddingHorizontal: spacing.small,
  paddingVertical: spacing.medium,
  width: '100%',
};

const $itemRow: ViewStyle = {
  justifyContent: 'space-between',
  flexDirection: 'row',
  alignItems: 'center',
};

const $titleItem: TextStyle = {
  fontFamily: typography.primary.medium,
  fontSize: 16,
  color: '#707070',
};

const $valueItem: TextStyle = {
  fontFamily: typography.primary.medium,
  fontSize: 14,
};
