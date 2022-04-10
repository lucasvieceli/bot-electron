import styled from 'styled-components';
import { colors } from '../../../layout/colors';
import { TextRegular12 } from '../../../layout/Fonts/regular';

export const Container = styled.div`
    background-color: ${colors.black};
    display: flex;
    padding: 30px 47px;
    flex-direction: column;
    flex: 1;
    gap: 30px;
`;
export const ContentSpinner = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
    flex: 1;
`;
export const Row = styled.div`
    display: flex;
    gap: 25px;
    flex-direction: row;
`;

export const TextTitle = styled(TextRegular12)`
    margin-bottom: 10px;
`;

export const TextSubTitle = styled(TextRegular12)`
  display: flex;
  padding 10px 25px;
  line-height: 20.8px;
  flex-wrap: wrap;
`;

export const Content = styled.div`
    background-color: ${colors.gray08};
    border-radius: 15px;
    padding: 10px 0px;
`;
export const ContainerBlock = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`;
