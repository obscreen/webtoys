"use client"
import * as S from "../styled"

interface BooleanSwitchProps {
  value: boolean
  onChange: (value: boolean) => void
  id: string
}

export function BooleanSwitch({ value, onChange, id }: BooleanSwitchProps) {
  return (
    <S.SwitchContainer>
      <S.SwitchInput type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} id={id} />
      <S.SwitchSlider htmlFor={id} $checked={value} />
    </S.SwitchContainer>
  )
}
