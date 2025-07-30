import styled, { keyframes, css } from "styled-components"
import type { ClockTheme } from "@/components/webtoys/ClockWebtoy/themes"

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

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

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
`

// Digital Clock Styles
export const DigitalContainer = styled.div`
  text-align: center;
  width: 100%;
`

export const TimeDisplay = styled.div<{ $theme: ClockTheme; $enableAnimations: boolean }>`
  font-size: 3rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  color: ${(props) => props.$theme.primaryColor};
  margin-bottom: 0.5rem;
  
  ${(props) =>
    props.$enableAnimations &&
    css`
    animation: ${fadeInUp} 0.6s ease-out, ${pulse} 2s ease-in-out infinite;
  `}
`

export const DateDisplay = styled.div<{ $theme: ClockTheme; $enableAnimations: boolean }>`
  font-size: 1.1rem;
  color: ${(props) => props.$theme.secondaryColor};
  margin-bottom: 0.5rem;
  
  ${(props) =>
    props.$enableAnimations &&
    css`
    animation: ${fadeInUp} 0.8s ease-out 0.2s both;
  `}
`

export const TimezoneDisplay = styled.div<{ $theme: ClockTheme }>`
  font-size: 0.9rem;
  color: ${(props) => props.$theme.accentColor};
  opacity: 0.8;
`

// Analog Clock Styles
export const AnalogContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`

export const ClockFace = styled.div<{ $theme: ClockTheme; $compact?: boolean }>`
  width: ${(props) => (props.$compact ? "120px" : "200px")};
  height: ${(props) => (props.$compact ? "120px" : "200px")};
  border-radius: 50%;
  background: ${(props) => props.$theme.clockFace};
  border: ${(props) => (props.$compact ? "2px" : "4px")} solid ${(props) => props.$theme.primaryColor};
  position: relative;
  box-shadow: ${(props) => props.$theme.shadow};
`

export const HourMarker = styled.div<{ $angle: number; $theme: ClockTheme; $compact?: boolean }>`
  position: absolute;
  width: ${(props) => (props.$compact ? "1px" : "2px")};
  height: ${(props) => (props.$compact ? "10px" : "20px")};
  background: ${(props) => props.$theme.primaryColor};
  top: ${(props) => (props.$compact ? "5px" : "10px")};
  left: 50%;
  transform-origin: 50% ${(props) => (props.$compact ? "55px" : "90px")};
  transform: translateX(-50%) rotate(${(props) => props.$angle}deg);
`

export const HourHand = styled.div<{
  $angle: number
  $theme: ClockTheme
  $enableAnimations: boolean
  $compact?: boolean
}>`
  position: absolute;
  width: ${(props) => (props.$compact ? "2px" : "4px")};
  height: ${(props) => (props.$compact ? "30px" : "60px")};
  background: ${(props) => props.$theme.primaryColor};
  top: ${(props) => (props.$compact ? "30px" : "40px")};
  left: 50%;
  transform-origin: 50% 100%;
  transform: translateX(-50%) rotate(${(props) => props.$angle}deg);
  border-radius: ${(props) => (props.$compact ? "1px" : "2px")};
  
  ${(props) =>
    props.$enableAnimations &&
    css`
    transition: transform 0.5s ease-in-out;
  `}
`

export const MinuteHand = styled.div<{
  $angle: number
  $theme: ClockTheme
  $enableAnimations: boolean
  $compact?: boolean
}>`
  position: absolute;
  width: ${(props) => (props.$compact ? "1.5px" : "3px")};
  height: ${(props) => (props.$compact ? "40px" : "80px")};
  background: ${(props) => props.$theme.secondaryColor};
  top: ${(props) => (props.$compact ? "20px" : "20px")};
  left: 50%;
  transform-origin: 50% 100%;
  transform: translateX(-50%) rotate(${(props) => props.$angle}deg);
  border-radius: ${(props) => (props.$compact ? "0.75px" : "1.5px")};
  
  ${(props) =>
    props.$enableAnimations &&
    css`
    transition: transform 0.5s ease-in-out;
  `}
`

export const SecondHand = styled.div<{
  $angle: number
  $theme: ClockTheme
  $enableAnimations: boolean
  $compact?: boolean
}>`
  position: absolute;
  width: ${(props) => (props.$compact ? "0.5px" : "1px")};
  height: ${(props) => (props.$compact ? "45px" : "90px")};
  background: ${(props) => props.$theme.accentColor};
  top: ${(props) => (props.$compact ? "15px" : "10px")};
  left: 50%;
  transform-origin: 50% 100%;
  transform: translateX(-50%) rotate(${(props) => props.$angle}deg);
  
  ${(props) =>
    props.$enableAnimations &&
    css`
    transition: transform 0.1s ease-out;
  `}
`

export const CenterDot = styled.div<{ $theme: ClockTheme; $compact?: boolean }>`
  position: absolute;
  width: ${(props) => (props.$compact ? "6px" : "12px")};
  height: ${(props) => (props.$compact ? "6px" : "12px")};
  background: ${(props) => props.$theme.primaryColor};
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

// World Clocks Styles
export const WorldContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  width: 100%;
  max-width: 1000px;
`

export const WorldClockItem = styled.div<{ $theme: ClockTheme; $enableAnimations: boolean; $delay: number }>`
  background: ${(props) => props.$theme.clockFace};
  border: 1px solid ${(props) => props.$theme.primaryColor};
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  ${(props) =>
    props.$enableAnimations &&
    css`
    animation: ${slideInLeft} 0.6s ease-out ${props.$delay}s both;
  `}
`

export const CityName = styled.div<{ $theme: ClockTheme }>`
  font-size: 0.9rem;
  color: ${(props) => props.$theme.secondaryColor};
  margin-bottom: 0.5rem;
  text-transform: capitalize;
  font-weight: 500;
`

export const CityTime = styled.div<{ $theme: ClockTheme }>`
  font-size: 1.3rem;
  font-weight: bold;
  color: ${(props) => props.$theme.primaryColor};
  font-family: 'Courier New', monospace;
`
