'use client'

import { AccessTokenProvider } from '@/context/access-token-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AccessTokenProvider>{children}</AccessTokenProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  )
}
