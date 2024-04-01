"use client"

import { cache, useState } from 'react'
import { clearChats, getChats, saveChat } from '@/app/actions'
import { collection, orderBy, query } from 'firebase/firestore'

import { Button } from './ui/button'
import { ClearHistory } from '@/components/clear-history'
import { SidebarItems } from '@/components/sidebar-items'
import { ThemeToggle } from '@/components/theme-toggle'
import { db } from '@/lib/firebase/firebase'
import { useFirestoreCollectionData } from 'reactfire'

interface SidebarListProps {
  userId?: string
  children?: React.ReactNode
}

const loadChats = cache(async (userId?: string) => {
  return await getChats(userId)
})

export function SidebarList({ userId }: SidebarListProps) {
  const chatsCollections = collection(db, `users/${userId}/chat`);
  const chatsQuery = query(chatsCollections, orderBy('lastUpdated', 'desc'));
  const { status, data } = useFirestoreCollectionData(chatsQuery, {
    idField: 'id',
  });

  if (status === 'loading') {
    return <p>Loading...</p>;
  }
  console.log(data)
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">

        {data?.length ? (
          <div className="space-y-2 px-2">
            <SidebarItems chats={data as any} />
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">No chat history</p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between p-4">
        <ThemeToggle />
        <ClearHistory clearChats={clearChats} isEnabled={data?.length > 0} />
      </div>
    </div>
  )
}
