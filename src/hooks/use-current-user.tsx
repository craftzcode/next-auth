'use client'

import { useEffect, useState } from 'react'

import { GET_CURRENT_USER } from '@/api'
import axios from 'axios'

import { UserType } from '@/types/auth'

import { useRefreshAccessTokenInterceptor } from './use-refresh-access-token-interceptor'

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)
  const API_PRIVATE = useRefreshAccessTokenInterceptor()

  useEffect(() => {
    const getCurrentUserHandle = async () => {
      try {
        const response = await API_PRIVATE.get(GET_CURRENT_USER)

        setCurrentUser(response.data.user)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const { message } = error.response?.data
          console.log('INSIDE_AUTH_GET-USER-SESSION: ', message)
          return { error: message }
        }

        console.log('INSIDE_AUTH_GET-USER-SESSION: ', error)
        throw error
      }
    }

    getCurrentUserHandle()
  }, [API_PRIVATE])

  return currentUser
}
