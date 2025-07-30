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

export const CustomizerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 320px;
  flex-shrink: 0;
`

export const Header = styled.div`
  padding: 0;
  border-bottom: 1px solid ${EditorColors.border};
  flex-shrink: 0;
`

export const Title = styled.h2`
  margin: 0 0 ${EditorSpacing.lg} 0;
  font-size: ${EditorFontSizes.xl};
  font-weight: ${EditorFontWeights.semibold};
  color: ${EditorColors.textPrimary};
`

export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${EditorColors.border};
`

export const Tab = styled.button<{ $active: boolean }>`
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

export const ConfigContainer = styled.div`
  flex: 1;
  padding: ${EditorSpacing.xl};
  overflow-y: auto;
  min-height: 0;
`

export const ConfigGroup = styled.div`
  margin-bottom: ${EditorSpacing.xxl};
`

export const ConfigRow = styled.div`
  display: flex;
  gap: ${EditorSpacing.md};
  align-items: flex-end;
`

export const ConfigColumn = styled.div`
  flex: 1;
  min-width: 0;
`

export const ConfigLabel = styled.label`
  display: block;
  margin-bottom: ${EditorSpacing.sm};
  font-size: ${EditorFontSizes.md};
  font-weight: ${EditorFontWeights.medium};
  color: ${EditorColors.textPrimary};
`

export const ConfigInput = styled.input`
  width: 100%;
  padding: ${EditorSpacing.sm} ${EditorSpacing.md};
  border: 1px solid ${EditorColors.borderLight};
  border-radius: ${EditorBorderRadius.md};
  font-size: ${EditorFontSizes.md};
  transition: ${EditorTransitions.normal};
  
  &:focus {
    outline: none;
    border-color: ${EditorColors.borderFocus};
    box-shadow: ${EditorShadows.focus};
  }
`

export const DateTimeInput = styled.input`
  width: 100%;
  padding: ${EditorSpacing.sm} ${EditorSpacing.md};
  border: 1px solid ${EditorColors.borderLight};
  border-radius: ${EditorBorderRadius.md};
  font-size: ${EditorFontSizes.md};
  transition: ${EditorTransitions.normal};
  background: ${EditorColors.surface};
  color: ${EditorColors.textPrimary};
  
  &:focus {
    outline: none;
    border-color: ${EditorColors.borderFocus};
    box-shadow: ${EditorShadows.focus};
  }
  
  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    filter: invert(0.5);
    transition: ${EditorTransitions.fast};
  }
  
  &::-webkit-calendar-picker-indicator:hover {
    filter: invert(0.3);
  }
`

export const ConfigSelect = styled.select`
  width: 100%;
  padding: ${EditorSpacing.sm} ${EditorSpacing.md};
  border: 1px solid ${EditorColors.borderLight};
  border-radius: ${EditorBorderRadius.md};
  font-size: ${EditorFontSizes.md};
  background: ${EditorColors.surface};
  transition: ${EditorTransitions.normal};
  
  &:focus {
    outline: none;
    border-color: ${EditorColors.borderFocus};
    box-shadow: ${EditorShadows.focus};
  }
`

export const RangeContainer = styled.div`
  width: 100%;
`

export const RangeInput = styled.input`
  width: 100%;
  margin: ${EditorSpacing.sm} 0;
`

export const RangeValue = styled.span`
  font-size: ${EditorFontSizes.xs};
  color: ${EditorColors.textSecondary};
  font-weight: ${EditorFontWeights.medium};
`

export const ToggleButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: ${EditorSpacing.sm} ${EditorSpacing.md};
  border: none;
  background: ${(props) => (props.$active ? EditorColors.primary : EditorColors.surface)};
  color: ${(props) => (props.$active ? EditorColors.textLight : EditorColors.textSecondary)};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${EditorFontSizes.md};
  transition: ${EditorTransitions.normal};
  
  &:hover {
    background: ${(props) => (props.$active ? EditorColors.primaryHover : EditorColors.backgroundDark)};
  }
  
  &:not(:last-child) {
    border-right: 1px solid ${EditorColors.borderLight};
  }
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${EditorColors.textSecondary};
  text-align: center;
  padding: ${EditorSpacing.xl};
`

export const FileInput = styled.input`
  width: 100%;
  padding: ${EditorSpacing.sm} ${EditorSpacing.md};
  border: 1px solid ${EditorColors.borderLight};
  border-radius: ${EditorBorderRadius.md};
  font-size: ${EditorFontSizes.md};
  transition: ${EditorTransitions.normal};
  
  &:focus {
    outline: none;
    border-color: ${EditorColors.borderFocus};
    box-shadow: ${EditorShadows.focus};
  }
`

// Switch styles
export const SwitchContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
`

export const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
`

export const SwitchSlider = styled.label<{ $checked: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => (props.$checked ? EditorColors.primary : "#ccc")};
  transition: ${EditorTransitions.normal};
  border-radius: 24px;
  
  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: ${(props) => (props.$checked ? "29px" : "3px")};
    bottom: 3px;
    background-color: white;
    transition: ${EditorTransitions.normal};
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  &:hover {
    background-color: ${(props) => (props.$checked ? EditorColors.primaryHover : "#bbb")};
  }
`

// World Timezones specific styles
export const WorldTimezonesContainer = styled.div`
  width: 100%;
