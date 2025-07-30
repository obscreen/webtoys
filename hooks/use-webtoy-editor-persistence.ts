import { useState, useEffect, useCallback, useRef } from 'react'
import type { WebtoyInstance, WebtoyConfig } from '@/types/webtoy'
import { LocalStorageManager, type ActiveEditorState } from '@/utils/local-storage'

interface UseActiveEditorPersistenceReturn {
  activeWebtoys: WebtoyInstance[]
  activeTabId: string | null
  searchTerm: string
  setActiveWebtoys: (webtoys: WebtoyInstance[]) => void
  setActiveTabId: (id: string | null) => void
  setSearchTerm: (term: string) => void
  addWebtoy: (webtoy: WebtoyInstance) => void
  removeWebtoy: (id: string) => void
  updateWebtoyConfig: (id: string, config: WebtoyConfig) => void
  clearStoredState: () => void
  hasStoredState: boolean
  isSaving: boolean
  lastSaved: Date | null
}

export function useActiveEditorPersistence(): UseActiveEditorPersistenceReturn {
  const [activeWebtoys, setActiveWebtoysState] = useState<WebtoyInstance[]>([])
  const [activeTabId, setActiveTabIdState] = useState<string | null>(null)
  const [searchTerm, setSearchTermState] = useState<string>('')
  const [hasStoredState, setHasStoredState] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  
  const isInitialized = useRef(false)
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  
  // Load initial state from localStorage
  useEffect(() => {
    if (isInitialized.current) return
    
    const storedState = LocalStorageManager.loadState()
    if (storedState) {
      setActiveWebtoysState(storedState.activeWebtoys as WebtoyInstance[])
      setActiveTabIdState(storedState.activeTabId)
      setSearchTermState(storedState.searchTerm)
      setHasStoredState(true)
      setLastSaved(new Date()) // Consider the loaded state as just saved
    }
    
    isInitialized.current = true
  }, [])

  // Save function with debounce
  const saveState = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }
    
    setIsSaving(true)
    
    saveTimeoutRef.current = setTimeout(() => {
      const state: ActiveEditorState = {
        activeWebtoys,
        activeTabId,
        searchTerm
      }
      LocalStorageManager.saveState(state)
      setIsSaving(false)
      setLastSaved(new Date())
    }, 300) // 300ms debounce
  }, [activeWebtoys, activeTabId, searchTerm])

  // Automatically save on every change,
  useEffect(() => {
    if (!isInitialized.current) return
    saveState()
  }, [activeWebtoys, activeTabId, searchTerm, saveState])

  // Clean up the timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [])

  const setActiveWebtoys = useCallback((webtoys: WebtoyInstance[]) => {
    setActiveWebtoysState(webtoys)
  }, [])

  const setActiveTabId = useCallback((id: string | null) => {
    setActiveTabIdState(id)
  }, [])

  const setSearchTerm = useCallback((term: string) => {
    setSearchTermState(term)
  }, [])

  const addWebtoy = useCallback((webtoy: WebtoyInstance) => {
    setActiveWebtoysState(prev => [...prev, webtoy])
    setActiveTabIdState(webtoy.id)
  }, [])

  const removeWebtoy = useCallback((id: string) => {
    setActiveWebtoysState(prev => {
      const filtered = prev.filter(w => w.id !== id)
      return filtered
    })
    
    setActiveTabIdState(prev => {
      if (prev === id) {
        const remaining = activeWebtoys.filter(w => w.id !== id)
        return remaining.length > 0 ? remaining[remaining.length - 1].id : null
      }
      return prev
    })
  }, [activeWebtoys])

  const updateWebtoyConfig = useCallback((id: string, config: WebtoyConfig) => {
    setActiveWebtoysState(prev => 
      prev.map(w => w.id === id ? { ...w, config } : w)
    )
  }, [])

  const clearStoredState = useCallback(() => {
    LocalStorageManager.clearState()
    setActiveWebtoysState([])
    setActiveTabIdState(null)
    setSearchTermState('')
    setHasStoredState(false)
    setLastSaved(null)
  }, [])

  return {
    activeWebtoys,
    activeTabId,
    searchTerm,
    setActiveWebtoys,
    setActiveTabId,
    setSearchTerm,
    addWebtoy,
    removeWebtoy,
    updateWebtoyConfig,
    clearStoredState,
    hasStoredState,
    isSaving,
    lastSaved
  }
} 