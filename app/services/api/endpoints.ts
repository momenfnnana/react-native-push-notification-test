import axios from "axios"
import {
  IEditProfile,
  LoginBody,
  LoginRequest,
  UserInfo,
  DashboardResponse,
  NewTripsResponse,
  IAcceptOrder,
  AcceptOrder,
  OrderDetails,
  IStartTrip,
  AccpetOrderResponse,
  IDriverReachRestaurant,
  IEndTrip,
  StartTripResponse,
  DriverReachCustomerResponse,
  ForgetPasswordRequest,
  ForgetPasswordBody,
  ValidateCodeBody,
  ValidateCodeRequest,
  ResetPasswordBody,
  ResetPasswordRequest,
  TopCaptainsResponse,
  IMarkedForReview,
  IChangePassword,
  ChangePasswordResponse,
  EditProfileResponse,
  IContactUs,
  ContactUsResponse,
  GetLanguagesResponse,
  GetCarTypesResponse,
  EditCaptainCarResponse,
  EditCaptainCarBody,
  GetCaptainCarResponse,
  UpdateLocationResponse,
  UpdateLocationBody,
} from "./api.types"

export const getProfile = () => {
  return axios.get<UserInfo>("Profile/GetProfile")
}

export const getLanguages = () => {
  return axios.get<GetLanguagesResponse>("Account/GetLanguages")
}

export const getCarTypes = () => {
  return axios.get<GetCarTypesResponse>("Profile/GetCarTypes")
}

export const getTopCaptains = () => {
  return axios.get<TopCaptainsResponse>("Driver/TopFiveCaptains")
}

export const getCaptainCar = () => {
  return axios.get<GetCaptainCarResponse>("Profile/GetCaptainCar")
}

export const editProfile = (data: IEditProfile) => {
  return axios.post<EditProfileResponse>("Profile/EditProfile", data)
}

export const login = (data: LoginBody) => {
  return axios.post<LoginRequest>("Account/Login", data)
}

export const editCaptainCar = (data: EditCaptainCarBody) => {
  return axios.post<EditCaptainCarResponse>("Profile/EditCaptainCar", data)
}

export const forgetPassword = (data: ForgetPasswordBody) => {
  return axios.post<ForgetPasswordRequest>("Account/ForgetPassword", data)
}

export const validateCode = (data: ValidateCodeBody) => {
  return axios.post<ValidateCodeRequest>("Account/ForgetPasswordValidateCode", data)
}

export const resetPassword = (data: ResetPasswordBody) => {
  return axios.post<ResetPasswordRequest>("Account/ResetPassword", data)
}

export const getDashboard = (searchText?: string) => {
  return axios.get<DashboardResponse>(`Driver/CaptainDashboard?searchText=${searchText}`)
}

export const getNewTrips = (searchText?: string) => {
  return axios.get<NewTripsResponse>(`TravelOrder/NewTrips?searchText=${searchText}`)
}

export const acceptOrder = (data: IAcceptOrder) => {
  return axios.post<AcceptOrder>(`TravelOrder/AcceptOrder`, data)
}

export const getOrderDetails = (id: string | number) => {
  return axios.get<OrderDetails>(`TravelOrder/OrderDetails?id=${id}`)
}
// fix AccpetOrderResponse response type
export const DriverReachRestaurant = (data: IDriverReachRestaurant) => {
  return axios.post<AccpetOrderResponse>(`TravelOrder/ReachRestaurant`, data)
}

export const startTrip = (data: IStartTrip) => {
  return axios.post<StartTripResponse>(`TravelOrder/StartTrip`, data)
}

export const DriverReachCustomer = (data: IDriverReachRestaurant) => {
  return axios.post<DriverReachCustomerResponse>(`TravelOrder/ReachCustomer`, data)
}

export const updateLocation = (data: UpdateLocationBody) => {
  return axios.post<UpdateLocationResponse>(`Driver/UpdateLocation`, data)
}

export const EndTrip = (data: IEndTrip) => {
  return axios.post<AccpetOrderResponse>(`TravelOrder/EndTrip`, data)
}

export const MarkedForReview = (data: IMarkedForReview) => {
  return axios.post<AccpetOrderResponse>(`TravelOrder/MarkedForReview`, data)
}

export const ChangePassword = (data: IChangePassword) => {
  return axios.post<ChangePasswordResponse>(`Account/ChangePassword`, data)
}

export const ContactUs = (data: IContactUs) => {
  return axios.post<ContactUsResponse>(`ContactUs`, data)
}
