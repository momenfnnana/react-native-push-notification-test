import {Instance, SnapshotOut, types} from 'mobx-state-tree';
import {saveString} from '@utils';

export const AuthenticationStoreModel = types
  .model('AuthenticationStore')
  .props({
    accessToken: types.maybe(types.string),
    authEmail: '',
    authPassword: '',
    locationPermission: false,
  })
  .views(store => ({
    get isAuthenticated() {
      return !!store.accessToken;
    },
    get validationErrors() {
      return {
        authEmail: (function () {
          if (store.authEmail.length === 0) return "can't be blank";
          if (store.authEmail.length < 6)
            return 'must be at least 6 characters';
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authEmail))
            return 'must be a valid email address';
          return '';
        })(),
        authPassword: (function () {
          if (store.authPassword.length === 0) return "can't be blank";
          if (store.authPassword.length < 6)
            return 'must be at least 6 characters';
          return '';
        })(),
      };
    },
  }))
  .actions(store => ({
    setAccessToken(value: string) {
      saveString('accessToken', value);
      store.accessToken = value;
    },
    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, '');
    },
    setAuthPassword(value: string) {
      store.authPassword = value.replace(/ /g, '');
    },
    setLocationPermission(value: boolean) {
      store.locationPermission = value;
    },
    logout() {
      store.accessToken = undefined;
      store.authEmail = '';
      store.authPassword = '';
    },
  }))
  .preProcessSnapshot(snapshot => {
    // remove sensitive data from snapshot to avoid secrets
    // being stored in AsyncStorage in plain text if backing up store
    const {accessToken, authPassword, ...rest} = snapshot; // eslint-disable-line @typescript-eslint/no-unused-vars

    // see the following for strategies to consider storing secrets on device
    // https://reactnative.dev/docs/security#storing-sensitive-info

    return rest;
  });

export interface AuthenticationStore
  extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot
  extends SnapshotOut<typeof AuthenticationStoreModel> {}

// @demo remove-file
