import { ImageSourcePropType } from "react-native"

/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */
export interface EpisodeItem {
  title: string
  pubDate: string
  link: string
  guid: string
  author: string
  thumbnail: string
  description: string
  content: string
  enclosure: {
    link: string
    type: string
    length: number
    duration: number
    rating: { scheme: string; value: string }
  }
  categories: string[]
}
// Generated by https://quicktype.io

export interface LoginRequest {
  id: number
  username: string
  email: string
  phoneNumber: null
  mobile: string
  createdOn: string
  status: number
  deletedOn: null
  lastLogin: string
  profilePhoto: string
  preferedLanguageId: number
  password: null
  languageId: number
  fullName: string
  address: null
  roles: null
  contactId: number
  accessToken: string
  expiration: string
  statusCode: number
  message: null
  redirectUrl: null
  modalHeading: null
  modalBody: null
  success: boolean
  detailsLookup: null
}

export interface EditCaptainCarResponse {
  driverId: number
  carId: number
  name: string
  carNumber: string
  statusCode: number
  message: string
  redirectUrl?: any
  modalHeading?: any
  modalBody?: any
  success: boolean
  detailsLookup?: any
}

export interface ForgetPasswordRequest {
  mobile: string
  encCode: string
  statusCode: number
  message: string
  redirectUrl?: any
  modalHeading?: any
  modalBody?: any
  success: boolean
  detailsLookup?: any
}

export interface ValidateCodeRequest {
  statusCode: number
  message: string
  redirectUrl?: any
  modalHeading?: any
  modalBody?: any
  success: boolean
  detailsLookup?: any
}

export interface ResetPasswordRequest {
  statusCode: number
  message: string
  redirectUrl?: any
  modalHeading?: any
  modalBody?: any
  success: boolean
  detailsLookup?: any
}

export interface LoginBody {
  Username: string
  Password: string
  RememberMe: boolean
  NotificationToken: string
}

export interface EditCaptainCarBody {
  CarId: string
  Name: string
  CarNumber: string
}

export interface ForgetPasswordBody {
  Mobile: string
}

export interface ValidateCodeBody {
  CountryCode: string
  Mobile: string
  EncCode: string
  Code: string
}

export interface ResetPasswordBody {
  CountryCode: string
  Mobile: string
  EncCode: string
  Code: string
  NewPassword: string
  ConfirmPassword: string
}

export interface DashboardCaptain {
  orderTravelId: number
  restaurantName: string
  restaurantAddress: string
  restaurantMapLocation?: any
  customerAddress: string
  customerMapLocation?: any
  travelDistance: number
  travelCost: number
  paidAmount: number
  markedForReview: boolean
  total: number
  currentStatusCode: number
}

// Generated by https://quicktype.io

export interface NewTripsResponse {
  newTrips: NewTrip[]
  statusCode: number
  message: string
  redirectUrl: null
  modalHeading: null
  modalBody: null
  success: boolean
  detailsLookup: null
}

export interface NewTrip {
  orderTravelId: number
  restaurantName: string
  restaurantAddress: string
  restaurantMapLocation: null | string
  customerAddress: string
  customerMapLocation: string
  travelDistance: number
  travelCost: number
  paidAmount: number
  requiredTotal: number
  paymentTypeId: number
  paymentTypeName: string
}

export interface DashboardResponse {
  balance: number
  dashboardCaptain: DashboardCaptain[]
  statusCode: number
  message: string
  redirectUrl?: any
  modalHeading?: any
  modalBody?: any
  success: boolean
  detailsLookup?: any
}

export interface ApiFeedResponse {
  status: string
  feed: {
    url: string
    title: string
    link: string
    author: string
    description: string
    image: string
  }
  items: EpisodeItem[]
}

export interface UserInfo {
  driverId: number
  name: string
  mobile: string
  vehicleType: string
  carNumber: string
  balance: number
  statusCode: number
  message: string
  redirectUrl?: any
  modalHeading?: any
  modalBody?: any
  success: boolean
  detailsLookup?: any
  profilePhoto?: string
}

export interface DetailsLookup {
  id: number
  name: string
}

export interface GetLanguagesResponse {
  statusCode: number
  message: string
  redirectUrl?: any
  modalHeading?: any
  modalBody?: any
  success: boolean
  detailsLookup: DetailsLookup[]
}

export interface DetailsLookup {
  id: number
  name: string
}

export interface GetCarTypesResponse {
  statusCode: number
  message: string
  redirectUrl?: any
  modalHeading?: any
  modalBody?: any
  success: boolean
  detailsLookup: DetailsLookup[]
}

export interface EditProfileResponse {
  driverId: number
  name: string
  mobile: string
  vehicleType?: any
  carNumber: string
  balance: number
  statusCode: number
  message: string
  redirectUrl?: any
  modalHeading?: any
  modalBody?: any
  success: boolean
  detailsLookup?: any
}

