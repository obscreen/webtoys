"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

interface ModalConfig {
  id: string
  title: string
  content: ReactNode
  size?: "sm" | "md" | "lg" | "xl"
  onClose?: () => void
}

interface ModalContextType {
  modals: ModalConfig[]
  openModal: (config: ModalConfig) => void
  closeModal: (id: string) => void
  closeAllModals: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

interface ModalProviderProps {
  children: ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modals, setModals] = useState<ModalConfig[]>([])

  const openModal = (config: ModalConfig) => {
    setModals(prev => [...prev, config])
  }

  const closeModal = (id: string) => {
    setModals(prev => {
      const modal = prev.find(m => m.id === id)
      if (modal?.onClose) {
        modal.onClose()
      }
      return prev.filter(m => m.id !== id)
    })
  }

  const closeAllModals = () => {
    modals.forEach(modal => {
      if (modal.onClose) {
        modal.onClose()
      }
    })
    setModals([])
  }

  return (
    <ModalContext.Provider value={{
      modals,
      openModal,
      closeModal,
      closeAllModals
    }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
} 