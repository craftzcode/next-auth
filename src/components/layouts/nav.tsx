'use client'

import Link from 'next/link'
import { redirect, usePathname, useRouter } from 'next/navigation'

import { logout } from '@/actions/auth'
import { API, LOGOUT } from '@/api'
import { useAuth } from '@/context/auth-context'
import { useMutation, useQuery } from '@tanstack/react-query'

import { cn } from '@/lib/utils'

// import { useAuth } from '@/hooks/use-auth'

// import { useLogout } from '@/hooks/use-logout'

import { Button } from '../ui/button'

export const Nav = () => {
  const path = usePathname()
  const router = useRouter()
  // const { setAuth } = useAuth()
  // const logout = useLogout()
  const { logout } = useAuth()

  const ROUTES = [
    {
      title: 'Users',
      href: '/users'
    },
    {
      title: 'Admin',
      href: '/admin'
    },
    {
      title: 'Profile',
      href: '/profile'
    }
  ]

  // const { mutate: logoutHandle } = useMutation({
  //   mutationFn: async () => {
  //     // await logout()
  //     await API.post(LOGOUT)
  //     setAuth(null)
  //   }
  // })

  return (
    <header className='w-full rounded-xl bg-card p-6'>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold text-primary'>NEST-NEXT AUTH</h1>
        <nav>
          <ul className='flex items-center gap-8'>
            {ROUTES.map((route, index) => (
              <li
                key={index}
                className={cn('!cursor-pointer', {
                  'text-muted-foreground': path !== route.href
                })}
              >
                <Link href={route.href}>{route.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <Button variant='destructive' onClick={() => logout()}>
          Logout
        </Button>
      </div>
    </header>
  )
}
