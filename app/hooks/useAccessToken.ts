import { readAccessToken } from "@utils"
import { useEffect, useState } from "react"

export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState<string>()
  useEffect(() => {
    readAccessToken()
      .then((res: string | null) => {
        if (res) {
          setAccessToken(res)
        }
      })
      .catch((error) => {
        console.log("error in useAccessToken: ", { error })
      })
  }, [])
  const reload = (token: string) => {
    setAccessToken(token)
  }
  return { accessToken, reload }
}
