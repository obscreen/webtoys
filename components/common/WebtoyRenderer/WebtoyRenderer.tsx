"use client"
import { useEffect, useState } from "react"
import type { WebtoyConfig, WebtoyDefinition } from "@/types/webtoy"

interface WebtoyRendererProps {
  definition: WebtoyDefinition
  config: WebtoyConfig
}

export function WebtoyRenderer({ definition, config }: WebtoyRendererProps) {
  const [Component, setComponent] = useState<React.ComponentType<{ config: WebtoyConfig }> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const loadComponent = async () => {
      try {
        setIsLoading(true)
        setError(null)
        // Dynamically import the webtoy component
        const module = await import(`@/components/webtoys/${definition.className}/${definition.className}.tsx`)
        const MainWebtoyComponent = module[definition.className]
        
        if (MainWebtoyComponent) {
          setComponent(() => MainWebtoyComponent)
        } else {
          setError(`Component ${definition.className} not found in module`)
        }
      } catch (err) {
        console.error(`Failed to load webtoy component ${definition.className}:`, err)
        setError(`Failed to load component: ${err instanceof Error ? err.message : 'Unknown error'}`)
      } finally {
        setIsLoading(false)
      }
    }
    loadComponent()
  }, [definition.className, isMounted])

  // Don't render anything until mounted to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  if (isLoading) {
    return null;
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!Component) {
    return <div>Component not found</div>
  }

  return <Component config={config} />
}
