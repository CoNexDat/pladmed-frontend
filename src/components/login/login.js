import React, { useState } from 'react';
import {
    Button,
    Form,
    Col
} from 'react-bootstrap';
import styles from './styles.module.css';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function Login(props) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const login = () => {
        props.login(email, password);
    }

    const onEmailSet = (email) => {
        setEmail(email);
    }

    const onPasswordSet = (password) => {
        setPassword(password);
    }

    return (
        <Form className={styles.form}>
            <Form.Label className={[styles.title, "h4"]}>
                Iniciar sesión
            </Form.Label>
            <Form.Control
                type="email"
                className={styles.controlBox}
                placeholder="Dirección email..."
                onChange={onEmailSet}
            />
            <Form.Control
                type="password"
                className={styles.controlBox}
                placeholder="Contraseña..."
                onChange={onPasswordSet}
            />
            <Form.Check 
                type="checkbox"
                className={styles.rememberMe}
                label="Recuerdame"
                id="customControlInline"
                custom
            />
            <Button
                variant="primary"
                type="button"
                block
                className={styles.button}
                onClick={login}
            >
                Iniciar sesión
            </Button>
            <Form.Row className={styles.formExtra}>
                <Col className={styles.forgotPass}>
                    <Link to={props.forgotPassUrl}>¿Olvidaste tu contraseña?</Link>
                </Col>
                <Col className={styles.register}>
                    <Link to={props.registerUrl}>Registrate aquí</Link>
                </Col>
            </Form.Row>
        </Form>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    forgotPassUrl: PropTypes.string.isRequired,
    registerUrl: PropTypes.string.isRequired 
}

export default Login;
