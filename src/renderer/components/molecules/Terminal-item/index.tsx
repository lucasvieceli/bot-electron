import React, { FC } from 'react'
import { Container, TextMessage, TextSeparator, TextSystem } from './styles'

interface TerminalItemProps {
  text: string
}

const TerminalItem: FC<TerminalItemProps> = ({ text }) => {
  return (
    <Container>
      <TextSystem>sistema</TextSystem>
      <TextSeparator>:~$</TextSeparator>
      <TextMessage>{text}</TextMessage>
    </Container>
  )
}

export default TerminalItem
