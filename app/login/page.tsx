import LoginForm from '@/components/login-form'
import { Session } from '@/lib/types'
import { auth } from '@/auth'
import { getCurrentUser } from '@/lib/firebase/firebase-admin'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const user = await getCurrentUser() as any
  const session = { email: user.email, name: user.displayName, id: user.uid } as any


  if (session) {
    redirect('/')
  }

  return (
    <main className="flex flex-col p-4">
      <LoginForm />
    </main>
  )
}
