import * as React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {observer} from 'mobx-react-lite';
import {Modal} from './Modal';
import {NewTrip} from '@services';
import {OrderCardContent} from './CardOrderContent';

export interface NewTripCardProps extends NewTrip {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * Describe your component here
 */
export const NewTripCard = observer(function NewTripCard(
  props: NewTripCardProps,
) {
  const {
    style,
    restaurantName,
    paymentTypeName,
    restaurantAddress,
    customerAddress,
    orderTravelId,
  } = props;

  const [isConfirmModalOpen, setIsConfirmModalOpen] =
    React.useState<boolean>(false);

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  return (
    <>
      <Modal isVisible={isConfirmModalOpen} onBackdropPress={closeConfirmModal}>
        <OrderCardContent
          {...{
            customerAddress,
            openConfirmModal,
            paymentTypeName,
            restaurantAddress,
            restaurantName,
            style,
            preset: 'popup',
            id: orderTravelId,
            closeConfirmModal,
          }}
        />
      </Modal>
      <OrderCardContent
        {...{
          customerAddress,
          openConfirmModal,
          paymentTypeName,
          restaurantAddress,
          restaurantName,
          style,
          id: orderTravelId,
          closeConfirmModal,
        }}
      />
    </>
  );
});
