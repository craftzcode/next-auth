'use client'

import { redirect, usePathname, useSearchParams } from 'next/navigation'

import { API, GET_CURRENT_USER } from '@/api'
import { useQuery } from '@tanstack/react-query'

import { UserType } from '@/types/auth'

import { useAuth } from '@/hooks/use-auth'
import { useCurrentUser } from '@/hooks/use-current-user'

export const ProtectedGate: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { auth } = useAuth()
  const path = usePathname()

  // const currentUser = useCurrentUser()

  // const {
  //   data: currentUser,
  //   isError,
  //   isFetching
  // } = useQuery<UserType>({
  //   queryKey: ['currentUser'],
  //   queryFn: async () => {
  //     try {
  //       const response = await API.get(GET_CURRENT_USER)

  //       return response.data.user
  //     } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //         const { message } = error.response?.data

  //         throw message
  //       }

  //       throw error
  //     }
  //   }
  // })

  // if (isFetching) return null

  // if (isError) return redirect('/login')

  // if (!currentUser) {
  //   redirect('/login')
  // }

  // console.log(auth)

  // const {
  //   data: currentUser,
  //   isLoading: isLoadingCurrentUser,
  //   isError,
  //   error
  // } = useQuery<UserType>({
  //   queryKey: ['user'],
  //   queryFn: async () => {
  //     const response = await API.get(GET_CURRENT_USER)
  //     return response.data.user
  //   }
  // })

  // if (isError) redirect('/login')

  if (!auth?.accessToken) {
    redirect(`/login?callbackUrl=${encodeURIComponent(path)}`)
  }

  return <>{children}</>
}
