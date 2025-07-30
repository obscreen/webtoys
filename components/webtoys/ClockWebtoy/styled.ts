import styled from "styled-components"
import type { ClockTheme } from "./themes"

export const ClockContainer = styled.div<{
  $theme: ClockTheme
  $backgroundColor: string
  $backgroundImage?: string
  $margin: number
  $padding: boolean
}>`
  padding: ${(props) => (props.$padding ? "24px" : "0")};
  margin: ${(props) => props.$margin}px;
  border-radius: 16px;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => {
    if (props.$backgroundImage) {
      return `url(${props.$backgroundImage}) center/cover, ${props.$theme.background}`
    }
    return props.$theme.background
  }};
  color: ${(props) => props.$theme.textColor};
  box-shadow: ${(props) => props.$theme.shadow};
  align-self: stretch;
  flex: 1;
`

export const ClockContent = styled.div<{ $showWorldClocks: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.$showWorldClocks ? "column" : "row")};
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: ${(props) => (props.$showWorldClocks ? "2rem" : "0")};
`

export const MainClockSection = styled.div<{ $showWorldClocks: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.$showWorldClocks &&
    `
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 1.5rem;
    width: 100%;
  `}
`

export const WorldClocksSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
