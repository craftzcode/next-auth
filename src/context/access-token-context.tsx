import { createContext, useState } from 'react'

interface AccessTokenContextType {
  accessToken?: string
  setAccessToken: (token?: string) => void
}

export const AccessTokenContext = createContext<AccessTokenContextType>({
  setAccessToken: (token?: string) => {}
})

export const AccessTokenProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [accessToken, setAccessToken] = useState<string | undefined>()

  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AccessTokenContext.Provider>
  )
}
