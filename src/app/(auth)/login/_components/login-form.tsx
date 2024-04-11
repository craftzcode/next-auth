'use client'

import { useState } from 'react'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { login } from '@/actions/auth'
import { API, GET_CURRENT_USER, LOGIN } from '@/api'
import { loginSchema } from '@/schemas/login.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios, { isAxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { AuthType } from '@/types/auth'

import { useAuth } from '@/hooks/use-auth'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AuthError } from '@/components/auth/auth-status'

export const LoginForm = () => {
  const { setAuth } = useAuth()

  const [error, setError] = useState<string | undefined>()

  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  const { mutate: login } = useMutation({
    mutationKey: ['login'],
    mutationFn: async (values: z.infer<typeof loginSchema>) => {
      const response = await API.post(LOGIN, values)

      setAuth({
        user: response.data.user,
        accessToken: response.data.accessToken
      })
    },
    onError: error => {
      if (isAxiosError(error)) {
        setError(error.response?.data.message)
      }
    },
    onSuccess: () => {
      router.push(callbackUrl || '/profile')
    }
  })

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usernameOrEmail: '',
      password: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    login(values)

    // //! We will get the (accessToken) from our backend api
    // const { data, error } = await login(values)
    // if (!error) {
    //   //! We will store the (accessToken) on our app memory (useState) instead on (localStorage) so it can wipe the (accessToken) once the user close the website or refresh
    //   //! Even if we store the (accessToken) in (useState), (useContext), or (localStorage), we'll still lose authorization. That's because it's the backend API that checks if the access token has expired or not. So, even if we keep the access token in our frontend storage forever, once we make a request to the backend API, it will check if the access token is expired or not.
    //   router.push('/profile')
    // } else {
    //   console.log(error)
    // }
  }

  return (
    <div className='flex h-full w-full'>
      <div className='h-full w-full p-2'>
        <div className='h-full rounded-lg bg-indigo-500'></div>
      </div>
      <div className='flex w-full max-w-xl items-center p-2'>
        <div className='mx-auto flex w-full max-w-sm flex-col gap-8'>
          <div className='space-y-4'>
            <h1 className='text-4xl'>Login</h1>
            <p>Enter your credentials to access your account</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='usernameOrEmail'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder='Username or email' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center justify-between'>
                      <FormLabel>Password</FormLabel>
                      <Link
                        href='/forgot-password'
                        className='ml-auto inline-block text-sm underline'
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input placeholder='Password' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <AuthError message={error} />

              <Button type='submit' className='w-full'>
                Login
              </Button>

              <Button variant='outline' className='w-full'>
                Login with Google
              </Button>
            </form>
          </Form>

          <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link href='/signup' className='underline'>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
