import styled from 'styled-components';
import {
    WINDOW_BOMBCRYPTO_HEIGHT,
    WINDOW_BOMBCRYPTO_IFRAME_HEIGHT,
    WINDOW_BOMBCRYPTO_IFRAME_WIDTH,
    WINDOW_BOMBCRYPTO_TOOL_BAR_HEIGHT,
    WINDOW_BOMBCRYPTO_WIDTH,
} from '../../../../variables';
import { colors } from '../../../layout/colors';

export const Container = styled.div`
    background: ${colors.almostBlack};
    max-width: ${WINDOW_BOMBCRYPTO_WIDTH}px;
    max-height: ${WINDOW_BOMBCRYPTO_HEIGHT}px;
    overflow: hidden;
`;

export const Iframe = styled.iframe`
    max-width: ${WINDOW_BOMBCRYPTO_IFRAME_WIDTH}px;
    max-height: ${WINDOW_BOMBCRYPTO_IFRAME_HEIGHT}px;
    width: ${WINDOW_BOMBCRYPTO_IFRAME_WIDTH}px;
    height: ${WINDOW_BOMBCRYPTO_IFRAME_HEIGHT}px;
    display: block;
`;

export const ToolBar = styled.div`
    height: ${WINDOW_BOMBCRYPTO_TOOL_BAR_HEIGHT}px;
    align-items: center;
    flex-direction: row;
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    gap: 20px;
`;

export const Text = styled.div`
    align-items: center;
`;
