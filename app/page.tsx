"use client"

import { WebtoysApp } from "@/editor/WebtoysApp/WebtoysApp"
import { WebtoysLibraryProvider } from "@/contexts/WebtoysLibraryContext"
import { ModalProvider } from "@/contexts/ModalContext"
import { ModalRenderer } from "@/components/common/Modal/Modal"

export default function Home() {
  return (
    <WebtoysLibraryProvider>
      <ModalProvider>
        <WebtoysApp />
        <ModalRenderer />
      </ModalProvider>
    </WebtoysLibraryProvider>
  )
}
