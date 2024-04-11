import { createContext, Dispatch, SetStateAction, useState } from 'react'

import { AuthType } from '@/types/auth'

interface AuthContextType {
  auth: AuthType | null
  setAuth: Dispatch<SetStateAction<AuthType | null>>
}

export const AuthContext = createContext<AuthContextType>({
  auth: null,
  setAuth: () => {}
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [auth, setAuth] = useState<AuthType | null>(null)

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
