'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

export const reactQueryClient = new QueryClient()

export default function TanStackQueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={reactQueryClient}>{children}</QueryClientProvider>
  )
}