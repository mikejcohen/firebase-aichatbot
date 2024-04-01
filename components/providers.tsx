'use client'

import * as React from 'react'

import { FirebaseAppProvider } from 'reactfire'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { SidebarProvider } from '@/lib/hooks/use-sidebar'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { TooltipProvider } from '@/components/ui/tooltip'
import { firebaseConfig } from '@/lib/firebase/firebase'

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <SidebarProvider>
        <TooltipProvider>
          <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            {children}
          </FirebaseAppProvider>
        </TooltipProvider>
      </SidebarProvider>
    </NextThemesProvider>
  )
}
