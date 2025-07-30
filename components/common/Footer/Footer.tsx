"use client"
import styled from "styled-components"
import { EditorColors, EditorFontSizes, EditorSpacing } from "@/styles/editor-theme"

const FooterContainer = styled.footer`
  background: ${EditorColors.surface};
  border-top: 1px solid ${EditorColors.border};
  padding: ${EditorSpacing.md} ${EditorSpacing.xl};
  text-align: center;
  flex-shrink: 0;
`

const FooterText = styled.div`
  font-size: ${EditorFontSizes.xs};
  color: ${EditorColors.textMuted};
  
  a {
    color: ${EditorColors.primary};
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${EditorColors.primaryHover};
      text-decoration: underline;
    }
  }
`

export function Footer() {
  return (
    <FooterContainer>
      <FooterText>
        An{" "}
        <a href="https://obscreen.io" target="_blank" rel="noopener noreferrer">
          Obscreen
        </a>{" "}
        Product
      </FooterText>
    </FooterContainer>
  )
}
