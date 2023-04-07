import { loadString } from "./storage"

export const readAccessToken = async () => {
  const token = await loadString("accessToken")
  return token
}
