import styled, { keyframes } from "styled-components"
import type { CountdownTheme } from "./themes"

const celebrate = keyframes`
  0%, 100% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.1) rotate(-5deg); }
  75% { transform: scale(1.1) rotate(5deg); }
`

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`

export const CountdownContainer = styled.div<{
  $theme: CountdownTheme
  $padding: boolean
  $backgroundColor: string
  $backgroundImage?: string
  $margin: number
  $isExpired: boolean
}>`
  padding: ${(props) => (props.$padding ? "20px" : "0")};
  margin: ${(props) => props.$margin}px;
  color: ${(props) => props.$theme.textColor};
  min-height: 250px;
  background: ${(props) => {
    if (props.$backgroundImage) {
      return `url(${props.$backgroundImage}) center/cover, ${props.$theme.gradient}`
    }
    return props.$theme.gradient
  }};
  box-shadow: ${(props) => props.$theme.shadow};
  border-radius: 12px;
  text-align: center;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  align-self: stretch;
  flex: 1;
`

export const EventHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;
  align-self: stretch;
`

export const EventPicture = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
`

export const EventMessage = styled.div`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 8px;
  background: rgba(255, 255, 255, 0.15);
  padding: 12px 20px;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 80%;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  word-break: break-word;
`

export const TargetInfo = styled.div`
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 20px;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
`

export const TimeDisplay = styled.div<{ $showFormat: boolean }>`
  font-size: ${(props) => (props.$showFormat ? "32px" : "48px")};
  font-weight: bold;
  margin-bottom: 16px;
  font-family: 'Courier New', monospace;
  animation: ${pulse} 2s ease-in-out infinite;
`

export const TimeUnit = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`

export const UnitBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 72px;
  max-width: 72px;
  width: 72px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 8px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`

export const UnitValue = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 4px;
  font-family: 'Courier New', monospace;
  animation: ${pulse} 2s ease-in-out infinite;
  width: 100%;
  text-align: center;
`

export const UnitLabel = styled.div`
  font-size: 11px;
  opacity: 0.8;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
  width: 100%;
  text-align: center;
`

export const ExpiredMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`

export const ExpiredIcon = styled.div`
  font-size: 64px;
  animation: ${celebrate} 1s ease-in-out infinite;
`

export const ExpiredText = styled.div`
  font-size: 32px;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`
