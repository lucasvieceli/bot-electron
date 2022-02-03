import React, { FC, useEffect, useState } from 'react';
import { Bar, Container, Content, Left, TextSubTitle, TextTitle } from './styles';
import { colors } from '../../../layout/colors';
import { IconRobot } from '../../atoms';
import { Button } from '../../molecules';
import { ButtonType } from '../../molecules/Button/types';
import { GameLoopService } from '../../../services';
import { useTranslation } from 'react-i18next';
import { ipcRenderer, IpcRendererEvent } from 'electron';
import {
    EVENT_GAME_LOOP_START,
    EVENT_GAME_LOOP_STATUS,
    EVENT_GAME_LOOP_STOP,
} from '../../../../main/service/events.types';

interface HeaderConnectProps {}

const HeaderConnect: FC<HeaderConnectProps> = ({}) => {
    const [running, setRunning] = useState(false);

    useEffect(() => {
        const onStatus: any = (e: IpcRendererEvent, status: boolean) => setRunning(status);
        ipcRenderer.on(EVENT_GAME_LOOP_STATUS, onStatus);
        return () => {
            ipcRenderer.removeListener(EVENT_GAME_LOOP_STATUS, onStatus);
        };
    }, []);

    const toggle = () => {
        if (running) {
            ipcRenderer.send(EVENT_GAME_LOOP_STOP);
            return;
        }
        ipcRenderer.send(EVENT_GAME_LOOP_START);
    };

    const buttonType = running ? ButtonType.DANGER : ButtonType.SUCCESS;
    const buttonText = running ? 'Desconectar' : 'Conectar';
    const text = running ? 'Conectado' : 'Desconectado';
    const subText = running ? 'Localizado 3 janelas com nome de Bombercrypto' : 'Nenhum janela localizada';

    const { t } = useTranslation();

    return (
        <Container>
            <Bar />
            <Left>
                <IconRobot color={colors.lightGray} width={50} />
                <Content>
                    <TextTitle>{t(text)}</TextTitle>
                    <TextSubTitle>{t(subText)}</TextSubTitle>
                </Content>
            </Left>
            <Button text={t(buttonText)} type={buttonType} onPress={toggle} />
        </Container>
    );
};

export default HeaderConnect;
