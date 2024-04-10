import { useContext } from 'react'

import { AccessTokenContext } from '@/context/access-token-context'

export const useAccessToken = () => {
  return useContext(AccessTokenContext)
}
