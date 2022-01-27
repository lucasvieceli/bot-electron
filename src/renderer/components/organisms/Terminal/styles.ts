import styled from 'styled-components'
import { colors } from '../../../layout/colors'
import { TextRegular15 } from '../../../layout/Fonts/regular'

export const Container = styled.div`
  background-color: #300a24;
  color: #fff;
  font-family: 'Ubuntu Mono', monospace;
  display: flex;
  flex-direction: column;
  background-size: cover;
  border-radius: 15px;
  flex: 1;
  border: 3px solid ${colors.white};
  background-repeat: no-repeat;
  padding: 5px;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 300px;
  justify-content: flex-end;
`
export const Content = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`
export const Teste = styled(TextRegular15)``
