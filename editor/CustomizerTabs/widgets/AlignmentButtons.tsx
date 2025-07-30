"use client"
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react"
import { ButtonGroup } from "@/components/common/ButtonGroup/ButtonGroup"
import * as S from "../styled"

interface AlignmentButtonsProps {
  value: string
  onChange: (value: string) => void
}

export function AlignmentButtons({ value, onChange }: AlignmentButtonsProps) {
  return (
    <ButtonGroup>
      <S.ToggleButton $active={value === "left"} onClick={() => onChange("left")}>
        <AlignLeft size={16} />
      </S.ToggleButton>
      <S.ToggleButton $active={value === "center"} onClick={() => onChange("center")}>
        <AlignCenter size={16} />
      </S.ToggleButton>
      <S.ToggleButton $active={value === "right"} onClick={() => onChange("right")}>
        <AlignRight size={16} />
      </S.ToggleButton>
    </ButtonGroup>
  )
}
