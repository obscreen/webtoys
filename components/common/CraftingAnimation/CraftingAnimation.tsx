"use client"

import * as S from "./styled"

export function CraftingAnimation() {
  return (
    <S.Container>
      <S.AnimationWrapper>
        <S.LoadingSpinner />
      </S.AnimationWrapper>
      <S.Content>
        <S.Title>Crafting your WebToy...</S.Title>
        <S.Subtitle>This will just take a moment</S.Subtitle>
      </S.Content>
    </S.Container>
  )
} 