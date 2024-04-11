// import { redirect, usePathname } from 'next/navigation'

// import { refreshAccessToken } from '@/actions/auth'
// import { API, REFRESH_ACCESS_TOKEN } from '@/api'
// import { useMutation, useQuery } from '@tanstack/react-query'

// import { AuthType } from '@/types/auth'

// import { useAuth } from './use-auth'

// export const useRefreshAccessToken = () => {
//   const { setAuth, auth } = useAuth()

//   // const refreshAccessTokenHandle = async () => {
//   //   const response = await refreshAccessToken()

//   //   setAuth({ accessToken: response.data })

//   //   return response.data
//   // }

//   // const { data, isError } = useQuery<AuthType>({
//   //   queryKey: ['refresh'],
//   //   queryFn: async () => {
//   //     const response = await API.get(REFRESH_ACCESS_TOKEN)
//   //     setAuth(response.data)
//   //     return response.data
//   //   }
//   // })

//   // if (isError) {
//   //   setAuth(null)
//   // }

//   // const { mutate: refreshAccessTokenHandle } = useMutation<AuthType>({
//   //   // mutationKey: ['refreshAccessToken'],
//   //   mutationFn: async () => {
//   //     const response = await API.get(REFRESH_ACCESS_TOKEN)

//   //     return response.data
//   //   },
//   //   onSuccess(data) {
//   //     console.log('ON SUCCESS: ', data.accessToken)

//   //     setAuth(prev => {
//   //       return { ...prev, accessToken: data.accessToken }
//   //     })
//   //   },
//   //   onError() {
//   //     setAuth(null)
//   //   }
//   // })

//   // const refreshAccessToken = () => {
//   //   refreshAccessTokenHandle()

//   //   return auth?.accessToken
//   // }

//   const refreshAccessToken = async () => {
//     const res = await API.get(REFRESH_ACCESS_TOKEN)
//     return res.data
//   }

//   const { mutateAsync } = useMutation<AuthType>({
//     mutationFn: refreshAccessToken,
//     onSuccess(data) {
//       console.log('ON SUCCESS: ', data.accessToken)

//       setAuth(prev => {
//         return { ...prev, accessToken: data.accessToken }
//       })
//     },
//     onError() {
//       setAuth(null)
//     }
//   })

//   const refreshAccessTokenHandle = async () => {
//     await mutateAsync()

//     return auth?.accessToken
//   }

//   // const { data, isError, isSuccess } = useQuery<AuthType>({
//   //   queryKey: ['refreshAccessToken'],
//   //   queryFn: refreshAccessToken
//   // })

//   return refreshAccessTokenHandle
// }
