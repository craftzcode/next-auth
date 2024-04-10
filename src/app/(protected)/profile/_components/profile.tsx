'use client'

import { useCurrentUser } from '@/hooks/use-current-user'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export const Profile = () => {
  const currentUser = useCurrentUser()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{currentUser?.name}</CardTitle>
        <CardDescription>{currentUser?.role}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          <div className='flex items-center justify-between rounded border p-4'>
            <h2>ID:</h2>
            <p className='text-xs'>{currentUser?.id}</p>
          </div>

          <div className='flex items-center justify-between rounded border p-4'>
            <h2>Username:</h2>
            <p className='text-xs'>{currentUser?.username}</p>
          </div>

          <div className='flex items-center justify-between rounded border p-4'>
            <h2>Email:</h2>
            <p className='text-xs'>{currentUser?.email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
