import styled from 'styled-components'
import { colors } from '../../../layout/colors'

export const Container = styled.div`
  background-color: ${colors.almostBlack};
  width: 80px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  left 0;
`
export const ContentLogo = styled.div`
  margin: 33px 0;
`

export const Logo = styled.img`
  width: 64px;
  height: 64px;
`

export const Gap = styled.div`
  height: 20px;
`
