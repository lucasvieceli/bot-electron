import styled from 'styled-components';
import { colors } from '../../../layout/colors';
import { TextRegular15 } from '../../../layout/Fonts/regular';
import { Input as InputRS } from 'reactstrap';

export const Row = styled.div`
    display: flex;
    gap: 25px;
    flex-direction: row;
    padding: 5px 25px;
    justify-content: space-between;
    align-items: center;
    &:hover {
        background: ${colors.black};
    }
`;
export const TextTitle = styled(TextRegular15)``;

export const Input = styled(InputRS)`
    width: 60px;
    // text-align: center;
`;
