'use client'

import { useAuth } from '@/context/auth-context'

import { AuthError } from './auth-status'

export const RoleGate: React.FC<{
  children: React.ReactNode
  allowedRole: 'USER' | 'ADMIN'
}> = ({ children, allowedRole }) => {
  const { session } = useAuth()

  if (session?.user?.role !== allowedRole)
    return (
      <AuthError message='You do not have permission to view this content!' />
    )

  return <>{children}</>
}
