// import { createContext, Dispatch, SetStateAction, useState } from 'react'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import {
  API,
  GET_CURRENT_USER,
  LOGIN,
  LOGOUT,
  REFRESH_ACCESS_TOKEN
} from '@/api'
import { loginSchema } from '@/schemas/login.schema'
import {
  UseMutateAsyncFunction,
  UseMutateFunction,
  useMutation
} from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { z } from 'zod'

import { AuthType } from '@/types/auth'

// import { AuthType } from '@/types/auth'

// interface AuthContextType {
//   auth: AuthType | null
//   setAuth: Dispatch<SetStateAction<AuthType | null>>
// }

// export const AuthContext = createContext<AuthContextType>({
//   auth: null,
//   setAuth: () => {}
// })

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//   children
// }) => {
//   const [auth, setAuth] = useState<AuthType | null>(null)

//   return (
//     <AuthContext.Provider value={{ auth, setAuth }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

interface AuthContextType {
  session: AuthType | null
  login: UseMutateAsyncFunction<
    AuthType,
    Error,
    {
      usernameOrEmail: string
      password: string
    },
    unknown
  >
  logout: () => void
  refreshAccessToken: UseMutateAsyncFunction<AuthType, Error, void, unknown>
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  login: () => Promise.resolve({} as AuthType),
  logout: () => {},
  refreshAccessToken: () => Promise.resolve({} as AuthType)
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [session, setSession] = useState<AuthType | null>(null)

  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  const { mutateAsync: refreshAccessToken } = useMutation({
    mutationFn: async (): Promise<AuthType> => {
      const response = await fetch(
        'http://localhost:3001/api/auth/refresh-access-token',
        { credentials: 'include' }
      )

      const data = await response.json()

      return data
    },
    onSuccess(data) {
      setSession({
        user: data.user,
        accessToken: data.accessToken
      })
    },
    onError() {
      setSession(null)
    },
    onSettled() {
      setIsLoading(false)
    }
  })

  // const refreshAccessToken = useCallback(async () => {
  //   try {
  //     const response = await fetch(
  //       'http://localhost:3001/api/auth/refresh-access-token',
  //       { credentials: 'include' }
  //     )

  //     const data = await response.json()

  //     return data
  //   } catch (error) {
  //     console.error('Error refreshing access token:', error)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }, [])

  useEffect(() => {
    // const verifyRefreshToken = async () => {
    //   //   try {
    //   //     const response = await refreshAccessToken()
    //   //     // setSession(prevUser => {
    //   //     //   return { ...prevUser, accessToken: response.accessToken }
    //   //     // })

    //   //     setSession({ user: response.user, accessToken: response.accessToken })
    //   //   } catch (error) {
    //   //     setSession(null)
    //   //   } finally {
    //   //     setIsLoading(false)
    //   //   }

    //   // !session?.accessToken ? verifyRefreshToken() : setIsLoading(false)

    //   try {
    //     const response = await API.get(REFRESH_ACCESS_TOKEN)

    //     setSession({
    //       user: response.data.user,
    //       accessToken: response.data.accessToken
    //     })
    //   } catch (error) {
    //     setSession(null)
    //   } finally {
    //     setIsLoading(false)
    //   }
    // }

    // verifyRefreshToken()

    refreshAccessToken()
  }, [refreshAccessToken])

  const { mutateAsync: login } = useMutation({
    mutationFn: async (
      values: z.infer<typeof loginSchema>
    ): Promise<AuthType> => {
      const response = await API.post(LOGIN, values)

      return response.data
    },
    // onError: error => {
    //   return error
    // },
    onSuccess: data => {
      setSession({
        user: data.user,
        accessToken: data.accessToken
      })
      router.push(callbackUrl || '/profile')
    }
  })

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      await API.post(LOGOUT)
    },
    onSuccess() {
      setSession(null)
    },
    onError: error => {
      if (isAxiosError(error)) {
        // setError(error.response?.data.message)
        console.error(error)
      }

      console.error(error)
    }
  })

  const contextValue = {
    session,
    login,
    logout,
    refreshAccessToken
  }

  if (isLoading) return null

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
