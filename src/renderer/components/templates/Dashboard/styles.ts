import styled from 'styled-components'
import { colors } from '../../../layout/colors'
import { TextRegular12 } from '../../../layout/Fonts/regular'

export const Container = styled.div`
  background-color: ${colors.black};
  display: flex;
  flex-direction: row;
  flex: 1;
`
export const Left = styled.div`
  padding: 30px 47px;
  flex-direction: column;
  flex: 1;
  display: flex;
`
export const Right = styled.div`
  display: flex;
`

export const ContainerTerminal = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const TextTitleContainer = styled(TextRegular12)`
  color: ${colors.gray};
  margin-bottom: 10px;
`
