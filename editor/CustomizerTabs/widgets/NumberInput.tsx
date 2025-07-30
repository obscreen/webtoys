"use client"
import * as S from "../styled"

interface NumberInputProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

export function NumberInput({ value, onChange, min, max }: NumberInputProps) {
  return (
    <S.ConfigInput type="number" value={value} min={min} max={max} onChange={(e) => onChange(Number(e.target.value))} />
  )
}
