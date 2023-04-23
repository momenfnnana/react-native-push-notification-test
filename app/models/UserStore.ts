import { types, Instance, SnapshotOut } from "mobx-state-tree"
import { UserInfo } from "@services"

export const UserStoreModel = types
  .model({
    driverId: types.optional(types.number || types.null, 0),
    detailsLookup: types.optional(types.number || types.null, 0),
    name: types.optional(types.string || types.null, ""),
    mobile: types.optional(types.string || types.null, ""),
    balance: types.optional(types.number || types.null, 0),
    vehicleType: types.optional(types.string || types.null, ""),
    carNumber: types.optional(types.string || types.null, ""),
    statusCode: types.optional(types.number || types.null, 0),
    message: types.optional(types.string || types.null, ""),
    redirectUrl: types.optional(types.string || types.null, ""),
    modalHeading: types.optional(types.string || types.null, ""),
    modalBody: types.optional(types.string || types.null, ""),
    success: types.optional(types.boolean || types.null, false),
    orderId: types.optional(types.string || types.number || types.null, ''),
  })
  .actions((self) => ({
    setUserData(data: UserInfo) {
      Object.keys(self).forEach((key) => {
        if (self.hasOwnProperty(key) && self?.[key]) {
          self[key] = data[key]
        }
      })
    },
    setNotificationOrderId(id: string) {
      self.orderId = id;
    },
  }));

export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface UserStoreSnapshot extends SnapshotOut<typeof UserStoreModel> {}
