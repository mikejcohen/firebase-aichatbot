import { Session } from '@/lib/types'
import SignupForm from '@/components/signup-form'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function SignupPage() {
const user = await getCurrentUser() as any
  const session = { email: user.email, name: user.displayName, id: user.uid } as any


  if (session) {
    redirect('/')
  }

  return (
    <main className="flex flex-col p-4">
      <SignupForm />
    </main>
  )
}
