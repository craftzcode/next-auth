import { refreshAccessToken } from '@/actions/auth'
import { API, REFRESH_ACCESS_TOKEN } from '@/api'
import { useMutation, useQuery } from '@tanstack/react-query'

import { AuthType } from '@/types/auth'

import { useAuth } from './use-auth'

export const useRefreshAccessToken = () => {
  const { setAuth } = useAuth()

  // const refreshAccessTokenHandle = async () => {
  //   const response = await refreshAccessToken()

  //   setAuth({ accessToken: response.data })

  //   return response.data
  // }

  // const { data, isError } = useQuery<AuthType>({
  //   queryKey: ['refresh'],
  //   queryFn: async () => {
  //     const response = await API.get(REFRESH_ACCESS_TOKEN)
  //     setAuth(response.data)
  //     return response.data
  //   }
  // })

  // if (isError) {
  //   setAuth(null)
  // }

  const { mutate: refreshAccessTokenHandle, data } = useMutation<AuthType>({
    mutationKey: ['refreshAccessToken'],
    mutationFn: async () => {
      const response = await API.get(REFRESH_ACCESS_TOKEN)
      return response.data
    }
  })

  const refreshAccessToken = () => {
    refreshAccessTokenHandle()

    return data?.accessToken
  }

  // const refreshAccessToken = () => {
  //   refetch()

  //   setAuth({ accessToken })

  //   return accessToken
  // }

  return refreshAccessToken
}
