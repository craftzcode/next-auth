'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

import { useLogout } from '@/hooks/use-logout'

import { Button } from '../ui/button'

export const Nav = () => {
  const path = usePathname()
  const logout = useLogout()

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
