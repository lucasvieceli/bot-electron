import styled from 'styled-components'
import { colors } from '../../../layout/colors'
import { ContainerProps } from './types'

export const Container = styled.a<ContainerProps>`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  display: flex;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ active, borderColor }) =>
    active ? colors.almostBlack : borderColor};
  background-color: ${({ active }) =>
    active ? 'rgba(199, 207, 214, 0.08)' : colors.almostBlack};
`
