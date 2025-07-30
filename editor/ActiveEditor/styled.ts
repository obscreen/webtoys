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

export const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  min-width: 0;
`

export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${EditorColors.border};
  background: ${EditorColors.backgroundDark};
  overflow-x: auto;
  flex-shrink: 0;
`

export const Tab = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  padding: ${EditorSpacing.md} ${EditorSpacing.lg};
  border-bottom: 2px solid ${(props) => (props.$active ? EditorColors.primary : "transparent")};
  background: ${(props) => (props.$active ? EditorColors.surface : "transparent")};
  cursor: pointer;
  white-space: nowrap;
  font-size: ${EditorFontSizes.md};
  color: ${(props) => (props.$active ? EditorColors.textPrimary : EditorColors.textSecondary)};
  transition: ${EditorTransitions.normal};
  min-width: 120px;
  max-width: 200px;
  overflow: hidden;
  
  &:hover {
    background: ${(props) => (props.$active ? EditorColors.surface : EditorColors.hover)};
  }
`

export const TabTitle = styled.span`
  margin-right: ${EditorSpacing.sm};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  flex: 1;
  min-width: 0;
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  border-radius: ${EditorBorderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${EditorColors.textSecondary};
  transition: ${EditorTransitions.fast};
  
  &:hover {
    background: ${EditorColors.active};
    color: ${EditorColors.textPrimary};
  }
`

export const PreviewContainer = styled.div`
  flex: 1;
  padding: ${EditorSpacing.xl};
  overflow: auto;
  background: ${EditorColors.backgroundLight};
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${EditorColors.textSecondary};
  text-align: center;
`

export const EmptyTitle = styled.h3`
  margin: 0 0 ${EditorSpacing.sm} 0;
  font-size: ${EditorFontSizes.xl};
  font-weight: ${EditorFontWeights.medium};
  color: ${EditorColors.textPrimary};
`

export const EmptyDescription = styled.p`
  margin: 0;
  font-size: ${EditorFontSizes.md};
  color: ${EditorColors.textSecondary};
`
