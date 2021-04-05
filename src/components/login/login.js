import React, { useState, useRef } from 'react';
import {
    Form,
    Col,
} from 'react-bootstrap';
import styles from './styles.module.css';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import ErrorMessage from '../error_message/error_message'
import ButtonLoad from '../button_load/button_load'

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const errorLogin = useRef(null)

    const login = async () => {
        errorLogin.current.hide();
        setLoading(true);

        try {
            await props.login(email, password);
        } catch (e) {
            errorLogin.current.display();
            setLoading(false);
        }
    }

    const onEmailSet = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordSet = (event) => {
        setPassword(event.target.value);
    }

    const loginEnabled = () => {
        return email.length > 0 && password.length > 0 && !loading;
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
            <ErrorMessage
                ref={errorLogin}
                styles={styles.error}
                message="No podemos ingresar con las credenciales proporcionadas"
            />
            <ButtonLoad
                variant="primary"
                type="button"
                block
                className={styles.button}
                onClick={login}
                disabled={!loginEnabled()}
                loading={loading}
            >
                Iniciar sesión
            </ButtonLoad>
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
