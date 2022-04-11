import React, { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'reactstrap';
import Config from '../../../../electron/database/models/config.model';
import { ConfigService } from '../../../services';
import { ConfigItemNumber, ConfigItemSelect } from '../../molecules';
import { ContainerMain } from '../../organisms';
import { Container, ContainerBlock, Content, Row, TextSubTitle, TextTitle, ContentSpinner } from './styles';
interface SettingProps {}

const Setting: FC<SettingProps> = () => {
    const [value, setValue] = useState<Config[] >([]);
    const { t } = useTranslation();
    useEffect(() => {
        (async () => {
            const result = await ConfigService.getConfigSystem();
            setValue(result);
        })();
    }, []);

    const handleChange = useCallback((value: string, column: string) => {
        setValue((old: Config[]) => {
            const index = old.findIndex((v) => v.name === column);
            old[index].value = value;
            return [...old];
        });
        ConfigService.updateColumn(column, value);
    }, []);

    const getValue = (name: string) => value?.find((v) => v.name === name)?.value;

    return (
        <ContainerMain>
            <Container>
                {value.length === 0 ? (
                    <ContentSpinner>
                        <Spinner />
                    </ContentSpinner>
                ) : (
                    <>
                        <Row>
                            <ContainerBlock>
                                <TextTitle>{t('Intervalos')}</TextTitle>
                                <Content>
                                    <TextSubTitle>{t('range in minutes')}</TextSubTitle>
                                    <ConfigItemNumber
                                        value={getValue('interval-work')}
                                        name="interval-work"
                                        text="Tempo para verificar se há heróis disponíveis para trabalhar"
                                        onChange={handleChange}
                                    />
                                    <ConfigItemNumber
                                        value={getValue('interval-refresh-heroes')}
                                        onChange={handleChange}
                                        text="Tempo para atualizar a posição dos heróis no mapa"
                                        name="interval-refresh-heroes"
                                    />
                                    <ConfigItemNumber
                                        value={getValue('interval-check-login')}
                                        name="interval-check-login"
                                        text="Tempo para verificar login"
                                        onChange={handleChange}
                                    />
                                    <ConfigItemNumber
                                        value={getValue('interval-bcoin')}
                                        name="interval-bcoin"
                                        text="Tempo para verificar registrar quantidade de bcoin no baú"
                                        onChange={handleChange}
                                    />
                                </Content>
                            </ContainerBlock>
                            <ContainerBlock>
                                <TextTitle>Confiança</TextTitle>
                                <Content>
                                    <TextSubTitle>
                                        {t('O quão confiante o bot precisa estar para clicar nos botões (valores entre 0 e 1. 0 é o valor mínimo, 1 é o valor máximo')}
                                    </TextSubTitle>
                                    <ConfigItemNumber
                                        value={getValue('threshold-default')}
                                        name="threshold-default"
                                        text="Padrão"
                                        onChange={handleChange}
                                    />
                                    <ConfigItemNumber
                                        text="Herói Comum"
                                        value={getValue('threshold-hero-common')}
                                        name="threshold-hero-common"
                                        onChange={handleChange}
                                    />
                                    <ConfigItemNumber
                                        text="Herói raro"
                                        value={getValue('threshold-hero-rare')}
                                        name="threshold-hero-rare"
                                        onChange={handleChange}
                                    />
                                    <ConfigItemNumber
                                        text="Herói super raro"
                                        value={getValue('threshold-hero-super-rare')}
                                        name="threshold-hero-super-rare"
                                        onChange={handleChange}
                                    />
                                    <ConfigItemNumber
                                        text="Herói lendário"
                                        value={getValue('threshold-hero-legend')}
                                        name="threshold-hero-legend"
                                        onChange={handleChange}
                                    />
                                    <ConfigItemNumber
                                        text="Herói épico"
                                        value={getValue('threshold-hero-epic')}
                                        name="threshold-hero-epic"
                                        onChange={handleChange}
                                    />
                                    <ConfigItemNumber
                                        text="Herói super lendário"
                                        value={getValue('threshold-hero-super-legend')}
                                        name="threshold-hero-super-legend"
                                        onChange={handleChange}
                                    />

                                    <ConfigItemNumber
                                        text="Botão Work"
                                        value={getValue('threshold-button-work')}
                                        name="threshold-button-work"
                                        onChange={handleChange}
                                    />
                                    <ConfigItemNumber
                                        text="Barra verde estamina"
                                        value={getValue('threshold-bar-life')}
                                        name="threshold-bar-life"
                                        onChange={handleChange}
                                    />
                                </Content>
                            </ContainerBlock>
                        </Row>
                        <Row>
                            <ContainerBlock>
                                <Content>
                                    <TextSubTitle>{t('Irá colocar os heróis quando o mapa for resetado (em desenvolvimento)')}</TextSubTitle>
                                    <ConfigItemSelect
                                        text="Ativado"
                                        width={75}
                                        values={[
                                            { id: '0', label: 'Não' },
                                            { id: '1', label: 'Sim' },
                                        ]}
                                        value={getValue('new-map-enable')}
                                        name="new-map-enable"
                                        onChange={handleChange}
                                    />
                                    <ConfigItemNumber
                                        text="Por quanto tempo irá executar (minutos)"
                                        value={getValue('new-map-time')}
                                        name="new-map-time"
                                        onChange={handleChange}
                                    />
                                    <ConfigItemSelect
                                        text="Comum"
                                        width={75}
                                        values={[
                                            { id: '0', label: 'Não' },
                                            { id: '1', label: 'Sim' },
                                        ]}
                                        value={getValue('new-map-hero-common')}
                                        name="new-map-hero-common"
                                        onChange={handleChange}
                                    />
                                    <ConfigItemSelect
                                        text="Raro"
                                        width={75}
                                        values={[
                                            { id: '0', label: 'Não' },
                                            { id: '1', label: 'Sim' },
                                        ]}
                                        value={getValue('new-map-hero-rare')}
                                        name="new-map-hero-rare"
                                        onChange={handleChange}
                                    />
                                    <ConfigItemSelect
                                        text="Super raro"
                                        width={75}
                                        values={[
                                            { id: '0', label: 'Não' },
                                            { id: '1', label: 'Sim' },
                                        ]}
                                        onChange={handleChange}
                                        name="new-map-hero-super-rare"
                                        value={getValue('new-map-hero-super-rare')}
                                    />
                                    <ConfigItemSelect
                                        text="Épico"
                                        width={75}
                                        values={[
                                            { id: '0', label: 'Não' },
                                            { id: '1', label: 'Sim' },
                                        ]}
                                        onChange={handleChange}
                                        value={getValue('new-map-hero-epic')}
                                        name="new-map-hero-epic"
                                    />
                                    <ConfigItemSelect
                                        text="Lendário"
                                        width={75}
                                        values={[
                                            { id: '0', label: 'Não' },
                                            { id: '1', label: 'Sim' },
                                        ]}
                                        value={getValue('new-map-hero-legend')}
                                        onChange={handleChange}
                                        name="new-map-hero-legend"
                                    />
                                    <ConfigItemSelect
                                        text="Super lendário"
                                        width={75}
                                        values={[
                                            { id: '0', label: 'Não' },
                                            { id: '1', label: 'Sim' },
                                        ]}
                                        onChange={handleChange}
                                        value={getValue('new-map-hero-super-legend')}
                                        name="new-map-hero-super-legend"
                                    />
                                </Content>
                            </ContainerBlock>
                        </Row>
                    </>
                )}
            </Container>
        </ContainerMain>
    );
};

export default Setting;
