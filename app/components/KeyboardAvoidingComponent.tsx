import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {spacing} from '@theme';
import {Header} from './Header';
import {Button} from './Button';

const KeyboardAvoidingComponent = ({
  children,
  title,
  rightComponent,
  withSubmit,
  submiteTx,
  isSubmitLoading,
  onSubmit,
}: any) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.header}>
            <Header title={title} rightComponent={rightComponent} />
          </View>
          {children}
          {withSubmit && (
            <View style={styles.buttonContainer}>
              <Button
                preset="filled"
                tx={submiteTx ? submiteTx : 'common.submit'}
                isLoading={isSubmitLoading}
                onPress={onSubmit && onSubmit}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
  buttonContainer: {
    paddingHorizontal: spacing.medium + 4,
    marginBottom: spacing.medium + 1,
    paddingTop: spacing.medium + 2,
  },
});

export default KeyboardAvoidingComponent;
