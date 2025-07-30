"use client"

import React, { useState } from "react"
import { ExternalLink } from "lucide-react"
import { useModal } from "@/contexts/ModalContext"
import * as S from "../styled"

interface TextareaInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
}

function ExpandedTextareaModal({ 
  value, 
  onChange, 
  placeholder, 
  onClose 
}: { 
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onClose: () => void
}) {
  const [localValue, setLocalValue] = useState(value)

  const handleSave = () => {
    onChange(localValue)
    onClose()
  }

  const handleCancel = () => {
    setLocalValue(value) // Reset to original value
    onClose()
  }

  return (
    <S.ModalContainer>
      <S.ConfigTextarea
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        rows={15}
        style={{ minHeight: '300px' }}
      />
      <S.ModalActions>
        <S.ModalButton $variant="secondary" onClick={handleCancel}>
          Cancel
        </S.ModalButton>
        <S.ModalButton $variant="primary" onClick={handleSave}>
          Save
        </S.ModalButton>
      </S.ModalActions>
    </S.ModalContainer>
  )
}

export function TextareaInput({ value, onChange, placeholder, rows = 3 }: TextareaInputProps) {
  const { openModal, closeModal } = useModal()

  const handleExpandClick = () => {
    const modalId = `textarea-expand-${Date.now()}`
    openModal({
      id: modalId,
      title: "Edit Text Content",
      size: "xl",
      content: (
        <ExpandedTextareaModal
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onClose={() => closeModal(modalId)}
        />
      )
    })
  }

  return (
    <S.TextareaContainer>
      <S.ConfigTextarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
      />
      <S.TextareaActions>
        <S.TextareaActionButton
          type="button"
          onClick={handleExpandClick}
          title="Open in expanded editor"
        >
          <ExternalLink size={14} />
        </S.TextareaActionButton>
      </S.TextareaActions>
    </S.TextareaContainer>
  )
} 