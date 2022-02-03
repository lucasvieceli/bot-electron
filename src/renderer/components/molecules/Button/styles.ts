import styled from 'styled-components';
import { colors } from '../../../layout/colors';
import { TextMedium13 } from '../../../layout/Fonts/medium';
import { ButtonColors, ButtonType, ContainerProps } from './types';

const colorsType: ButtonColors = {
    [ButtonType.DANGER]: {
        background: colors.red,
        text: colors.white,
    },
    [ButtonType.SUCCESS]: {
        background: colors.orange,
        text: colors.white,
    },
};

export const Container = styled.button<ContainerProps>`
    background-color: ${({ typeButton }) => colorsType[typeButton].background};
    padding: 0 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    border-radius: 15px;
`;
export const TextTitle = styled(TextMedium13)<ContainerProps>`
    color: ${({ typeButton }) => colorsType[typeButton].text};
`;
