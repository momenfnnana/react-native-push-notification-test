import Snackbar from "react-native-snackbar"
import { colors } from "@theme"

export const showErrorMessage = (errorMessage: string) => {
  Snackbar.show({
    text: errorMessage,
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: colors.palette.redPalette.red,
  })
}
