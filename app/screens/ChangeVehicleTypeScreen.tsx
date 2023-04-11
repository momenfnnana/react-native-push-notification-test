import React, {FC, useEffect, useRef, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import { ProfileStackNavigatorParamList} from '@navigators';
import {
  Button,
  ContentContainer,
  HomeHeader,
  Loader,
  Screen,
  Text,
  TextField,
} from '@components';
import SelectDropdown from 'react-native-select-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, spacing} from '@theme';
import {translate} from '@i18n';
import {InfoSection} from './ProfileScreen/components';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {
  DetailsLookup,
  editCaptainCar,
  EditCaptainCarBody,
  getCaptainCar,
  getCarTypes,
} from '@services';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {useFormik} from 'formik';

export const ChangeVehicleTypeScreen: FC<
  StackScreenProps<ProfileStackNavigatorParamList, 'ChangeVehicleScreen'>
> = observer(function ChangeVehicleTypeScreen() {
  const [stateSelected, setStateSelected] = useState<DetailsLookup>();
  const {isLoading: isLoadingGetCarTypes, data: dataCarTypes} = useQuery(
    'getCarTypes',
    getCarTypes,
  );

  const navigation = useNavigation();
  const ref = useRef<any>();
  const queryClient = useQueryClient();

  const {mutate, isLoading} = useMutation(editCaptainCar, {
    onSuccess(data) {
      queryClient.invalidateQueries('getProfile');
      navigation.goBack();
    },
  });

  const initialValues: EditCaptainCarBody = {
    CarId: '',
    Name: '',
    CarNumber: '',
  };

  const validationSchema = Yup.object().shape({
    Name: Yup.string().required(translate('validation.required')),
    CarNumber: Yup.string().required(translate('validation.required')),
  });
  const onSubmitHandler = (values: EditCaptainCarBody) => {
    mutate({...values, CarId: stateSelected.id.toString()});
  };
  const {
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    errors,
    handleSubmit,
    touched,
  } = useFormik<EditCaptainCarBody>({
    initialValues,
    onSubmit: onSubmitHandler,
    validationSchema,
  });

  const {isLoading: isLoadingGetCaptainCar, data: dataCaptainCar} = useQuery(
    'getCaptainCar',
    getCaptainCar,
    {
      onSuccess(data) {
        setFieldValue('Name', data.data.name);
        setFieldValue('CarNumber', data.data.carNumber);
      },
    },
  );

  useEffect(() => {
    if (dataCarTypes?.data?.detailsLookup.length > 0) {
      const carTypeSelected = dataCarTypes.data.detailsLookup.find(
        i => i.id === dataCaptainCar?.data?.carId,
      );
      if (carTypeSelected) {
        setStateSelected({...carTypeSelected});
      }
    }
  }, [dataCarTypes?.data?.detailsLookup, dataCaptainCar?.data]);

  if (isLoadingGetCarTypes || isLoadingGetCaptainCar) {
    return <Loader isPageLoading />;
  }

  return (
    <Screen style={styles.container} preset="scroll">
      <HomeHeader title="changeVehicleScreen.title" />
      <ContentContainer style={styles.contentContainer}>
        <InfoSection containerStyle={styles.contentContainer}>
          <SelectDropdown
            ref={ref}
            defaultButtonText={
              stateSelected?.name || translate('CaptainListScreen.title')
            }
            renderDropdownIcon={() => (
              <MaterialIcons
                name={`keyboard-arrow-down`}
                size={18}
                color={colors.palette.neutral900}
              />
            )}
            data={dataCarTypes.data.detailsLookup}
            buttonStyle={styles.dropDownButtonStyle}
            renderCustomizedRowChild={(item: DetailsLookup) => (
              <View
                key={item?.id?.toString()}
                style={styles.dropdownItemContainer}>
                <Text>{item?.name}</Text>
              </View>
            )}
            onSelect={(item: DetailsLookup) => {
              setStateSelected({...item});
            }}
            buttonTextAfterSelection={selectedItem => {
              return selectedItem.name;
            }}
            rowTextForSelection={(item: any) => item}
          />

          <TextField
            containerStyle={{marginTop: spacing.medium}}
            labelTx="labelForm.vehicle-brand"
            value={values.Name}
            onChangeText={handleChange('Name')}
            onBlur={handleBlur('Name')}
            status={touched.Name && errors.Name ? 'error' : undefined}
            helper={(touched.Name && errors.Name) || ''}
          />
          <TextField
            labelTx="labelForm.CarNumber"
            value={values.CarNumber}
            onChangeText={handleChange('CarNumber')}
            onBlur={handleBlur('CarNumber')}
            status={touched.CarNumber && errors.CarNumber ? 'error' : undefined}
            helper={(touched.CarNumber && errors.CarNumber) || ''}
          />
        </InfoSection>
        <View style={styles.submitBtnContainer}>
          <Button
            preset="filled"
            tx={'changePasswordScreen.title'}
            isLoading={isLoading}
            onPress={handleSubmit}
          />
        </View>
      </ContentContainer>
    </Screen>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.palette.neutral100,
  },
  contentContainer: {
    paddingTop: spacing.medium + 4,
  },
  dropDownButtonStyle: {
    paddingVertical: spacing.small,
    borderWidth: 1,
    borderColor: colors.palette.neutral300,
    borderRadius: spacing.small,
    backgroundColor: colors.palette.neutral100,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: spacing.extraSmall,
    width: '100%',
  },
  dropdownItemContainer: {
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: spacing.extraSmall,
  },
  submitBtnContainer: {
    paddingHorizontal: spacing.medium + 4,
    paddingTop: spacing.medium + 2,
    width: '100%',
  },
});
