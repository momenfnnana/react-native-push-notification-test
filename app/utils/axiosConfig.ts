import axios from "axios"
// import { showErrorMessage } from "@models"
import Snackbar from "react-native-snackbar"
import { colors } from "@theme"
import config from "@config"
import { saveString, remove } from "./storage"
// import { navigate } from "navigators/ExternalNavigation"
import { translate } from "../i18n/translate"

axios.defaults.auth = {
  username: "Integration",
  password: "Cap$ys#123",
}
axios.defaults.baseURL = config.API_URL
export const setAxiosLanguage = async (languageId: string) => {
  axios.defaults.headers.common["LanguageId"] = languageId
  saveString("languageId", languageId)
}

export const setAxiosAccessToken = (accessToken: string) => {
  axios.defaults.headers.common["AccessToken"] = accessToken
}

export const setDriverIdEncryption = (DriverIdEncryption: string) => {
  axios.defaults.headers.common["DriverIdEncryption"] = DriverIdEncryption
}

axios.interceptors.response.use(
  (response) => {
    if (response.status == 200 && response.data.message) {
      Snackbar.show({
        text: response.data.message,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.palette.greenPalette.green,
      })
    }
    return response
  },
  (error) => {
    if (error?.response?.status === 401) {
      setAxiosAccessToken("")
      remove("accessToken")
      // navigate("Login")
      if (!!error?.response?.data?.message.length) {
        // showErrorMessage(error?.response?.data?.message)
      } else {
        // showErrorMessage(translate("errorMessages.unAuth"))
      }
    } else {
      if (!!error?.response?.data?.message.length) {
        // showErrorMessage(error?.response?.data?.message)
      } else {
        // showErrorMessage(translate("errorMessages.defult"))
      }
    }
    throw error
  },
)
