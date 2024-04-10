import { API, GET_ALL_USERS } from '@/api'
import axios from 'axios'

import { UserType } from '@/types/auth'

interface GetAllUsersResponse {
  data?: UserType[]
  error?: string
}

export const gettAllUsers = async (): Promise<GetAllUsersResponse> => {
  try {
    const response = await API.get(GET_ALL_USERS)
    return { data: response.data }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { message } = error.response?.data
      console.log('INSIDE_DATA_GET-ALL-USERS: ', message)
      return { error: message }
    }

    console.log('INSIDE_DATA_GET-ALL-USERS: ', error)
    throw error
  }
}
