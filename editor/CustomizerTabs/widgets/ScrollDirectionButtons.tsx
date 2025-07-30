"use client"
import { ArrowRight, ArrowDown, Minus } from "lucide-react"
import { ButtonGroup } from "@/components/common/ButtonGroup/ButtonGroup"
import * as S from "../styled"

interface ScrollDirectionButtonsProps {
  value: string
  onChange: (value: string) => void
}

export function ScrollDirectionButtons({ value, onChange }: ScrollDirectionButtonsProps) {
  return (
    <ButtonGroup>
      <S.ToggleButton $active={value === "none"} onClick={() => onChange("none")}>
        <Minus size={16} />
      </S.ToggleButton>
      <S.ToggleButton $active={value === "horizontal"} onClick={() => onChange("horizontal")}>
        <ArrowRight size={16} />
      </S.ToggleButton>
      <S.ToggleButton $active={value === "vertical"} onClick={() => onChange("vertical")}>
        <ArrowDown size={16} />
      </S.ToggleButton>
    </ButtonGroup>
  )
}
