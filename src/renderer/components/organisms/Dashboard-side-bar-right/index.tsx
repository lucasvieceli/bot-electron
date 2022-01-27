import React, { FC } from 'react'
import { IconRobot } from '../../atoms'
import { DashboardTotals } from '../../molecules'
import { Container, Gap, TextTitle } from './styles'

interface DashboardSideBarRightProps {}

const DashboardSideBarRight: FC<DashboardSideBarRightProps> = ({}) => {
  return (
    <Container>
      <TextTitle>Dashboard</TextTitle>
      <DashboardTotals
        text="Média bcoin por dia"
        total="5,5"
        icon={<IconRobot color="white" width={25} />}
      />
      <Gap />
      <DashboardTotals
        text="Média bcoin por dia individual"
        total="5,5"
        icon={<IconRobot color="white" width={25} />}
      />
      <Gap />
      <DashboardTotals
        text="Total bcoin ontem"
        total="5,5"
        icon={<IconRobot color="white" width={25} />}
      />
      <Gap />
    </Container>
  )
}

export default DashboardSideBarRight
