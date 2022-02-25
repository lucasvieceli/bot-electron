import React, { ChangeEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, FormGroup, FormText, Input, Label, Row } from 'reactstrap';

interface AccountFormProps {
    value: any;
    onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AccountForm: FC<AccountFormProps> = ({ value, onChangeInput }) => {
    const { t } = useTranslation();
    return (
        <>
            <Row>
                <Col md={4}>
                    <FormGroup>
                        <Label for="metamaskId">Metamask ID</Label>
                        <Input
                            id="metamaskId"
                            value={value.metamaskId}
                            onChange={onChangeInput}
                            name="metamaskId"
                            placeholder="0xB59D7454Fe96A3Dd42f8B509f18f5bfadCC12121"
                            type="text"
                        />
                        <FormText>{t('ID da sua carteira metamask')}</FormText>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <FormGroup>
                        <Label for="name">{t('Apelido')}</Label>
                        <Input
                            id="name"
                            value={value.name}
                            onChange={onChangeInput}
                            name="name"
                            placeholder="Conta 1"
                            type="text"
                        />
                        <FormText>{t('Um nome para sua conta, será exibido no terminal')}</FormText>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <FormGroup>
                        <Label for="user">{t('Usuário')}</Label>
                        <Input
                            id="user"
                            value={value.user}
                            onChange={onChangeInput}
                            name="user"
                            placeholder=""
                            type="text"
                        />
                        <FormText>{t('Nome do usuário do bombcrypto')}</FormText>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <FormGroup>
                        <Label for="password">Senha</Label>
                        <Input
                            id="password"
                            onChange={onChangeInput}
                            value={value.password}
                            name="password"
                            placeholder=""
                            type="password"
                        />
                        <FormText>{t('Senha do usuário do bombcrypto')}</FormText>
                    </FormGroup>
                </Col>
            </Row>
        </>
    );
};

export default AccountForm;
