import { ValidationError } from 'class-validator';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Col, Row } from 'reactstrap';

interface FormErrorsProps {
    errors: ValidationError[];
}

const FormErrors: FC<FormErrorsProps> = ({ errors }) => {
    const { t } = useTranslation();
    return (
        <Row>
            <Col md="12" lg="6">
                <Alert color="danger">
                    {errors.map((error) =>
                        Object.keys(error.constraints).map((key) => {
                            const property = `fieldName${error.property}`;
                            const msg = error.constraints[key];

                            return (
                                <>
                                    {t(error.constraints[key], { [property]: t(property) })} <br />
                                </>
                            );
                        }),
                    )}
                </Alert>
            </Col>
        </Row>
    );
};

export default FormErrors;
