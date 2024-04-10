'use client'

import { useRouter } from 'next/navigation'

import { logout } from '@/actions/auth'

import { useAccessToken } from './use-access-token'

export const useLogout = () => {
  const { setAccessToken } = useAccessToken()
  const router = useRouter()

  const logoutHandle = async () => {
    setAccessToken(undefined)
    await logout()
    router.push('/login')
  }

  return logoutHandle
}
