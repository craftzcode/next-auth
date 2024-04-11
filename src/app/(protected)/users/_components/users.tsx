'use client'

import { useEffect, useState } from 'react'

import { GET_ALL_USERS } from '@/api'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { UserType } from '@/types/auth'

// import { useAuth } from '@/hooks/use-auth'
// import { useRefreshAccessToken } from '@/hooks/use-refresh-access-token'
import { useRefreshAccessTokenInterceptor } from '@/hooks/use-refresh-access-token-interceptor'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const Users = () => {
  const API_PRIVATE = useRefreshAccessTokenInterceptor()
  // const { auth } = useAuth()
  // const refreshAccessToken = useRefreshAccessToken()

  const { data: usersData, isLoading: isLoadingUsers } = useQuery<UserType[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await API_PRIVATE.get(GET_ALL_USERS)

      return response.data
    }
  })

  // const [users, setUsers] = useState<UserType[]>()

  // useEffect(() => {
  //   const getAllUsersHandle = async () => {
  //     try {
  //       const response = await API_PRIVATE.get(GET_ALL_USERS)

  //       setUsers(response.data)
  //     } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //         const { message } = error.response?.data

  //         console.log('INSIDE_USERS_GET-ALL-USERS-HANDLE: ', message)

  //         return { error: message }
  //       }

  //       console.log('INSIDE_DATA_GET-ALL-USERS: ', error)

  //       throw error
  //     }
  //   }

  //   getAllUsersHandle()
  // }, [API_PRIVATE])

  if (isLoadingUsers) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className='h-4 w-20 bg-[#413e43]' />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            <Skeleton className='flex h-[78px] w-full flex-col justify-center gap-2 rounded bg-[#2c282e] p-4'>
              <Skeleton className='h-4 w-36 bg-[#413e43]' />
              <Skeleton className='h-2 w-20 bg-[#413e43]' />
            </Skeleton>
            <Skeleton className='flex h-[78px] w-full flex-col justify-center gap-2 rounded bg-[#2c282e] p-4'>
              <Skeleton className='h-4 w-36 bg-[#413e43]' />
              <Skeleton className='h-2 w-20 bg-[#413e43]' />
            </Skeleton>
            <Skeleton className='flex h-[78px] w-full flex-col justify-center gap-2 rounded bg-[#2c282e] p-4'>
              <Skeleton className='h-4 w-36 bg-[#413e43]' />
              <Skeleton className='h-2 w-20 bg-[#413e43]' />
            </Skeleton>
            <Skeleton className='flex h-[78px] w-full flex-col justify-center gap-2 rounded bg-[#2c282e] p-4'>
              <Skeleton className='h-4 w-36 bg-[#413e43]' />
              <Skeleton className='h-2 w-20 bg-[#413e43]' />
            </Skeleton>
            <Skeleton className='flex h-[78px] w-full flex-col justify-center gap-2 rounded bg-[#2c282e] p-4'>
              <Skeleton className='h-4 w-36 bg-[#413e43]' />
              <Skeleton className='h-2 w-20 bg-[#413e43]' />
            </Skeleton>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Users</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='space-y-2'>
          {usersData?.map(user => (
            <li key={user.id} className='rounded border p-4'>
              <div>
                <h2>{user.name}</h2>
                <h3 className='text-sm text-muted-foreground'>{user.role}</h3>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
