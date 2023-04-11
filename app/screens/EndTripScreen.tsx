import React, {FC, useCallback, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Platform,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {EndTripScreenNavigationProp, EndTripScreenRouteProp} from '@navigators';
import {
  Button,
  ContentContainer,
  HomeHeader,
  ReviewOrderButton,
  Screen,
  ScreenContainer,
  Text,
  TextField,
  ViewMapButton,
} from '@components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation} from 'react-query';
import {EndTrip} from '@services';
import {colors, spacing, typography} from '@theme';
import {Divider} from 'react-native-paper';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {translate} from '@i18n';

export interface EndTripFormInputs {
  paidAmount: number | string;
}

export const EndTripScreen: FC<EndTripScreenRouteProp> = observer(
  function EndTripScreen() {
    const {navigate} = useNavigation<EndTripScreenNavigationProp>();
    const {params: orderData} = useRoute<EndTripScreenRouteProp>();
    const {mutate, isLoading: isSubmitLoading} = useMutation(EndTrip, {
      onSuccess: () => {
        navigate('OrderDetails', orderData);
      },
    });
    const onConfirmHandler = useCallback(
      (values: EndTripFormInputs) => {
        mutate({
          OrderTravelId: orderData.orderTravelId.toString(),
          PaidAmount: values.paidAmount.toString(),
          TravelCost: orderData.travelCost.toString(),
          TravelDistance: '',
          TravelEndTime: new Date().toISOString(),
        });
      },
      [orderData.orderTravelId],
    );

    const validationSchema = Yup.object().shape({
      paidAmount: Yup.string().required(translate('validation.required')),
    });
    const {values, handleChange, handleBlur, handleSubmit, errors, touched} =
      useFormik<EndTripFormInputs>({
        initialValues: {
          paidAmount: '',
        },
        onSubmit: onConfirmHandler,
        validationSchema,
      });
    return (
      <Screen style={$root} preset="scroll">
        <HomeHeader
          RightComponent={
            <ReviewOrderButton
              markedForReview={orderData?.markedForReview}
              orderTravelId={orderData.orderTravelId}
            />
          }
          title="orderDetailsScreen.orderDetails"
        />
        <ContentContainer>
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
              <Text style={$valueItem} text={orderData?.customerMobileNumber} />
            </View>
            <Divider style={{marginVertical: spacing.small}} />
            {orderData?.customerMapLocation && (
              <>
                <View style={$itemRow}>
                  <Text
                    style={$titleItem}
                    tx="orderDetailsScreen.customerAddress"
                  />
                  <ViewMapButton
                    onPress={() =>
                      Linking.openURL(
                        `https://www.google.com/maps/search/?api=1&query=${orderData?.customerMapLocation}`,
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
          <View style={[$card, {marginTop: spacing.medium}]}>
            <TextField
              labelTx="orderDetailsScreen.paidAmount"
              value={values.paidAmount.toString()}
              onChangeText={handleChange('paidAmount')}
              onBlur={handleBlur('paidAmount')}
              autoCapitalize="none"
              status={
                touched.paidAmount && errors.paidAmount ? 'error' : undefined
              }
              helper={touched.paidAmount && errors.paidAmount}
            />
          </View>
          <Button
            preset="filled"
            tx={'common.submit'}
            style={{marginTop: spacing.massive, width: '100%'}}
            isLoading={isSubmitLoading}
            onPress={() => handleSubmit()}
          />
        </ContentContainer>
      </Screen>
    );
  },
);

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.neutral100,
};

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
