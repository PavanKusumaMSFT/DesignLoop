"use client"

import { useEffect, useState } from "react"

interface LoadingWrapperProps {
  children: React.ReactNode
}

/** Delays rendering children until styles are loaded, showing a spinner in the interim.
 * Wraps page content to prevent flash of unstyled content on initial load.
 * Instead of: letting raw unstyled HTML flash before CSS is applied. */
export default function LoadingWrapper({ children }: LoadingWrapperProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Wait for styles to load and DOM to be ready
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100) // Small delay to ensure all styles are applied

    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <div className={`content-visible`}>
      {children}
    </div>
  )
}
