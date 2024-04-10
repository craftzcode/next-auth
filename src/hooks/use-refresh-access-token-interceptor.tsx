import { useEffect } from 'react'

import { API_PRIVATE } from '@/api'

import { useAccessToken } from './use-access-token'
import { useRefreshAccessToken } from './use-refresh-access-token'

export const useRefreshAccessTokenInterceptor = () => {
  const { accessToken } = useAccessToken()
  const refreshAccessToken = useRefreshAccessToken()

  useEffect(() => {
    //! In the first request we add the (accessToken) to the (Authorization Bearer)
    const requestIntercept = API_PRIVATE.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          console.log('FIRST ACCESS TOKEN: ', accessToken)
          config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    //! If the response of the request has expired (accessToken) we will generate a new (accessToken) using (refreshAccessToken) then we will to previous request
    const responseIntercept = API_PRIVATE.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true
          const newAccessToken = await refreshAccessToken()
          console.log('NEW ACCESS TOKEN: ', accessToken)
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return API_PRIVATE(prevRequest)
        }
        return Promise.reject(error)
      }
    )

    return () => {
      API_PRIVATE.interceptors.request.eject(requestIntercept)
      API_PRIVATE.interceptors.response.eject(responseIntercept)
    }
  }, [accessToken, refreshAccessToken])

  return API_PRIVATE
}
