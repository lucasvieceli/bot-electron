import styled from 'styled-components'
import { colors } from '../../../layout/colors'
import { TextMedium14 } from '../../../layout/Fonts/medium'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 15px;
`

export const ContainerIcon = styled.div`
  background-color: ${colors.gray08};
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  display: flex;
  height: 45px;
  width: 45px;
`
export const TextTitle = styled(TextMedium14)``

export const ContainerTitle = styled.div`
  display: flex;
  flex: 1;
  margin: 0 15px;
`
