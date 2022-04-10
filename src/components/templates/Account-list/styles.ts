import styled from 'styled-components';
import { colors } from '../../../layout/colors';
import { TextRegular12, TextRegular15, TextRegular32 } from '../../../layout/Fonts/regular';

export const Container = styled.div`
    background: ${colors.black};
    display: flex;
    flex: 1;
    padding: 30px 47px;
    flex-direction: column; ;
`;
export const TextTitle = styled(TextRegular32)`
    margin-bottom: 10px;
`;

export const ContainerTitle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const TextSubTitle = styled(TextRegular15)`
  display: flex;
  padding 10px 0px;
  line-height: 20.8px;
  flex-wrap: wrap;
`;
