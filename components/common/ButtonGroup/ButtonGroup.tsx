import type React from "react"
import styled from "styled-components"
import { EditorColors, EditorBorderRadius } from "@/styles/editor-theme"

const StyledButtonGroup = styled.div`
  display: flex;
  border-radius: ${EditorBorderRadius.md};
  overflow: hidden;
  border: 1px solid ${EditorColors.borderLight};
`

export function ButtonGroup({ children }: { children: React.ReactNode }) {
  return <StyledButtonGroup>{children}</StyledButtonGroup>
}
