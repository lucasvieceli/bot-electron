import React, { FC, ReactElement } from 'react'
import { Container, ContainerIcon, ContainerTitle, TextTitle } from './styles'

interface DashboardTotalsProps {
  text: string
  icon: ReactElement
  total: string
}

const DashboardTotals: FC<DashboardTotalsProps> = ({ icon, text, total }) => {
  return (
    <Container>
      <ContainerIcon>{icon}</ContainerIcon>
      <ContainerTitle>
        <TextTitle>{text}</TextTitle>
      </ContainerTitle>
      <TextTitle>{total}</TextTitle>
    </Container>
  )
}

export default DashboardTotals
