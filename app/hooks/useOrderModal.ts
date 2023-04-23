import React, {useEffect, useState} from 'react';
import {getOrderDetails} from '@services';
import {useQuery} from 'react-query';

export const useOrderModal = (orderId: string | number) => {
  const [isShown, setIsShown] = useState<boolean>();
  const showOrderModal = () => {
    setIsShown(true);
  };
  const hideOrderModal = () => {
    setIsShown(false);
  };
  const {
    refetch: refetchOrderDetails,
    isLoading,
    data,
  } = useQuery('getOrderDetails', () => getOrderDetails(orderId), {
    onSuccess: data => {
      showOrderModal();
      return data;
    },
    onError: data => {
      hideOrderModal();
      return data;
    },
  });
  useEffect(() => {
    if (isShown) refetchOrderDetails();
  }, [isShown]);
  return {
    showOrderModal,
    hideOrderModal,
    isShown,
    isLoading,
    data,
  };
};
