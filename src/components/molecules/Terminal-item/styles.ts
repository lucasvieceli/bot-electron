import styled from 'styled-components'
import { colors } from '../../../layout/colors'
import { TextMedium12 } from '../../../layout/Fonts/medium'
import { TextRegular12 } from '../../../layout/Fonts/regular'

export const Container = styled.div`
  flex-direction: row;
  display: flex;
  margin 2px 0;
  &: hover {
    opacity: 0.5;
  }
`

export const TextSystem = styled(TextMedium12)`
  color: #8ada2f;
`

export const TextSeparator = styled(TextRegular12)`
  color: ${colors.white};
  margin-right: 10px;
`
export const TextMessage = styled(TextRegular12)`
  color: ${colors.white};
`
export const Turuncu = styled.div`
  color: #dd4814;
  font-weight: 700;
`

export const Mavi = styled.div`
  color: #76bfdd;
  font-weight: 700;
`
