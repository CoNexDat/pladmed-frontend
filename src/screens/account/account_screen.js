import React from 'react';
import {
    Container,
    Row,
    Form
} from 'react-bootstrap';
import styles from './styles.module.css';

function AccountScreen() {
    return (
        <Container
            fluid
            className={[styles.mainContainer, "mt-4", "mb-4"]}
        >
            <Row className={[styles.accountData, "mx-auto"]}>
                <Form className={styles.form}>
                    <Form.Label className={[styles.title, "h3"]}>
                        Datos de cuenta
                    </Form.Label>
                    <Form.Group as={Row} controlId="formEmail" className={"h6"}>
                        <Form.Label
                            column
                            xl={2} lg={2} md={2} sm={2} xs={3}
                            className={styles.label}
                        >
                            Email:
                        </Form.Label>
                        <Form.Label
                            column
                            xl={4} lg={4} md={4} sm={4} xs={4}
                        >
                            fede.funes96@gmail.com
                        </Form.Label>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formCredits" className={"h6"}>
                        <Form.Label
                            column
                            xl={2} lg={2} md={2} sm={2} xs={3}
                            className={styles.label}
                        >
                            Créditos:
                        </Form.Label>
                        <Form.Label
                            column
                            xl={2} lg={2} md={2} sm={2} xs={2}
                        >
                            124
                        </Form.Label>
                    </Form.Group>
                </Form>
            </Row>
            <Row className={[styles.accountData, "mt-4", "mx-auto"]}>
                <Form className={styles.form}>
                    <Form.Label className={[styles.title, "h3"]}>
                        Sondas
                    </Form.Label>
                        <p>
                            No tienes sondas registradas
                        </p>
                        <p>
                            ¿Deseas registrar una?
                        </p>
                </Form>
            </Row>            
        </Container>
    );
};

export default AccountScreen;
