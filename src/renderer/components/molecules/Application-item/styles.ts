import styled from 'styled-components';
import { colors } from '../../../layout/colors';
import { TextMedium14 } from '../../../layout/Fonts/medium';

export const Container = styled.div`
    // display: flex;
    // flex-direction: column;
    // gap: 15px;
    // width: 128px;
    // height: 128px;
    // align-items: center;
    // background: red;
    // text-overflow: ellipsis;
    display: flex;
    gap: 10px;
    align-items: center;
    width: 100px;
    height: 128px;
    flex-direction: column;
`;
export const ContainerIcon = styled.button`
    justify-content: center;
    align-items: center;
    display: flex;
    width: 80px;
    height: 80px;
    flex: 0 1 auto;
    flex-shrink: 0;
    background: ${colors.gray08};
    border-radius: 15px;
`;
export const Button = styled.button`
    margin: 0;
    padding: 0;
    display: flex;
`;

export const TextTitle = styled(TextMedium14)`
    color: ${colors.white};
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
`;

export const Icon = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 30px;
`;
