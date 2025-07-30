import styled from "styled-components"
import {
  EditorColors,
  EditorSpacing,
  EditorBorderRadius,
  EditorFontSizes,
  EditorFontWeights,
  EditorTransitions,
  EditorShadows,
} from "@/styles/editor-theme"

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${EditorSpacing.xl};
`

export const ModalContent = styled.div`
  background: ${EditorColors.surface};
  border-radius: ${EditorBorderRadius.xl};
  box-shadow: ${EditorShadows.xl};
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${EditorSpacing.xl};
  border-bottom: 1px solid ${EditorColors.border};
  flex-shrink: 0;
`

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: ${EditorFontSizes.xl};
  font-weight: ${EditorFontWeights.semibold};
  color: ${EditorColors.textPrimary};
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${EditorSpacing.xs};
  border-radius: ${EditorBorderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${EditorColors.textSecondary};
  transition: ${EditorTransitions.fast};
  
  &:hover {
    background: ${EditorColors.hover};
    color: ${EditorColors.textPrimary};
  }
`

export const ModalBody = styled.div`
  padding: ${EditorSpacing.xl};
  overflow-y: auto;
  flex: 1;
`

export const SectionTitle = styled.h3`
  margin: 0 0 ${EditorSpacing.md} 0;
  font-size: ${EditorFontSizes.lg};
  font-weight: ${EditorFontWeights.medium};
  color: ${EditorColors.textPrimary};
`

export const JsonTextarea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: ${EditorSpacing.md};
  border: 1px solid ${EditorColors.borderLight};
  border-radius: ${EditorBorderRadius.md};
  font-family: 'Courier New', monospace;
  font-size: ${EditorFontSizes.sm};
  resize: vertical;
  background: ${EditorColors.backgroundLight};
  color: ${EditorColors.textPrimary};
  
  &:focus {
    outline: none;
    border-color: ${EditorColors.borderFocus};
    box-shadow: ${EditorShadows.focus};
  }
  
  &::placeholder {
    color: ${EditorColors.textMuted};
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${EditorSpacing.md};
  margin-top: ${EditorSpacing.xl};
`

export const ActionButton = styled.button<{ $variant: "primary" | "secondary" | "success" | "warning" | "danger" | "info"; disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${EditorSpacing.sm};
  padding: ${EditorSpacing.md} ${EditorSpacing.lg};
  border: 1px solid ${(props) => {
    if (props.disabled) return EditorColors.disabled
    return EditorColors[props.$variant];
  }};
  color: ${(props) => {
    if (props.disabled) return EditorColors.disabled
    return EditorColors[props.$variant];
  }};
  border-radius: ${EditorBorderRadius.lg};
  font-size: ${EditorFontSizes.md};
  font-weight: ${EditorFontWeights.medium};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: ${EditorTransitions.normal};
  flex: 1;
  justify-content: center;
  
  &:hover:not(:disabled) {
    background: ${(props) => EditorColors[`${props.$variant}Hover`]};
    transform: translateY(-1px);
    box-shadow: ${EditorShadows.button};
    color: white;
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`

export const ImportMethodTabs = styled.div`
  display: flex;
  margin-bottom: ${EditorSpacing.xl};
  border-bottom: 1px solid ${EditorColors.border};
`

export const ImportTab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: ${EditorSpacing.md} ${EditorSpacing.lg};
  border: none;
  background: ${(props) => (props.$active ? EditorColors.surface : EditorColors.backgroundDark)};
  border-bottom: 2px solid ${(props) => (props.$active ? EditorColors.primary : "transparent")};
  cursor: pointer;
  font-size: ${EditorFontSizes.md};
  font-weight: ${EditorFontWeights.medium};
  color: ${(props) => (props.$active ? EditorColors.textPrimary : EditorColors.textSecondary)};
  transition: ${EditorTransitions.normal};
  
  &:hover {
    background: ${(props) => (props.$active ? EditorColors.surface : EditorColors.hover)};
  }
`

export const FileUploadArea = styled.div`
  margin-bottom: ${EditorSpacing.lg};
`

export const FileInput = styled.input`
  display: none;
`

export const FileUploadLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${EditorSpacing.md};
  padding: ${EditorSpacing.xxxl};
  border: 2px dashed ${EditorColors.borderLight};
  border-radius: ${EditorBorderRadius.lg};
  cursor: pointer;
  transition: ${EditorTransitions.normal};
  color: ${EditorColors.textSecondary};
  
  &:hover {
    border-color: ${EditorColors.primary};
    color: ${EditorColors.primary};
    background: ${EditorColors.primaryLight};
  }
  
  span {
    font-size: ${EditorFontSizes.md};
    font-weight: ${EditorFontWeights.medium};
  }
`

export const FilePreview = styled.div`
  margin-top: ${EditorSpacing.lg};
`

export const PreviewLabel = styled.div`
  margin-bottom: ${EditorSpacing.sm};
  font-size: ${EditorFontSizes.sm};
  font-weight: ${EditorFontWeights.medium};
  color: ${EditorColors.textSecondary};
`
