import styled from 'styled-components'
import { colors } from '../../../layout/colors'
import { TextRegular12 } from '../../../layout/Fonts/regular'

export const Container = styled.div`
  background-color: ${colors.almostBlack};
  padding: 43px 25px;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 387px;
`

export const TextTitle = styled(TextRegular12)`
  color: ${colors.gray};
  margin-bottom: 10px;
`

export const Gap = styled.div`
  height: 25px;
`
