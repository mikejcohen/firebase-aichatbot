'use client'

import { useFormState, useFormStatus } from 'react-dom'

import { IconSpinner } from './ui/icons'
import Link from 'next/link'
import { authenticate } from '@/app/login/actions'
import { getMessageFromCode } from '@/lib/utils'
import { signInWithGoogle } from '@/lib/firebase/auth'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()
  const [result, dispatch] = useFormState(authenticate, undefined)

  const signInWithGoogles = async () => {
    try {
      const isOk = await signInWithGoogle();

      if (isOk) router.push("/");
    } catch (error) {
      console.error("Failed to sign in with Google", error);
    }
  };

  useEffect(() => {
    if (result?.type) {
      if (result.type === 'error') {
        toast.error(getMessageFromCode(result.resultCode))
      } else {
        toast.success(getMessageFromCode(result.resultCode))
        router.refresh()
      }
    }
  }, [result, router])

  return (
    <form
      action={signInWithGoogles}
      className="flex flex-col items-center gap-4 space-y-3"
    >
      <div className="w-full flex-1 rounded-lg border bg-white px-6 pb-4 pt-8 shadow-md  md:w-96 dark:bg-zinc-950">
        <h1 className="mb-3 text-2xl font-bold">Please log in to continue.</h1>
        <LoginButton />
      </div>

      <Link
        href="/signup"
        className="flex flex-row gap-1 text-sm text-zinc-400"
      >
        No account yet? <div className="font-semibold underline">Sign up</div>
      </Link>
    </form>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <button
      className="my-4 flex h-10 w-full flex-row items-center justify-center rounded-md bg-zinc-900 p-2 text-sm font-semibold text-zinc-100 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      aria-disabled={pending}
    >
      {pending ? <IconSpinner /> : 'Log in with Google'}
    </button>
  )
}
