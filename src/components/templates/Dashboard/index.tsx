import React, { FC } from 'react'
import { ContainerMain, DashboardSideBarRight, HeaderConnect } from '../../organisms'
import { Terminal } from '../../organisms/Terminal'
import { Container, ContainerTerminal, Left, Right, TextTitleContainer } from './styles'

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
  return (
    <ContainerMain>
      <Container>
        <Left>
          <HeaderConnect />
          <ContainerTerminal>
            <TextTitleContainer>Terminal</TextTitleContainer>
            <Terminal />
          </ContainerTerminal>
        </Left>
        <Right>
          <DashboardSideBarRight />
        </Right>
      </Container>
    </ContainerMain>
  )
}

export default Dashboard
