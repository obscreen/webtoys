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

export const ColorPickerContainer = styled.div`
  position: relative;
  width: 100%;
`

export const ColorPickerLabel = styled.label`
  display: block;
  margin-bottom: ${EditorSpacing.sm};
  font-size: ${EditorFontSizes.md};
  font-weight: ${EditorFontWeights.medium};
  color: ${EditorColors.textPrimary};
`

export const ColorPickerTrigger = styled.div`
  display: flex;
  align-items: center;
  gap: ${EditorSpacing.sm};
  padding: ${EditorSpacing.sm};
  border: 1px solid ${EditorColors.borderLight};
  border-radius: ${EditorBorderRadius.md};
  background: ${EditorColors.surface};
  cursor: pointer;
  transition: ${EditorTransitions.normal};
  
  &:hover {
    border-color: ${EditorColors.borderFocus};
  }
  
  &:focus-within {
    border-color: ${EditorColors.borderFocus};
    box-shadow: ${EditorShadows.focus};
  }
`

export const ColorPreview = styled.div<{ $color: string }>`
  width: 24px;
  height: 24px;
  border-radius: ${EditorBorderRadius.sm};
  background: ${(props) => props.$color};
  border: 1px solid ${EditorColors.borderLight};
  flex-shrink: 0;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
  position: relative;
  
  /* Checkerboard pattern for transparency */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(45deg, #ccc 25%, transparent 25%), 
      linear-gradient(-45deg, #ccc 25%, transparent 25%), 
      linear-gradient(45deg, transparent 75%, #ccc 75%), 
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
    background-size: 8px 8px;
    background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
    border-radius: ${EditorBorderRadius.sm};
    z-index: -1;
  }
`

export const ColorValue = styled.div`
  flex: 1;
  font-size: ${EditorFontSizes.md};
  color: ${EditorColors.textPrimary};
  font-family: 'Courier New', monospace;
`

export const DropdownIcon = styled.div<{ $isOpen: boolean }>`
  font-size: 10px;
  color: ${EditorColors.textSecondary};
  transition: ${EditorTransitions.fast};
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  flex-shrink: 0;
`

export const ColorPickerDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${EditorColors.surface};
  border: 1px solid ${EditorColors.borderLight};
  border-radius: ${EditorBorderRadius.md};
  box-shadow: ${EditorShadows.lg};
  padding: ${EditorSpacing.lg};
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  gap: ${EditorSpacing.md};
  min-width: 280px;
`

export const SaturationPicker = styled.div<{ $hue: number }>`
  width: 100%;
  height: 150px;
  border-radius: ${EditorBorderRadius.sm};
  position: relative;
  cursor: crosshair;
  background: 
    linear-gradient(to right, 
      #fff 0%, 
      hsl(${(props) => props.$hue}, 100%, 50%) 100%
    ),
    linear-gradient(to top, 
      #000 0%, 
      transparent 100%
    );
  background-blend-mode: multiply;
  border: 1px solid ${EditorColors.borderLight};
`

export const SaturationCursor = styled.div<{ $x: number; $y: number }>`
  position: absolute;
  width: 12px;
  height: 12px;
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(0, 0, 0, 0.3);
  transform: translate(-50%, -50%);
  left: ${(props) => props.$x}%;
  top: ${(props) => props.$y}%;
  pointer-events: none;
`

export const HueSlider = styled.div`
  width: 100%;
  height: 16px;
  border-radius: ${EditorBorderRadius.sm};
  position: relative;
  cursor: pointer;
  background: linear-gradient(to right, 
    #ff0000 0%, 
    #ffff00 16.66%, 
    #00ff00 33.33%, 
    #00ffff 50%, 
    #0000ff 66.66%, 
    #ff00ff 83.33%, 
    #ff0000 100%
  );
  border: 1px solid ${EditorColors.borderLight};
`

export const HueCursor = styled.div<{ $position: number }>`
  position: absolute;
  width: 4px;
  height: 20px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  transform: translateX(-50%);
  left: ${(props) => props.$position}%;
  top: -2px;
  pointer-events: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`

export const AlphaSlider = styled.div<{ $color: string }>`
  width: 100%;
  height: 16px;
  border-radius: ${EditorBorderRadius.sm};
  position: relative;
  cursor: pointer;
  border: 1px solid ${EditorColors.borderLight};
  background-image: 
    linear-gradient(45deg, #ccc 25%, transparent 25%), 
    linear-gradient(-45deg, #ccc 25%, transparent 25%), 
    linear-gradient(45deg, transparent 75%, #ccc 75%), 
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 8px 8px;
  background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, transparent, ${(props) => props.$color});
    border-radius: ${EditorBorderRadius.sm};
  }
`

export const AlphaCursor = styled.div<{ $position: number }>`
  position: absolute;
  width: 4px;
  height: 20px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  transform: translateX(-50%);
  left: ${(props) => props.$position}%;
  top: -2px;
  pointer-events: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  z-index: 10;
`

export const ColorPreviewLarge = styled.div<{ $color: string }>`
  width: 100%;
  height: 40px;
  border-radius: ${EditorBorderRadius.sm};
  background: ${(props) => props.$color};
  border: 1px solid ${EditorColors.borderLight};
  position: relative;
  
  /* Checkerboard pattern for transparency */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(45deg, #ccc 25%, transparent 25%), 
      linear-gradient(-45deg, #ccc 25%, transparent 25%), 
      linear-gradient(45deg, transparent 75%, #ccc 75%), 
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
    background-size: 12px 12px;
    background-position: 0 0, 0 6px, 6px -6px, -6px 0px;
    border-radius: ${EditorBorderRadius.sm};
    z-index: -1;
  }
`

export const ColorValues = styled.div`
  display: flex;
  gap: ${EditorSpacing.sm};
`

export const ColorValueGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const ColorValueLabel = styled.label`
  font-size: ${EditorFontSizes.xs};
  font-weight: ${EditorFontWeights.medium};
  color: ${EditorColors.textSecondary};
  text-align: center;
`

export const ColorValueInput = styled.input`
  width: 100%;
  padding: 4px 6px;
  border: 1px solid ${EditorColors.borderLight};
  border-radius: ${EditorBorderRadius.sm};
  font-size: ${EditorFontSizes.xs};
  text-align: center;
  background: ${EditorColors.backgroundLight};
  
  &:focus {
    outline: none;
    border-color: ${EditorColors.borderFocus};
  }
  
  /* Hide number input arrows */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  &[type=number] {
    -moz-appearance: textfield;
  }
`
