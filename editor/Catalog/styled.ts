import styled from "styled-components"
import { Search } from "lucide-react"
import {
  EditorColors,
  EditorSpacing,
  EditorBorderRadius,
  EditorFontSizes,
  EditorFontWeights,
  EditorTransitions,
  EditorBgGradient,
  EditorShadows,
} from "@/styles/editor-theme"

export const CatalogContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const Header = styled.div`
  padding: ${EditorSpacing.xl};
  border-bottom: 1px solid ${EditorColors.border};
`

export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${EditorSpacing.md};
  margin-bottom: ${EditorSpacing.lg};
`

export const Logo = styled.div`
  font-size: 28px;
  background: ${EditorBgGradient.primary};
  border-radius: ${EditorBorderRadius.lg};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${EditorShadows.md};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -25px;
    left: -10px;
    width: 50px;
    height: 60px;
    opacity: 0.8;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 5px;
    left: -10px;
    width: 60px;
    height: 60px;
    opacity: 0.8;
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
  }
`

export const Title = styled.h2`
  margin: 0;
  font-size: ${EditorFontSizes.xl};
  font-weight: ${EditorFontWeights.semibold};
  color: ${EditorColors.textPrimary};
  background: ${EditorBgGradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

export const SearchContainer = styled.div`
  position: relative;
`

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px ${EditorSpacing.md} 10px 40px;
  border: 1px solid ${EditorColors.borderLight};
  border-radius: ${EditorBorderRadius.lg};
  font-size: ${EditorFontSizes.md};
  outline: none;
  transition: ${EditorTransitions.normal};
  
  &:focus {
    border-color: ${EditorColors.borderFocus};
    box-shadow: ${EditorShadows.focus};
  }
`

export const SearchIcon = styled(Search)`
  position: absolute;
  left: ${EditorSpacing.md};
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: ${EditorColors.textSecondary};
`

export const WebtoysList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${EditorSpacing.lg};
`

export const WebtoyCard = styled.div`
  padding: ${EditorSpacing.lg};
  border: 1px solid ${EditorColors.border};
  border-radius: ${EditorBorderRadius.lg};
  margin-bottom: ${EditorSpacing.md};
  cursor: default;
  transition: ${EditorTransitions.normal};
  background: ${EditorColors.surface};
  
  &:hover {
    border-color: ${EditorColors.primary};
    box-shadow: ${EditorShadows.md};
  }
`

export const WebtoyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${EditorSpacing.sm};
`

export const WebtoyIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${EditorBorderRadius.md};
  background: ${EditorBgGradient.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${EditorSpacing.lg};
  margin-right: ${EditorSpacing.md};
`

export const WebtoyInfo = styled.div`
  flex: 1;
`

export const WebtoyTitle = styled.h3`
  margin: 0;
  font-size: ${EditorFontSizes.md};
  font-weight: ${EditorFontWeights.semibold};
  color: ${EditorColors.textPrimary};
`

export const WebtoyAuthor = styled.p`
  margin: 2px 0 0 0;
  font-size: ${EditorFontSizes.xs};
  color: ${EditorColors.textSecondary};
`

export const AddButton = styled.button`
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
  
  &:hover {
    background: ${EditorColors.primaryHover};
  }
`

export const WebtoyDescription = styled.p`
  margin: ${EditorSpacing.sm} 0 0 0;
  font-size: ${EditorFontSizes.sm};
  color: ${EditorColors.textSecondary};
  line-height: 1.4;
`

export const GithubLink = styled.a`
  display: inline-flex;
  align-items: center;
  font-size: ${EditorFontSizes.xs};
  color: ${EditorColors.primary};
  text-decoration: none;
  margin-top: ${EditorSpacing.sm};
  transition: ${EditorTransitions.fast};
  
  &:hover {
    text-decoration: underline;
  }
  
  svg {
    margin-right: ${EditorSpacing.xs};
  }
`
