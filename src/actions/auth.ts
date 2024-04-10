import {
  API,
  GET_CURRENT_USER,
  LOGIN,
  LOGOUT,
  REFRESH_ACCESS_TOKEN
} from '@/api'
import axios from 'axios'

import { LoginType, UserType } from '@/types/auth'

interface AuthResponse {
  data?: string
  error?: string
}

export const login = async (values: LoginType): Promise<AuthResponse> => {
  try {
    const response = await API.post(LOGIN, values)

    return { data: response.data.accessToken }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { message } = error.response?.data
      return { error: message }
    }

    console.log('INSIDE_AUTH_LOGIN: ', error)
    throw error
  }
}

export const logout = async () => {
  try {
    const response = await API.post(LOGOUT)

    return { data: response.data }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { message } = error.response?.data

      console.log('INSIDE_AUTH_LOGOUT: ', message)

      return { error: message }
    }

    console.log('INSIDE_AUTH_LOGOUT: ', error)
    throw error
  }
}

export const refreshAccessToken = async (): Promise<AuthResponse> => {
  try {
    const response = await API.get(REFRESH_ACCESS_TOKEN)

    return { data: response.data.accessToken }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { message } = error.response?.data
      console.log('INSIDE_AUTH_REFRESH-ACCESS-TOKEN', message)
      return { error: message }
    }

    console.log('INSIDE_AUTH_REFRESH-ACCESS-TOKEN: ', error)
    throw error
  }
}

interface GetCurrentUserResponse {
  data?: UserType
  error?: string
}

export const getCurrentUser = async (): Promise<GetCurrentUserResponse> => {
  try {
    const response = await API.get(GET_CURRENT_USER)

    return { data: response.data.user }
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
