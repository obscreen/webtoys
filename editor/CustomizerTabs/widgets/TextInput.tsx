"use client"
import * as S from "../styled"

interface TextInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: "text" | "url"
}

export function TextInput({ value, onChange, placeholder, type = "text" }: TextInputProps) {
  return (
    <S.ConfigInput type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
  )
}
