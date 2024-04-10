import { Nav } from '@/components/layouts/nav'

export default function ProtectedLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex h-screen items-center'>
      <div className='mx-auto w-full max-w-3xl space-y-4'>
        <Nav />
        <section>{children}</section>
      </div>
    </div>
  )
}
