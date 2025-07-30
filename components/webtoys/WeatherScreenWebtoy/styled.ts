import styled, { keyframes, css } from "styled-components"
import type { WeatherTheme } from "./themes"

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const iconBounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`

export const WeatherContainer = styled.div<{
  $theme: WeatherTheme
  $backgroundImage?: string
  $margin: number
  $padding: boolean
}>`
  padding: ${(props) => (props.$padding ? "24px" : "0")};
  margin: ${(props) => props.$margin}px;
  border-radius: 16px;
  color: ${(props) => props.$theme.textColor};
  min-height: 250px;
  background: ${(props) => {
    if (props.$backgroundImage) {
      return `url(${props.$backgroundImage}) center/cover, ${props.$theme.gradient}`
    }
    return props.$theme.gradient
  }};
  box-shadow: ${(props) => props.$theme.shadow};
  align-self: stretch;
  flex: 1;
`

export const LocationHeader = styled.div<{ $enableAnimations: boolean; $delay: number }>`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 16px;
  opacity: 0.9;
  
  ${(props) =>
    props.$enableAnimations &&
    css`
    animation: ${slideInLeft} 0.6s ease-out ${props.$delay}s both;
  `}
`

export const MainWeather = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`

export const TemperatureSection = styled.div`
  display: flex;
  flex-direction: column;
`

export const Temperature = styled.div<{ $enableAnimations: boolean; $delay: number }>`
  font-size: 48px;
  font-weight: bold;
  line-height: 1;
  
  ${(props) =>
    props.$enableAnimations &&
    css`
    animation: ${slideInLeft} 0.8s ease-out ${props.$delay}s both;
  `}
`

export const Description = styled.div<{ $enableAnimations: boolean; $delay: number }>`
  font-size: 18px;
  opacity: 0.8;
  margin-top: 4px;
  
  ${(props) =>
    props.$enableAnimations &&
    css`
    animation: ${fadeIn} 0.6s ease-out ${props.$delay}s both;
  `}
`

export const WeatherIcon = styled.div<{ $enableAnimations: boolean; $delay: number }>`
  font-size: 64px;
  opacity: 0.9;
  
  ${(props) =>
    props.$enableAnimations &&
    css`
    animation: ${fadeIn} 0.6s ease-out ${props.$delay}s both,
               ${iconBounce} 2s ease-in-out ${props.$delay + 0.6}s infinite;
  `}
`

export const WeatherDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
`

export const DetailItem = styled.div<{ $enableAnimations: boolean; $delay: number }>`
  text-align: center;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  
  ${(props) =>
    props.$enableAnimations &&
    css`
    animation: ${slideInLeft} 0.5s ease-out ${props.$delay}s both;
  `}
`

export const DetailLabel = styled.div`
  font-size: 12px;
  opacity: 0.7;
  margin-bottom: 4px;
  text-transform: uppercase;
`

export const DetailValue = styled.div`
  font-size: 16px;
  font-weight: 600;
`
