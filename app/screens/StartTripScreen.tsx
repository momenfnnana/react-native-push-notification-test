import React, {FC, useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {Linking, TextStyle, View, ViewStyle} from 'react-native';
import {
  StartTripScreenNavigationProp,
  StartTripScreenRouteProp,
} from '@navigators';
import {
  ContentContainer,
  ReviewOrderButton,
  ScreenContainer,
  Text,
  ViewMapButton,
} from '@components';
import {useRoute} from '@react-navigation/native';
import {useMutation} from 'react-query';
import {startTrip} from '@services';
import {Divider} from 'react-native-paper';
import {colors, spacing, typography} from '@theme';
import {useNavigation} from '@react-navigation/native';

export const StartTripScreen: FC<StartTripScreenRouteProp> = observer(
  function StartTripScreen() {
    const {navigate} = useNavigation<StartTripScreenNavigationProp>();
    const {params: orderData} = useRoute<StartTripScreenRouteProp>();
    const {mutate, isLoading: isSubmitLoading} = useMutation(startTrip, {
      onSuccess: () => {
        navigate('DriverReachCustomer', orderData);
      },
    });
    const onConfirmHandler = useCallback(() => {
      mutate({
        OrderTravelId: orderData.orderTravelId,
        TravelStartTime: new Date().toISOString(),
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
        submiteTx="orderDetailsScreen.startTrip"
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
              <Text style={$titleItem} tx="orderDetailsScreen.paymentType" />
              <Text style={$valueItem} text={orderData?.paymentType} />
            </View>
          </View>
        </ContentContainer>
      </ScreenContainer>
    );
  },
);

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
