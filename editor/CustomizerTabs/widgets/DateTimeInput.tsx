"use client"
import * as S from "../styled"

interface DateTimeInputProps {
  value: string
  onChange: (value: string) => void
  type: "date" | "time"
  step?: string
}

export function DateTimeInput({ value, onChange, type, step }: DateTimeInputProps) {
  return <S.DateTimeInput type={type} value={value} step={step} onChange={(e) => onChange(e.target.value)} />
}
