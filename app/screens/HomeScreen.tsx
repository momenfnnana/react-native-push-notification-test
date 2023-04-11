import React, {FC, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Pressable, TextStyle, View, ViewStyle} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {colors, spacing, typography} from '@theme';
import {
  OrderCard,
  StatisticsCard,
  ContentContainer,
  HomeHeader,
  Screen,
  HeadingSection,
  Text,
  SearchInput,
  Devider,
  HomeCard,
  NewTripCard,
  Loader,
  EmptyPage,
} from '@components';
import {
  HomeScreenNavigationProp,
  HomeStackNavigatorParamList,
} from '@navigators';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
import {getDashboard, getNewTrips} from '@services';
import {useDebouncedCallback} from 'use-debounce';
import {useStores} from '@models';

export const HomeScreen: FC<
  StackScreenProps<HomeStackNavigatorParamList, 'Home'>
> = observer(function HomeScreen() {
  const {navigate} = useNavigation<HomeScreenNavigationProp>();
  const [activeButton, setActiveButton] = useState<string>('dashboard');
  const [searchText, setSearchText] = useState<string>('');
  const {
    authenticationStore: {accessToken},
  } = useStores();

  const buttonStyle = [$button, $buttonActive];
  const {
    isLoading,
    data: dashboardData,
    refetch: refetchDashboard,
  } = useQuery('getDashboard', () => getDashboard(searchText), {
    onSuccess: data => {
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
    debounced();
  }, [searchText]);

  useEffect(() => {
    if (activeButton === 'dashboard') {
      refetchDashboard();
    } else {
      refetchNewTrips();
    }
  }, [activeButton]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     refetchNewTrips();
  //     refetchDashboard();
  //     return () => {};
  //   }, []),
  // );

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
