import {loadString} from './storage';

export const readAccessToken = async () => {
  const token = await loadString('accessToken');
  return token;
};

export const readLanguage = async () => {
  const languageId = await loadString('languageId');
  return languageId;
};
