'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

/** Thin wrapper around next-themes ThemeProvider for app-wide light/dark theme context.
 * Composed from: NextThemesProvider.
 * Instead of: importing and configuring next-themes directly in layout files. */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
