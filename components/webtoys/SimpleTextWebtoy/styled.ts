import styled, { keyframes, css } from "styled-components"

const scrollHorizontal = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`

const scrollVertical = keyframes`
  0% { transform: translateY(100%); }
  100% { transform: translateY(-100%); }
`

export const TextContainer = styled.div<{
  $textAlign: string
  $backgroundColor: string
  $padding: boolean
  $scrollDirection: string
  $scrollSpeed: number
  $backgroundImage?: string
  $margin: number
}>`
  text-align: ${(props) => props.$textAlign};
  background: ${(props) =>
    props.$backgroundImage
      ? `url(${props.$backgroundImage}) center/cover, ${props.$backgroundColor}`
      : props.$backgroundColor};
  padding: ${(props) => (props.$padding ? "20px" : "0")};
  margin: ${(props) => props.$margin}px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.$textAlign === "left" ? "flex-start" : props.$textAlign === "right" ? "flex-end" : "center"};
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  align-self: stretch;
  flex: 1;

  ${(props) =>
    props.$scrollDirection !== "none" &&
    css`
    overflow: hidden;
  `}
`

export const Text = styled.div<{
  $fontSize: number
  $textColor: string
  $fontFamily: string
  $scrollDirection: string
  $scrollSpeed: number
}>`
  font-size: ${(props) => props.$fontSize}px;
  color: ${(props) => props.$textColor};
  font-weight: 500;
  line-height: 1.4;
  font-family: ${(props) => props.$fontFamily};
  white-space: ${(props) => (props.$scrollDirection === "horizontal" ? "nowrap" : "normal")};
  width: 100%;
  height: 100%;
  
  ${(props) =>
    props.$scrollDirection === "horizontal" &&
    css`
    animation: ${scrollHorizontal} ${props.$scrollSpeed}s linear infinite;
  `}

  ${(props) =>
    props.$scrollDirection === "vertical" &&
    css`
    animation: ${scrollVertical} ${props.$scrollSpeed}s linear infinite;
  `}
`
