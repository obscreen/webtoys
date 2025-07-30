"use client"
import * as S from "../styled"

interface RangeSliderProps {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  unit?: string
}

export function RangeSlider({ value, onChange, min, max, step = 1, unit = "" }: RangeSliderProps) {
  return (
    <S.RangeContainer>
      <S.RangeInput
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <S.RangeValue>
        {value}
        {unit}
      </S.RangeValue>
    </S.RangeContainer>
  )
}
