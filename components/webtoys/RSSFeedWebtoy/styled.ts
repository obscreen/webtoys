import styled, { keyframes, css } from "styled-components"

const scrollHorizontal = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`

const scrollVertical = keyframes`
  0% { transform: translateY(100%); }
  100% { transform: translateY(-100%); }
`

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const FeedContainer = styled.div<{
  $backgroundColor: string
  $padding: boolean
  $scrollDirection: string
  $scrollSpeed: number
  $backgroundImage?: string
  $margin: number
}>`
  background: ${(props) =>
    props.$backgroundImage
      ? `url(${props.$backgroundImage}) center/cover, ${props.$backgroundColor}`
      : props.$backgroundColor};
  padding: ${(props) => (props.$padding ? "20px" : "0")};
  margin: ${(props) => props.$margin}px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-self: stretch;
  flex: 1;
`

export const ErrorBanner = styled.div<{ $usingMockData: boolean }>`
  background: ${(props) => (props.$usingMockData ? "#fff3cd" : "#f8d7da")};
  color: ${(props) => (props.$usingMockData ? "#856404" : "#721c24")};
  padding: 8px 12px;
  margin-bottom: 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid ${(props) => (props.$usingMockData ? "#ffeaa7" : "#f5c6cb")};
  animation: ${slideDown} 0.3s ease-out;
`

export const FeedContent = styled.div<{
  $scrollDirection: string
  $scrollSpeed: number
}>`
  flex: 1;
  
  ${(props) =>
    props.$scrollDirection === "horizontal" &&
    css`
    display: flex;
    white-space: nowrap;
    animation: ${scrollHorizontal} ${props.$scrollSpeed}s linear infinite;
  `}

  ${(props) =>
    props.$scrollDirection === "vertical" &&
    css`
    animation: ${scrollVertical} ${props.$scrollSpeed}s linear infinite;
  `}

  ${(props) =>
    props.$scrollDirection === "none" &&
    css`
    display: flex;
    flex-direction: column;
    gap: 12px;
  `}
`

export const FeedItem = styled.div<{
  $scrollDirection: string
  $textColor: string
  $fontSize: number
  $fontFamily: string
}>`
  color: ${(props) => props.$textColor};
  font-size: ${(props) => props.$fontSize}px;
  font-family: ${(props) => props.$fontFamily};
  line-height: 1.4;
  
  ${(props) =>
    props.$scrollDirection === "horizontal" &&
    css`
    margin-right: 40px;
    white-space: nowrap;
  `}

  ${(props) =>
    props.$scrollDirection === "vertical" &&
    css`
    margin-bottom: 20px;
  `}

  ${(props) =>
    props.$scrollDirection === "none" &&
    css`
    padding: 12px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    border-left: 3px solid rgba(255, 255, 255, 0.3);
  `}
`

export const LoadingMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 150px;
  color: #666;
  font-style: italic;
  gap: 16px;
`

export const LoadingSpinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #007acc;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #e74c3c;
  font-weight: 500;
  background: rgba(231, 76, 60, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(231, 76, 60, 0.2);
`
