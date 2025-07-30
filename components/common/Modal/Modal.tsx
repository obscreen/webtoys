"use client"

import React from "react"
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useModal } from "@/contexts/ModalContext"
import * as S from "./styled"

export function ModalRenderer() {
  const { modals, closeModal } = useModal()

  return (
    <>
      {modals.map(modal => (
        <Dialog 
          key={modal.id} 
          open={true} 
          onOpenChange={(open) => {
            if (!open) {
              closeModal(modal.id)
            }
          }}
        >
          <S.StyledDialogContent $size={modal.size || "md"}>
            <DialogHeader>
              <DialogTitle>{modal.title}</DialogTitle>
            </DialogHeader>
            <S.ModalContent>
              {modal.content}
            </S.ModalContent>
          </S.StyledDialogContent>
        </Dialog>
      ))}
    </>
  )
} 