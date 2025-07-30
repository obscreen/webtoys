import styled from "styled-components"
import { DialogContent } from "@/components/ui/dialog"

export const StyledDialogContent = styled(DialogContent)<{ $size: string }>`
  max-width: ${props => {
    switch (props.$size) {
      case 'sm': return '24rem'
      case 'md': return '28rem'
      case 'lg': return '32rem'
      case 'xl': return '36rem'
      default: return '28rem'
    }
  }};
  width: 100%;
  
  @media (min-width: 640px) {
    max-width: none;
  }
`

export const ModalContent = styled.div`
  padding: 1rem 0;
` 