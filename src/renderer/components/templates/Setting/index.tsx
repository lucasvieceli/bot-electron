import React, { FC, useCallback, useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import Config from '../../../../main/database/models/config.model';
import { ConfigService } from '../../../services';
import { ConfigItemNumber, ConfigItemSelect } from '../../molecules';
import { ContainerMain } from '../../organisms';
import { Container, ContainerBlock, Content, Row, TextSubTitle, TextTitle, ContentSpinner } from './styles';
interface SettingProps {}

const Setting: FC<SettingProps> = ({}) => {
    const [value, setValue] = useState<Config>(undefined);
    useEffect(() => {
        (async () => {
            const result = await ConfigService.getAll();
            setValue(result);
        })();
    }, []);

    const handleChange = useCallback((value: string, column: string) => {
        setValue((old: Config) => ({
            ...old,
            [column]: value,
        }));
        ConfigService.updateColumn(column, value);
    }, []);

    return (
        <ContainerMain>
            <Container>
                {value == undefined ? (
                    <ContentSpinner>
                        <Spinner />
                    </ContentSpinner>
                ) : (
                    <>
                        <Row>
                            <ContainerBlock>
                                <TextTitle>Intervalos</TextTitle>
                                <Content>
                                    <TextSubTitle>Intervalo em minutos</TextSubTitle>
                                    <ConfigItemNumber
                                        value={value.intervalWork}
                                        name="intervalWork"
                                        text="Tempo para verificar se há heróis disponíveis para trabalhar"
                                        onChange={handleChange}
                                    />
                                    <ConfigItemNumber
                                        value={value.intervalRefreshHeroes}
                                        onChange={handleChange}
                                        text="Tempo para atualizar a posição dos heróis no mapa"
                                        name="intervalRefreshHeroes"
                                    />
                                    <ConfigItemNumber
                                        value={value.intervalCheckLogin}
                                        name="intervalCheckLogin"
                                        text="Tempo para verificar login"
                                        onChange={handleChange}
                                    />
                                </Content>
                            </ContainerBlock>
                            <ContainerBlock>
                                <TextTitle>Confiança</TextTitle>
                                <Content>
                                    <TextSubTitle>
                                        O quão confiante o bot precisa estar para clicar nos botões (valores entre 0 e
                                        1. 0 é o valor mínimo, 1 é o valor máximo)
                                    </TextSubTitle>
                                    <ConfigItemNumber
                                        value={value.thresholdDefault}
                                        name="thresholdDefault"
                                        text="Padrão"
                                        onChange={handleChange}
                                    />
                                    <ConfigItemNumber
                                        text="Herói Comum"
                                        value={value.thresholdHeroCommon}
                                        name="thresholdHeroCommon"
                                        onChange={handleChange}
                                    />
                                    <ConfigItemNumber
                                        text="Herói raro"
                                        value={value.thresholdHeroRare}
                                        name="thresholdHeroRare"
                                        onChange={handleChange}
                                    />
                                    <ConfigItemNumber
                                        text="Herói super raro"
                                        value={value.thresholdHeroSuperRare}
                                        name="thresholdHeroSuperRare"
                                        onChange={handleChange}
                                    />
                                    <ConfigItemNumber
                                        text="Herói lendário"
                                        value={value.thresholdHeroLegend}
                                        name="thresholdHeroLegend"
                                        onChange={handleChange}
                                    />
                                    <ConfigItemNumber
                                        text="Herói épico"
                                        value={value.thresholdHeroEpic}
                                        name="thresholdHeroEpic"
                                        onChange={handleChange}
                                    />
                                    <ConfigItemNumber
                                        text="Herói super lendário"
                                        value={value.thresholdHeroSuperLegend}
                                        name="thresholdHeroSuperLegend"
                                        onChange={handleChange}
                                    />
                                    <ConfigItemNumber
                                        text="Botão Carteira metamask"
                                        value={value.thresholdButtonMetamask}
                                        name="thresholdButtonMetamask"
                                        onChange={handleChange}
                                    />
                                    <ConfigItemNumber
                                        text="Botão Work"
                                        value={value.thresholdButtonWork}
                                        name="thresholdButtonWork"
                                        onChange={handleChange}
                                    />
                                    <ConfigItemNumber
                                        text="Barra vender estamina"
                                        value={value.thresholdBarLife}
                                        name="thresholdBarLife"
                                        onChange={handleChange}
                                    />
                                </Content>
                            </ContainerBlock>
                        </Row>
                        <Row>
                            <ContainerBlock>
                                <Content>
                                    <TextSubTitle>Irá colocar os heróis quando o mapa for resetado</TextSubTitle>
                                    <ConfigItemSelect
                                        text="Ativado"
                                        width={75}
                                        values={[
                                            { id: '0', label: 'Não' },
                                            { id: '1', label: 'Sim' },
                                        ]}
                                        value={value.newMapEnable}
                                        name="newMapEnable"
                                        onChange={handleChange}
                                    />
                                    <ConfigItemNumber
                                        text="Por quanto tempo irá executar (minutos)"
                                        value={value.newMapTime}
                                        name="newMapTime"
                                        onChange={handleChange}
                                    />
                                    <ConfigItemSelect
                                        text="Comum"
                                        width={75}
                                        values={[
                                            { id: '0', label: 'Não' },
                                            { id: '1', label: 'Sim' },
                                        ]}
                                        value={value.newMapHeroCommon}
                                        name="newMapHeroCommon"
                                        onChange={handleChange}
                                    />
                                    <ConfigItemSelect
                                        text="Raro"
                                        width={75}
                                        values={[
                                            { id: '0', label: 'Não' },
                                            { id: '1', label: 'Sim' },
                                        ]}
                                        value={value.newMapHeroRare}
                                        name="newMapHeroRare"
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
                                        name="newMapHeroSuperRare"
                                        value={value.newMapHeroSuperRare}
                                    />
                                    <ConfigItemSelect
                                        text="Épico"
                                        width={75}
                                        values={[
                                            { id: '0', label: 'Não' },
                                            { id: '1', label: 'Sim' },
                                        ]}
                                        onChange={handleChange}
                                        value={value.newMapHeroEpic}
                                        name="newMapHeroEpic"
                                    />
                                    <ConfigItemSelect
                                        text="Lendário"
                                        width={75}
                                        values={[
                                            { id: '0', label: 'Não' },
                                            { id: '1', label: 'Sim' },
                                        ]}
                                        value={value.newMapHeroLegend}
                                        onChange={handleChange}
                                        name="newMapHeroLegend"
                                    />
                                    <ConfigItemSelect
                                        text="Super lendário"
                                        width={75}
                                        values={[
                                            { id: '0', label: 'Não' },
                                            { id: '1', label: 'Sim' },
                                        ]}
                                        onChange={handleChange}
                                        value={value.newMapHeroSuperLegend}
                                        name="newMapHeroSuperLegend}"
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
