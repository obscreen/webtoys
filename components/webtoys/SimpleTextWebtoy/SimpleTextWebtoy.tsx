"use client"
import React from "react"
import type { WebtoyConfig } from "@/types/webtoy"
import { AlignmentButtons } from "@/editor/CustomizerTabs/widgets/AlignmentButtons"
import { ScrollDirectionButtons } from "@/editor/CustomizerTabs/widgets/ScrollDirectionButtons"
import { interpolateRange } from "@/utils/util-math"
import { nl2br } from "@/utils/util-string"

import * as S from "./styled"

interface SimpleTextWebtoyProps {
  config: WebtoyConfig
}

export function SimpleTextWebtoy({ config }: SimpleTextWebtoyProps) {
  const {
    text = "Hello World!",
    fontSize = 24,
    textColor = "#333333",
    backgroundColor = "#ffffff",
    textAlign = "center",
    padding = true,
    scrollDirection = "none",
    scrollSpeed = 10,
    fontFamily = "Arial, sans-serif",
    backgroundImage = "",
    margin = 0,
  } = config

  // Convert scrollSpeed percent to seconds for animation
  const scrollSpeedSeconds = interpolateRange(scrollSpeed as number, 0, 100, 0.2, 20, true)

  return (
    <S.TextContainer
      $textAlign={textAlign as string}
      $backgroundColor={backgroundColor as string}
      $padding={padding as boolean}
      $scrollDirection={scrollDirection as string}
      $scrollSpeed={scrollSpeed as number}
      $backgroundImage={backgroundImage as string}
      $margin={margin as number}
    >
      <S.Text
        $fontSize={fontSize as number}
        $textColor={textColor as string}
        $fontFamily={fontFamily as string}
        $scrollDirection={scrollDirection as string}
        $scrollSpeed={scrollSpeedSeconds}
      >
        {nl2br(text as string)}
      </S.Text>
    </S.TextContainer>
  )
}

export function renderConfigField(field: any, value: any, onChange: (value: any) => void, config: any) {
  if (field.key === "textAlign") {
    return <AlignmentButtons value={value} onChange={onChange} />
  } else if (field.key === "scrollDirection") {
    return <ScrollDirectionButtons value={value} onChange={onChange} />
  }

  return null
}