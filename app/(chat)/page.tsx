import { AI } from '@/lib/chat/actions'
import { Chat } from '@/components/chat'
import { Session } from '@/lib/types'
import { auth } from '@/lib/firebase/firebase'
import { getCurrentUser } from '@/lib/firebase/firebase-admin'
import { getMissingKeys } from '../actions'
import { nanoid } from '@/lib/utils'

export const metadata = {
  title: 'Next.js AI Chatbot'
}

export default async function IndexPage() {
  const id = nanoid()
  const user = getCurrentUser() as any
  if (!user) {
    return <div>Loading...</div>
  }
  const session = { email: user.email, name: user.displayName, id: user.uid } as any
  const missingKeys = await getMissingKeys()

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat id={id} session={session} missingKeys={missingKeys} />
    </AI>
  )
}
