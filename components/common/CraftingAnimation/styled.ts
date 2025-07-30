import styled, { keyframes } from "styled-components"
import {
  EditorColors,
  EditorSpacing,
  EditorBorderRadius,
  EditorFontSizes,
  EditorFontWeights,
} from "@/styles/editor-theme"

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${EditorSpacing.xl};
  gap: ${EditorSpacing.lg};
`

export const AnimationWrapper = styled.div`
  width: 128px;
  height: 128px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${EditorSpacing.xl};
  
  &::before {
    content: '';
    width: 32px;
    height: 32px;
    border: 2px solid ${EditorColors.border};
    border-top: 2px solid ${EditorColors.primary};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
  }
`

export const Content = styled.div`
  text-align: center;
`

export const Title = styled.h3`
  font-size: ${EditorFontSizes.lg};
  font-weight: ${EditorFontWeights.semibold};
  color: ${EditorColors.textPrimary};
  margin-bottom: ${EditorSpacing.sm};
`

export const Subtitle = styled.p`
  font-size: ${EditorFontSizes.sm};
  color: ${EditorColors.textSecondary};
` 