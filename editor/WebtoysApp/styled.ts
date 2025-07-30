import styled from "styled-components"
import { EditorColors } from "@/styles/editor-theme"

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${EditorColors.background};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`

export const MainContent = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
`

export const LeftPanel = styled.div`
  width: 300px;
  background: ${EditorColors.surface};
  border-right: 1px solid ${EditorColors.border};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`

export const CenterPanel = styled.div`
  flex: 1;
  background: ${EditorColors.surface};
  border-right: 1px solid ${EditorColors.border};
  display: flex;
  flex-direction: column;
  min-width: 0;
  max-width: calc(100vw - 620px);
`

export const RightPanel = styled.div`
  width: 320px;
  background: ${EditorColors.surface};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`
