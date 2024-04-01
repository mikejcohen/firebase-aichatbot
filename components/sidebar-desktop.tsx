"use client"

import { Button } from './ui/button'
import { ChatHistory } from '@/components/chat-history'
import { Sidebar } from '@/components/sidebar'
import { auth } from '@/lib/firebase/firebase'
import { saveChat } from '@/app/actions'

export function SidebarDesktop() {
  const session = auth.currentUser

  if (!session?.email) {
    return null
  }

  const storeChat = () => {
    console.log('store chat')
    saveChat({ id: '1', userId: '1', messages: [], title: 'Untitled', createdAt: new Date(), path: '/chat/1' })

  }

  return (
    <Sidebar className="peer absolute inset-y-0 z-30 hidden -translate-x-full border-r bg-muted duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]">
      {/* @ts-ignore */}
      <div className="space-y-2 px-2">
        <Button onClick={() => { storeChat() }}>Go</Button>
      </div>
      <ChatHistory userId={session.email} />
    </Sidebar>
  )
}
