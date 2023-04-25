import {colors, spacing, typography} from '@theme';
import React from 'react';
import {View, ViewStyle, TextStyle, useWindowDimensions} from 'react-native';
import {Text, Button, Loader} from '@components';
import {RedPin} from '@assets';
import {useMutation, useQueryClient} from 'react-query';
import {acceptOrder} from '@services';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '@navigators';
import {useStores} from '@models';

type IContent = {
  preset?: 'normal' | 'popup';
  style?: ViewStyle;
  restaurantName?: string;
  paymentTypeName?: string;
  restaurantAddress?: string;
  customerAddress?: string;
  openConfirmModal?: () => void;
  closeConfirmModal?: () => void;
  id?: string | number;
  isLoadingOrder?: boolean;
};

export const OrderCardContent = ({
  preset = 'normal',
  style,
  restaurantName,
  paymentTypeName,
  restaurantAddress,
  customerAddress,
  openConfirmModal,
  closeConfirmModal,
  id,
  isLoadingOrder,
}: IContent) => {
  const {navigate} = useNavigation<HomeScreenNavigationProp>();
  const {width} = useWindowDimensions();
  const $container: ViewStyle = {
    justifyContent: 'center',
    backgroundColor: colors.palette.neutral100,
    borderRadius: spacing.medium,
    marginTop: spacing.small,
    padding: spacing.small,
  };

  const $row: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
  };

  const $header: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.extraSmall,
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
    marginBottom: spacing.small,
  };

  const $paymentType: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: colors.background,
  };

  const $paymentTypeText: TextStyle = {
    fontFamily: typography.primary.normal,
    fontSize: 12,
    marginRight: spacing.tiny,
  };

  const $restaurantName: TextStyle = {
    fontFamily: typography.primary.bold,
    fontSize: 15,
  };

  const $restaurantNameValue: TextStyle = {
    fontFamily: typography.primary.bold,
    fontSize: 15,
    color: '#707070',
  };

  const $textTitle: TextStyle = {
    fontFamily: typography.primary.bold,
    fontSize: 13,
    color: '#707070',
  };

  const $textValue: TextStyle = {
    fontFamily: typography.primary.medium,
    fontSize: 15,
    marginLeft: spacing.extraSmall,
  };

  const $styles = [$container, {width: width - 32}, style];
  const queryClient = useQueryClient();
  console.log({id});
  const {
    userStoreModel: {setNotificationOrderId},
  } = useStores();
  const {mutate: mutateAcceptOrder} = useMutation(acceptOrder, {
    onSuccess: (data, {IsAccepted}) => {
      closeConfirmModal?.();
      setNotificationOrderId('');
      if (data.data.isAccepted) {
        // @ts-ignore
        navigate('DriverReachRestaurant', {
          orderTravelId: id,
        });
      } else {
        queryClient.invalidateQueries('getNewTrips');
      }
    },
    onError: () => {
      closeConfirmModal?.();
      setNotificationOrderId('');
    },
  });
  const onConfirmOrder = (IsAccepted: boolean) => {
    if (id) {
      mutateAcceptOrder({
        IsAccepted,
        OrderTravelId: id,
      });
    }
  };
  if (isLoadingOrder) return <Loader size={'small'} />;
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
      {preset === 'normal' ? (
        <Button
          preset="filled"
          style={{
            backgroundColor: colors.accepted,
            marginTop: spacing.medium,
          }}
          tx="homeScreen.newTripCard.acceptBtn"
          onPress={openConfirmModal}
        />
      ) : (
        <View style={[$row, {justifyContent: 'space-between'}]}>
          <Button
            preset="filled"
            style={{
              backgroundColor: colors.accepted,
              marginTop: spacing.medium,
              flex: 0.48,
            }}
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
  );
};
