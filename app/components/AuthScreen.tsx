import * as React from 'react';
import {
  ImageBackground,
  StyleProp,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {colors, spacing} from '../theme';
import {Screen} from './Screen';
import AuthBackground from '../../assets/images/authBackground.png';
import {useSafeAreaInsetsStyle} from '../utils/useSafeAreaInsetsStyle';

export interface AuthScreenProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;
  children: React.ReactElement[] | React.ReactElement;
}

/**
 * Describe your component here
 */
export const AuthScreen = observer(function AuthScreen(props: AuthScreenProps) {
  const {style, children} = props;
  const {height, width} = useWindowDimensions();
  const $styles = [$root, style];
  const $containerInsets = useSafeAreaInsetsStyle(['top']);
  return (
    <Screen style={$styles} preset="scroll">
      <ImageBackground
        style={[
          {height, width, paddingHorizontal: spacing.medium},
          $containerInsets,
        ]}
        source={AuthBackground}>
        {children}
      </ImageBackground>
    </Screen>
  );
});

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.transparent,
};
