import i18n from 'i18n-js';
import {I18nManager} from 'react-native';

// if English isn't your default language, move Translations to the appropriate language file.
import en, {Translations} from './en';
import ar from './ar';
import {loadString} from '@utils';
import RNRestart from 'react-native-restart';

i18n.fallbacks = true;
/**
 * we need always include "*-US" for some valid language codes because when you change the system language,
 * the language code is the suffixed with "-US". i.e. if a device is set to English ("en"),
 * if you change to another language and then return to English language code is now "en-US".
 */
i18n.translations = {ar, en, 'en-US': en};
export const enLanguageKey = 'en-US';
export const arLanguageKey = 'ar-US';

// handle RTL languages
export const isRTL = i18n.locale === arLanguageKey;

loadString('language').then(async language => {
  console.log({language});
  i18n.locale = language || enLanguageKey;
  let isRTL = i18n.locale === arLanguageKey;
  await I18nManager.allowRTL(isRTL);
  await I18nManager.forceRTL(isRTL);
  if (isRTL && !I18nManager.isRTL) {
    RNRestart.restart();
  }
});

/**
 * Builds up valid keypaths for translations.
 */
export type TxKeyPath = RecursiveKeyOf<Translations>;

// via: https://stackoverflow.com/a/65333050
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfHandleValue<
  TValue,
  Text extends string,
> = TValue extends any[]
  ? Text
  : TValue extends object
  ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
  : Text;
