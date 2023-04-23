import React, {FC, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Pressable, TextStyle, View, ViewStyle} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {colors, spacing, typography} from '@theme';
import {
  ContentContainer,
  HomeHeader,
  Screen,
  Text,
  SearchInput,
  Devider,
  HomeCard,
  NewTripCard,
  Loader,
  EmptyPage,
  OrderCardContent,
  Modal,
} from '@components';
import {
  HomeScreenNavigationProp,
  HomeStackNavigatorParamList,
} from '@navigators';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
import {getDashboard, getNewTrips} from '@services';
import {useDebouncedCallback} from 'use-debounce';
import {useStores} from '@models';
import {useOrderModal} from '@hooks';

export const HomeScreen: FC<
  StackScreenProps<HomeStackNavigatorParamList, 'Home'>
> = observer(function HomeScreen() {
  const {navigate} = useNavigation<HomeScreenNavigationProp>();
  const [activeButton, setActiveButton] = useState<string>('dashboard');
  const [searchText, setSearchText] = useState<string>('');
  const {
    authenticationStore: {accessToken},
    userStoreModel: {orderId},
  } = useStores();

  const {
    showOrderModal,
    hideOrderModal,
    isShown: isOrderShown,
    isLoading: isLoadingOrder,
    data: orderData,
  } = useOrderModal(orderId);

  const buttonStyle = [$button, $buttonActive];
  const {
    isLoading,
    data: dashboardData,
    refetch: refetchDashboard,
  } = useQuery('getDashboard', () => getDashboard(searchText), {
    onSuccess: data => {
      console.log({data: data.data.dashboardCaptain});
      return data;
    },
  });
  const {
    data: tripsData,
    isLoading: isLoadingTrips,
    refetch: refetchNewTrips,
  } = useQuery('getNewTrips', () => getNewTrips(''), {enabled: false});
  const debounced = useDebouncedCallback(() => {
    refetchDashboard();
  }, 1000);

  useEffect(() => {
    if (orderId) showOrderModal();
  }, [orderId]);

  useEffect(() => {
    debounced();
  }, [searchText]);

  useEffect(() => {
    if (activeButton === 'dashboard') {
      refetchDashboard();
    } else {
      refetchNewTrips();
    }
  }, [activeButton]);

  return (
    <Screen style={$root} preset="scroll">
      <HomeHeader
        title="homeScreen.title"
        balance={dashboardData?.data?.balance}
        hideBackIcon={true}
      />
      <View style={$buttonContainer}>
        <Pressable
          onPress={() => setActiveButton('delivered')}
          style={[$button, activeButton !== 'new' && $buttonActive]}>
          <Text
            tx="homeScreen.delivered"
            style={[$textButton, activeButton !== 'new' && $activeTextButton]}
          />
        </Pressable>
        <Pressable
          onPress={() => setActiveButton('new')}
          style={[$button, activeButton === 'new' && $buttonActive]}>
          <Text
            tx="homeScreen.newTrip"
            style={[$textButton, activeButton === 'new' && $activeTextButton]}
          />
        </Pressable>
      </View>
      <ContentContainer>
        {activeButton === 'new' ? (
          <>
            {isLoadingTrips ? (
              <Loader />
            ) : tripsData?.data?.newTrips?.length > 0 ? (
              tripsData?.data?.newTrips?.map((item, index) => (
                <NewTripCard key={index.toString()} {...item} />
              ))
            ) : (
              <EmptyPage title="emptyPage.newTrips" />
            )}
          </>
        ) : (
          <>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <SearchInput
                  onSubmitEditing={() => refetchDashboard()}
                  value={searchText}
                  onChangeText={setSearchText}
                  style={$search}
                  placeholder="homeScreen.searchPlaceholder"
                />
                <Devider
                  style={{
                    backgroundColor: colors.palette.neutral100,
                    marginVertical: spacing.medium,
                  }}
                />
                <>
                  {dashboardData?.data?.dashboardCaptain?.length > 0 ? (
                    dashboardData?.data?.dashboardCaptain.map((item, index) => (
                      <HomeCard key={index.toString()} {...item} />
                    ))
                  ) : (
                    <EmptyPage title="emptyPage.deliverd" />
                  )}
                </>
              </>
            )}
          </>
        )}
      </ContentContainer>
      <Modal isVisible={isOrderShown} onBackdropPress={hideOrderModal}>
        <OrderCardContent
          {...{
            customerAddress: orderData?.data.customerAddress,
            onConfirmOrder: () => {},
            openConfirmModal: () => {},
            paymentTypeName: orderData?.data?.paymentType,
            preset: 'popup',
            restaurantAddress: orderData?.data.restaurantAddress,
            restaurantName: orderData?.data.restaurantName,
            closeConfirmModal: hideOrderModal,
            id: orderId,
            isLoadingOrder,
          }}
        />
      </Modal>
    </Screen>
  );
});

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.neutral100,
};

const $search: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  width: '100%',
};

const $buttonContainer: ViewStyle = {
  flexDirection: 'row',
  backgroundColor: colors.palette.neutral200,
  marginHorizontal: spacing.medium,
  borderRadius: spacing.medium,
  marginVertical: spacing.medium,
};

const $button: ViewStyle = {
  flex: 1,
  borderRadius: spacing.medium,
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: spacing.medium,
};

const $buttonActive: ViewStyle = {
  backgroundColor: colors.primary,
};

const $textButton: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 16,
  color: colors.palette.neutral500,
};

const $activeTextButton: TextStyle = {
  color: colors.palette.neutral100,
};
