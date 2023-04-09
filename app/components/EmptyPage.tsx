import * as React from 'react';
import {StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import {observer} from 'mobx-react-lite';
import {colors, typography} from '../theme';
import {Text} from './Text';
import {TxKeyPath} from 'i18n';

export interface EmptyPageProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;
  title: TxKeyPath;
}

/**
 * Describe your component here
 */
export const EmptyPage = observer(function EmptyPage(props: EmptyPageProps) {
  const {style, title} = props;
  const $styles = [$container, style];

  return (
    <View style={$styles}>
      <View style={$containText}>
        <Text style={{fontSize: 40, lineHeight: 50}}>☹️</Text>
        <Text style={$text} tx={title} />
      </View>
    </View>
  );
});

const $container: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
};

const $containText: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

const $text: TextStyle = {
  fontFamily: typography.primary.medium,
  fontSize: 18,
};
