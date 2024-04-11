'use client'

import { useAuth } from '@/context/auth-context'

import { useCurrentUser } from '@/hooks/use-current-user'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export const Profile = () => {
  // const currentUser = useCurrentUser()

  const { session } = useAuth()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{session?.user?.name}</CardTitle>
        <CardDescription>{session?.user?.role}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          <div className='flex items-center justify-between rounded border p-4'>
            <h2>ID:</h2>
            <p className='text-xs'>{session?.user?.id}</p>
          </div>

          <div className='flex items-center justify-between rounded border p-4'>
            <h2>Username:</h2>
            <p className='text-xs'>{session?.user?.username}</p>
          </div>

          <div className='flex items-center justify-between rounded border p-4'>
            <h2>Email:</h2>
            <p className='text-xs'>{session?.user?.email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
