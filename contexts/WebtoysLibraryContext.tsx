import React, { createContext, useState, useEffect, ReactNode, useContext } from "react"
import { loadAllWebtoys } from "@/lib/webtoy-loader"
import type { WebtoyDefinition } from "@/types/webtoy"

interface WebtoysLibraryContextType {
  loadedWebtoys: Record<string, WebtoyDefinition>
  isLoading: boolean
}

export const WebtoysLibraryContext = createContext<WebtoysLibraryContextType>({
  loadedWebtoys: {},
  isLoading: true,
})

export function WebtoysLibraryProvider({ children }: { children: ReactNode }) {
  const [loadedWebtoys, setLoadedWebtoys] = useState<Record<string, WebtoyDefinition>>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    const loadWebtoys = async () => {
      const webtoys = await loadAllWebtoys()

      if (isMounted) {
        setLoadedWebtoys(webtoys)
        setIsLoading(false)
      }
    }
    loadWebtoys()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <WebtoysLibraryContext.Provider value={{ loadedWebtoys, isLoading }}>
      {children}
    </WebtoysLibraryContext.Provider>
  )
}

export const useWebtoysLibrary = () => {
  const { loadedWebtoys, isLoading } = useContext(WebtoysLibraryContext)
  return { loadedWebtoys, isLoading }
}