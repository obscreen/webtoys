import styled from "styled-components"
import {
  EditorColors,
  EditorSpacing,
  EditorBorderRadius,
  EditorFontSizes,
  EditorTransitions,
  EditorFontWeights,
  EditorShadows,
  EditorBgGradient,
} from "@/styles/editor-theme"

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: ${EditorSpacing.sm} ${EditorSpacing.md};
  background: ${EditorColors.surface};
  border-bottom: 1px solid ${EditorColors.border};
  font-size: ${EditorFontSizes.xs};
`


export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  align-self: stretch;
  flex: 1;
  gap: ${EditorSpacing.sm};
`

export const TopLabel = styled.span`
  font-size: ${EditorFontSizes.xs};
  font-weight: ${EditorFontWeights.semibold};
  color: ${EditorColors.info};
`

export const TopButton = styled.button<{ $variant: "primary" | "secondary" | "success" | "warning" | "info" }>`
  color: white;
  border: 1px solid ${EditorColors.border};
  border-radius: ${EditorBorderRadius.md};
  padding: ${EditorSpacing.sm} ${EditorSpacing.md};
  background: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${EditorSpacing.sm};
  padding: ${EditorSpacing.xxs} ${EditorSpacing.sm};
  color: ${EditorColors.info};

  &:hover {
    border: 1px solid ${EditorColors.info};
    background: ${EditorColors.info};
    color: ${EditorColors.white};
  }
`

export const TopButtonIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const TopButtonText = styled.span`
  font-size: ${EditorFontSizes.md};
`






export const RightSection = styled.div`
  display: flex;
`


export const StatusSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${EditorSpacing.sm};
`

export const StatusItem = styled.div<{ $status: 'saving' | 'saved' | 'has-stored' }>`
  display: flex;
  align-items: center;
  gap: ${EditorSpacing.xs};
  padding: ${EditorSpacing.xs} ${EditorSpacing.sm};
  border-radius: ${EditorBorderRadius.sm};
  background: ${({ $status }) => {
    switch ($status) {
      case 'saving':
        return EditorColors.warning + '20'
      case 'saved':
        return EditorColors.success + '20'
      case 'has-stored':
        return EditorColors.info + '20'
      default:
        return 'transparent'
    }
  }};
  color: ${({ $status }) => {
    switch ($status) {
      case 'saving':
        return EditorColors.warning
      case 'saved':
        return EditorColors.success
      case 'has-stored':
        return EditorColors.info
      default:
        return EditorColors.textSecondary
    }
  }};
`

export const StatusIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StatusText = styled.span`
  font-size: ${EditorFontSizes.xs};
  font-weight: 500;
`

export const ActionsSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${EditorSpacing.xs};
  margin-left: ${EditorSpacing.sm};
`

export const ActionButton = styled.button<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: ${EditorBorderRadius.sm};
  background: ${({ $danger }) => 
    $danger ? EditorColors.error + '20' : EditorColors.surface
  };
  color: ${({ $danger }) => 
    $danger ? EditorColors.error : EditorColors.textSecondary
  };
  cursor: pointer;
  transition: ${EditorTransitions.normal};
  
  &:hover {
    background: ${({ $danger }) => 
      $danger ? EditorColors.error + '30' : EditorColors.backgroundLight
    };
    color: ${({ $danger }) => 
      $danger ? EditorColors.error : EditorColors.textPrimary
    };
  }
  
  &:active {
    transform: scale(0.95);
  }
` 
