import { ipcRenderer, IpcRendererEvent } from 'electron';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    EVENT_GAME_LOOP_BROWSER,
    EVENT_GAME_LOOP_CONTINUE,
    EVENT_GAME_LOOP_PAUSE,
    EVENT_GAME_LOOP_START,
    EVENT_GAME_LOOP_STATUS,
    EVENT_GAME_LOOP_STATUS_PAUSED,
    EVENT_GAME_LOOP_STOP,
} from '../../../../main/service/events.types';
import { colors } from '../../../layout/colors';
import { IconRobot } from '../../atoms';
import { Button } from '../../molecules';
import { ButtonType } from '../../molecules/Button/types';
import { Bar, Container, ContainerButton, Content, Left, TextSubTitle, TextTitle } from './styles';

interface HeaderConnectProps {}

const HeaderConnect: FC<HeaderConnectProps> = ({}) => {
    const [running, setRunning] = useState(false);
    const [paused, setPaused] = useState<null | boolean>(null);
    const [qty, setQty] = useState(0);

    useEffect(() => {
        const onStatus: any = (e: IpcRendererEvent, status: boolean) => setRunning(status);
        const onBrowser: any = (e: IpcRendererEvent, qty: number) => setQty(qty);
        const onPaused: any = (e: IpcRendererEvent, status: boolean) => setPaused(status);

        ipcRenderer.on(EVENT_GAME_LOOP_STATUS, onStatus);
        ipcRenderer.on(EVENT_GAME_LOOP_BROWSER, onBrowser);
        ipcRenderer.on(EVENT_GAME_LOOP_STATUS_PAUSED, onPaused);

        return () => {
            ipcRenderer.removeListener(EVENT_GAME_LOOP_STATUS, onStatus);
            ipcRenderer.removeListener(EVENT_GAME_LOOP_STATUS_PAUSED, onPaused);
            ipcRenderer.removeListener(EVENT_GAME_LOOP_BROWSER, onBrowser);
        };
    }, []);

    const toggle = () => {
        if (running) {
            ipcRenderer.send(EVENT_GAME_LOOP_STOP);
            return;
        }
        ipcRenderer.send(EVENT_GAME_LOOP_START);
    };
    const togglePause = () => {
        if (paused) {
            ipcRenderer.send(EVENT_GAME_LOOP_CONTINUE);
            return;
        }
        ipcRenderer.send(EVENT_GAME_LOOP_PAUSE);
    };

    const buttonType = running ? ButtonType.DANGER : ButtonType.SUCCESS;
    const buttonText = running ? 'Desconectar (SHIFT+F1)' : 'Conectar (SHIFT+F1)';
    const buttonPausedText = paused ? 'Continuar (SHIFT+F2)' : 'Pausar (SHIFT+F2)';
    let text = 'Desconectado';
    if (running && paused) {
        text = 'Pausado';
    } else if (running && !paused) {
        text = 'Conectado';
    }
    const subText = running ? 'Localizado {{qty}} conta(s)' : 'Nenhum conta localizada';

    const { t } = useTranslation();

    return (
        <Container>
            <Bar />
            <Left>
                <IconRobot color={colors.lightGray} width={50} />
                <Content>
                    <TextTitle>{t(text)}</TextTitle>
                    <TextSubTitle>{t(subText, { qty: qty })}</TextSubTitle>
                </Content>
            </Left>
            <Button text={t(buttonText)} type={buttonType} onPress={toggle} />
            {running && paused !== null && (
                <ContainerButton>
                    <Button text={t(buttonPausedText)} type={ButtonType.SUCCESS} onPress={togglePause} />
                </ContainerButton>
            )}
        </Container>
    );
};

export default HeaderConnect;
