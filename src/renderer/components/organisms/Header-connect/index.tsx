import React, { FC } from 'react'
import {
  Bar,
  Container,
  Content,
  Left,
  TextSubTitle,
  TextTitle,
} from './styles'
import { colors } from '../../../layout/colors'
import { IconRobot } from '../../atoms'
import { Button } from '../../molecules'
import { ButtonType } from '../../molecules/Button/types'

interface HeaderConnectProps {}

const HeaderConnect: FC<HeaderConnectProps> = ({}) => {
  return (
    <Container>
      <Bar />
      <Left>
        <IconRobot color={colors.lightGray} width={50} />
        <Content>
          <TextTitle>Desconectado</TextTitle>
          <TextSubTitle>
            Localizado 3 janelas com nome de Bombercrypto
          </TextSubTitle>
        </Content>
      </Left>
      <Button
        text="Connectar"
        type={ButtonType.DANGER}
        onPress={() => console.log('iashdiasjdiajs')}
      />
    </Container>
  )
}

export default HeaderConnect
