import * as React from 'react';
import {
  TouchableOpacityProps,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {colors, spacing, typography} from '@theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Text} from './Text';
import {Modal} from './Modal';
import {TextField} from './TextField';
import {Button} from './Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useMutation} from 'react-query';
import {MarkedForReview} from '@services';
export interface ReviewOrderProps extends TouchableOpacityProps {
  /**
   * An optional style override useful for padding & margin.
   */
  orderTravelId: string | number;
  markedForReview?: boolean;
}

/**
 * Describe your component here
 */
export const ReviewOrderButton = observer(function ReviewOrder(
  props: ReviewOrderProps,
) {
  const hasTopBarSpace = Platform.OS === 'ios' && StatusBar.currentHeight > 0;
  const {style, orderTravelId, markedForReview, ...rest} = props;
  const [isModalOpened, setIsModalOpened] = React.useState<boolean>(false);
  const [isEnabelReview, setEnabelReview] = React.useState<boolean>(
    markedForReview || false,
  );
  const [reviewReason, setReviewReason] = React.useState<string>('');
  const {bottom} = useSafeAreaInsets();
  const {mutate, isLoading} = useMutation(MarkedForReview, {
    onSuccess: () => {
      closeModal();
      setEnabelReview(true);
    },
  });

  const openModal = () => {
    setIsModalOpened(true);
  };
  const closeModal = () => {
    setIsModalOpened(false);
  };
  const onSubmitHandler = () => {
    mutate({
      MarkedForReview: true,
      Notes: reviewReason,
      OrderTravelId: orderTravelId,
    });
  };

  return !isEnabelReview ? (
    <>
      <TouchableOpacity
        style={[styles.container, style]}
        {...rest}
        onPress={openModal}>
        <Text style={styles.buttonText} tx="orderDetailsScreen.reviewOrder" />
      </TouchableOpacity>
      <Modal isVisible={isModalOpened} onBackdropPress={closeModal}>
        <View
          style={[
            styles.contentContainer,
            {paddingBottom: hasTopBarSpace ? bottom : spacing.medium + 4},
          ]}>
          <View style={styles.titleContainer}>
            <Text
              tx="common.select-language"
              style={styles.ModalTitle}
              preset="bold"
              size="md"
            />
            <AntDesign
              name="closecircle"
              color={colors.primary}
              onPress={closeModal}
              size={spacing.medium}
            />
          </View>
          <TextField
            labelTx="labelForm.review-reason"
            value={reviewReason}
            onChangeText={setReviewReason}
            autoCapitalize="none"
            multiline
          />
          <Button
            preset="filled"
            tx="forgetPasswordScreen.submitBtn"
            onPress={onSubmitHandler}
            isLoading={isLoading}
          />
        </View>
      </Modal>
    </>
  ) : (
    <></>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: spacing.extraSmall,
    backgroundColor: colors.palette.angry300,
    borderRadius: spacing.extraSmall,
  },
  buttonText: {
    fontFamily: typography.primary.bold,
    fontSize: 15,
    marginBottom: -3,
    color: colors.primary,
  },
  contentContainer: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: spacing.medium - 4,
    paddingTop: spacing.large,
    paddingHorizontal: spacing.medium + 4,
  },
  ModalTitle: {
    textAlign: 'left',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.extraLarge + 2,
  },
});
