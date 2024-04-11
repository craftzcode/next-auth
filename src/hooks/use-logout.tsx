'use client'

import { useRouter } from 'next/navigation'

import { logout } from '@/actions/auth'

import { useAuth } from './use-auth'

export const useLogout = () => {
  const { setAuth } = useAuth()
  const router = useRouter()

  const logoutHandle = async () => {
    setAuth(null)
    await logout()
    router.push('/login')
  }

  return logoutHandle
}