export interface GetCaptainCarResponse {
  driverId: number
  carId: number
  name: string
  carNumber: string
  statusCode: number
  message: string
  redirectUrl?: any
  modalHeading?: any
  modalBody?: any
  success: boolean
  detailsLookup?: any
}

export interface Captain {
  driverId: number
  fullName: string
  numberOfTravels: number
  orderTopDriver: number
  profilePhoto: string
}

export interface TopCaptainsResponse {
  captains: Captain[]
  statusCode: number
  message: string
  redirectUrl?: any
  modalHeading?: any
  modalBody?: any
  success: boolean
  detailsLookup?: any
}

export interface IEditProfile {
  Name: string
  Mobile: string
  CarNumber: string
}

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

export interface IOrder {
  orderName: string
  orderImage: ImageSourcePropType
  id: number
}

export interface IAcceptOrder {
  OrderTravelId: string | number
  IsAccepted: boolean
}
export interface IStartTrip {
  OrderTravelId: string | number
  TravelStartTime: Date | string
}

export interface IDriverReachRestaurant {
  OrderTravelId: string | number
}

export interface UpdateLocationBody {
  latitude: string
  longitude: string
}

export interface IEndTrip {
  OrderTravelId: string
  TravelEndTime: string
  TravelCost: string
  TravelDistance: string
  PaidAmount: string
}
export interface IMarkedForReview {
  OrderTravelId: string | number
  MarkedForReview: boolean
  Notes: string
}
export interface IChangePassword {
  OldPassword: string
  NewPassword: string
  ConfirmPassword: string
}

export interface IContactUs {
  Name: string
  Email: string
  Address: string
  MessageBody: string
  Mobile: string
}

export interface OrderDetails {
  orderTravelId?: number
  restaurantName?: string
  restaurantAddress?: string
  restaurantPhoneNumber?: string
  restaurantMapLocation?: null
  customerMapLocation?: null
  customerName?: string
  customerMobileNumber?: string
  customerAddress?: string
  travelCost?: number
  paymentType?: string
  paidAmount?: number
  total?: number
  markedForReview?: boolean
  currentStatusCode?: number
  statusCode?: number
  message?: string
  redirectUrl?: null
  modalHeading?: null
  modalBody?: null
  success?: boolean
  detailsLookup?: null
}

export interface AcceptOrder {
  orderTravelId: number
  driverId: number
  isAccepted: boolean
  statusCode: number
  message: string
  redirectUrl: null
  modalHeading: null
  modalBody: null
  success: boolean
  detailsLookup: null
}

export interface AccpetOrderResponse {
  orderTravelId: number
  travelStartTime: string
  restaurantMapLocation: string
  customerMapLocation: string
  statusCode: number
  message: string
  redirectUrl: null
  modalHeading: null
  modalBody: null
  success: boolean
  detailsLookup: null
}

export interface StartTripResponse {
  orderTravelId: number
  travelStartTime: string
  restaurantMapLocation: null
  customerMapLocation: string
  statusCode: number
  message: string
  redirectUrl: null
  modalHeading: null
  modalBody: null
  success: boolean
  detailsLookup: null
}
export interface DriverReachCustomerResponse {
  orderTravelId: number
  restaurantName: string
  restaurantAddress: string
  restaurantPhoneNumber: string
  restaurantMapLocation: null
  customerName: string
  customerMobileNumber: string
  customerAddress: string
  customerMapLocation: string
  travelCost: number
  paymentType: string
  paidAmount: number
  statusCode: number
  message: string
  redirectUrl: null
  modalHeading: null
  modalBody: null
  success: boolean
  detailsLookup: null
}

export interface UpdateLocationResponse {
  id: number
  driverId: number
  latitude: number
  longitude: number
  createdOn: string
  createdBy: string
  status: number
  deletedOn?: any
  page: number
  driver?: any
  statusCode: number
  message: string
  redirectUrl?: any
  modalHeading?: any
  modalBody?: any
  success: boolean
  detailsLookup?: any
}

export interface ChangePasswordResponse {
  id: number
  username: string
  email: null
  phoneNumber: null
  mobile: null
  idNumber: null
  birthday: null
  genderLookupId: null
  createdOn: string
  status: number
  deletedOn: null
  lastLogin: string
  profilePhoto: string
  preferedLanguageId: number
  password: null
  confirmPassword: null
  languageId: number
  fullName: null
  address: null
  roles: Role[]
  roleIds: null
  contactId: number
  userIdEncryption: null
}

export interface ContactUsResponse {
  name: string
  email: string
  address: string
  messageBody: string
  mobile: string
  statusCode: number
  message: string
  redirectUrl?: any
  modalHeading?: any
  modalBody?: any
  success: boolean
  detailsLookup?: any
}

export interface Role {
  userId: number
  roleId: string
  name: string
  friendlyName: null
  concurrencyStamp: null
  permissions: null
}