`

export const WorldTimezonesHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${EditorSpacing.md};

  span {
    font-size: ${EditorFontSizes.sm};
    font-weight: ${EditorFontWeights.medium};
    color: ${EditorColors.textMuted};
  }
`

export const AddTimezoneButton = styled.button`
  background: ${EditorColors.primary};
  border: none;
  border-radius: ${EditorBorderRadius.sm};
  color: ${EditorColors.textLight};
  padding: ${EditorSpacing.xs};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${EditorTransitions.fast};
  min-width: 28px;
  height: 28px;
  
  &:hover:not(:disabled) {
    background: ${EditorColors.primaryHover};
  }
  
  &:disabled {
    background: ${EditorColors.disabled};
    cursor: not-allowed;
  }
`

export const TimezonesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${EditorSpacing.sm};
`

export const TimezoneItem = styled.div`
  display: flex;
  gap: ${EditorSpacing.sm};
  align-items: center;
`

export const TimezoneSelect = styled.select`
  flex: 1;
  padding: ${EditorSpacing.sm} ${EditorSpacing.md};
  border: 1px solid ${EditorColors.borderLight};
  border-radius: ${EditorBorderRadius.md};
  font-size: ${EditorFontSizes.sm};
  background: ${EditorColors.surface};
  transition: ${EditorTransitions.normal};
  
  &:focus {
    outline: none;
    border-color: ${EditorColors.borderFocus};
    box-shadow: ${EditorShadows.focus};
  }
`

export const RemoveTimezoneButton = styled.button`
  background: ${EditorColors.danger};
  border: none;
  border-radius: ${EditorBorderRadius.sm};
  color: ${EditorColors.textLight};
  padding: ${EditorSpacing.xs};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${EditorTransitions.fast};
  min-width: 28px;
  height: 28px;
  
  &:hover {
    background: #c82333;
  }
`

export const EmptyTimezones = styled.div`
  text-align: center;
  padding: ${EditorSpacing.lg};
  color: ${EditorColors.textMuted};
  font-size: ${EditorFontSizes.sm};
  font-style: italic;
  border: 2px dashed ${EditorColors.borderLight};
  border-radius: ${EditorBorderRadius.md};
`

export const Footer = styled.div`
  padding: ${EditorSpacing.lg};
  border-top: 1px solid ${EditorColors.border};
  display: flex;
  gap: ${EditorSpacing.md};
  flex-direction: row;
`

export const FooterButton = styled.button<{ $variant: "primary" | "secondary" | "success" | "warning" | "info" }>`
  width: 100%;
  color: ${EditorColors.primary};
  border: 1px solid ${EditorColors.border};
  border-radius: ${EditorBorderRadius.md};
  padding: ${EditorSpacing.sm} ${EditorSpacing.md};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${EditorSpacing.sm};

  &:hover {
    background: ${EditorColors.hover};
  }
`

export const ButtonIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ButtonText = styled.span`
  font-size: ${EditorFontSizes.md};
`

export const ConfigTextarea = styled.textarea`
  width: 100%;
  padding: ${EditorSpacing.sm} ${EditorSpacing.md};
  border: 1px solid ${EditorColors.borderLight};
  border-radius: ${EditorBorderRadius.md};
  font-size: ${EditorFontSizes.md};
  transition: ${EditorTransitions.normal};
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  line-height: 1.5;
  
  &:focus {
    outline: none;
    border-color: ${EditorColors.borderFocus};
    box-shadow: ${EditorShadows.focus};
  }

  &::placeholder {
    color: ${EditorColors.textSecondary};
  }
`

export const TextareaContainer = styled.div`
  position: relative;
  width: 100%;
`

export const TextareaActions = styled.div`
  position: absolute;
  top: ${EditorSpacing.sm};
  right: ${EditorSpacing.sm};
  display: flex;
  gap: ${EditorSpacing.xs};
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: ${EditorBorderRadius.md};
  overflow: hidden;
`

export const TextareaActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: ${EditorColors.surface};
  border-radius: ${EditorBorderRadius.sm};
  color: ${EditorColors.textSecondary};
  cursor: pointer;
  transition: ${EditorTransitions.fast};
  opacity: 0.7;

  &:hover {
    opacity: 1;
    background: ${EditorColors.hover};
    color: ${EditorColors.textPrimary};
  }

  &:focus {
    outline: none;
    box-shadow: ${EditorShadows.focus};
  }
`

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`

export const ModalButton = styled.button<{ $variant: 'primary' | 'secondary' }>`
  padding: 0.5rem 1rem;
  font-size: ${EditorFontSizes.sm};
  border-radius: ${EditorBorderRadius.md};
  cursor: pointer;
  transition: ${EditorTransitions.normal};
  border: 1px solid ${props => props.$variant === 'primary' ? 'transparent' : EditorColors.borderLight};
  
  ${props => props.$variant === 'primary' ? `
    background: #3b82f6;
    color: white;
    
    &:hover {
      background: #2563eb;
    }
  ` : `
    background: ${EditorColors.surface};
    color: ${EditorColors.textPrimary};
    
    &:hover {
      background: ${EditorColors.hover};
    }
  `}

  &:focus {
    outline: none;
    box-shadow: ${EditorShadows.focus};
  }
`