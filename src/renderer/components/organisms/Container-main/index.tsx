import React, { FC } from 'react'
import { Container } from './styles'

interface ContainerMainProps {}

const ContainerMain: FC<ContainerMainProps> = ({ children }) => {
  return <Container>{children}</Container>
}

export default ContainerMain
