import { refreshAccessToken } from '@/actions/auth'

import { useAccessToken } from './use-access-token'

export const useRefreshAccessToken = () => {
  const { setAccessToken } = useAccessToken()

  const refreshAccessTokenHandle = async () => {
    const { data } = await refreshAccessToken()

    setAccessToken(data)

    return data
  }

  return refreshAccessTokenHandle
}
