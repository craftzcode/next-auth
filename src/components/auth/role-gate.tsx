'use client'

import { useCurrentUser } from '@/hooks/use-current-user'

import { AuthError } from './auth-status'

export const RoleGate: React.FC<{
  children: React.ReactNode
  allowedRole: 'USER' | 'ADMIN'
}> = ({ children, allowedRole }) => {
  const currentUser = useCurrentUser()

  if (currentUser?.role !== allowedRole)
    return (
      <AuthError message='You do not have permission to view this content!' />
    )

  return <>{children}</>
}
