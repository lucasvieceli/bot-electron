import styled from 'styled-components'
import { colors } from '../../../layout/colors'
import { TextRegular12, TextRegular16 } from '../../../layout/Fonts/regular'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${colors.gray08};
  height: 82px;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border-radius: 15px;
  padding: 0 22px;
`

export const Bar = styled.div`
  position: absolute;
  height: 46px;
  width: 7px;
  border-radius: 10px;
  background-color: ${colors.seledyn};

  left: -2.77px;
`

export const Left = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  margin-right: 10px;
`
export const Content = styled.div`
  margin-left: 10px;
  display: flex;
  flex: 1;
  flex-direction: column;
`

export const TextTitle = styled(TextRegular16)``
export const TextSubTitle = styled(TextRegular12)`
  margin-top: 5px;
`
