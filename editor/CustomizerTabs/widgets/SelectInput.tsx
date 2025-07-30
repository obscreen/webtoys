"use client"
import * as S from "../styled"

interface SelectOption {
  value: string
  label: string
}

interface SelectInputProps {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
}

export function SelectInput({ value, onChange, options }: SelectInputProps) {
  return (
    <S.ConfigSelect value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </S.ConfigSelect>
  )
}
