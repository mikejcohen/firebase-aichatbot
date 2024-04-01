import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { getChat, getMissingKeys } from '@/app/actions'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/lib/firebase/firebase'
import { getCurrentUser } from '@/lib/firebase/firebase-admin'

export interface ChatPageProps {
  params: {
    id: string
  }
}



export default async function ChatPage({ params }: ChatPageProps) {
  const user = getCurrentUser() as any
  console.log('got this user: ', user)
  if (!user) return <div>Loading...</div>
  const session = { email: user.email, name: user.displayName, id: user.uid } as any

  const missingKeys = await getMissingKeys()

  if (!user) {
    redirect(`/login?next=/chat/${params.id}`)
  }

  const userId = user.email as string
  const chat = await getChat(params.id, userId)

  if (!chat) {
    redirect('/')
  }



  return (
    <AI initialAIState={{ chatId: chat.id, messages: chat.messages }}>
      <Chat
        id={chat.id}
        session={session}
        initialMessages={chat.messages}
        missingKeys={missingKeys}
      />
    </AI>
  )
}
