"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

interface NavigationContextType {
  selectedPage: string | null
  setSelectedPage: (pageId: string | null) => void
  isZooming: boolean
  setIsZooming: (isZooming: boolean) => void
  handlePageChange: (pageId: string, sourcePage?: string) => void
  sourcePage: string | null
  searchQuery: string | null
  setSearchQuery: (query: string | null) => void
  customHeader: React.ReactNode | null
  setCustomHeader: (header: React.ReactNode | null) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedPage, setSelectedPage] = useState<string | null>(null)
  const [isZooming, setIsZooming] = useState(false)
  const [sourcePage, setSourcePage] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string | null>(null)
  const [customHeader, setCustomHeader] = useState<React.ReactNode | null>(null)

  const handlePageChange = (pageId: string, sourcePageId?: string) => {
    console.log("[v0] NavigationContext: handlePageChange called with pageId:", pageId, "from source:", sourcePageId)

    // Track the source page for special navigation flows
    if (sourcePageId) {
      setSourcePage(sourcePageId)
    } else {
      setSourcePage(selectedPage) // Use current page as source if not specified
    }

    // First set zooming to true to start the transition
    setIsZooming(true)

    // Wait for transition to complete before changing the page
    setTimeout(() => {
      // Empty string means go back to sitemap
      const newSelectedPage = pageId === "" ? null : pageId
      console.log("[v0] NavigationContext: Setting selectedPage to:", newSelectedPage)
      setSelectedPage(newSelectedPage)

      window.scrollTo({ top: 0, behavior: "smooth" })

      // Small delay before removing zoom effect on the new view
      setTimeout(() => {
        setIsZooming(false)
      }, 50)
    }, 300)
  }

  return (
    <NavigationContext.Provider
      value={{
        selectedPage,
        setSelectedPage,
        isZooming,
        setIsZooming,
        handlePageChange,
        sourcePage,
        searchQuery,
        setSearchQuery,
        customHeader,
        setCustomHeader,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    return {
      selectedPage: null,
      setSelectedPage: () => {},
      isZooming: false,
      setIsZooming: () => {},
      handlePageChange: () => {},
      sourcePage: null,
      searchQuery: null,
      setSearchQuery: () => {},
      customHeader: null,
      setCustomHeader: () => {},
    }
  }
  return context
}
