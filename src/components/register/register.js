import React, { useState, useRef } from 'react';
import {
    Button,
    Form
} from 'react-bootstrap';
import styles from './styles.module.css';
import PropTypes from 'prop-types';
import ErrorMessage from '../error_message/error_message'

function Register(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const errorRegister = useRef(null)

    const register = async () => {
        errorRegister.current.hide();
        setLoading(true);

        try {
            await props.register(email, password);
        } catch (e) {
            errorRegister.current.display();
            setLoading(false);
        }
    }

    const onEmailSet = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordSet = (event) => {
        setPassword(event.target.value);
    }

    const registerEnabled = () => {
        return email.length > 0 && password.length > 0 && !loading;
    }

    return (
        <Form className={styles.form}>
            <Form.Label className={[styles.title, "h4"]}>
                Registrarse
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
            <ErrorMessage
                ref={errorRegister}
                styles={styles.error}
                message="No podemos registrar su cuenta"
            />
            <Button
                variant="primary"
                type="button"
                block
                className={styles.button}
                onClick={register}
                disabled={!registerEnabled()}
            >
                Registrarse
            </Button>
        </Form>
    );
};

Register.propTypes = {
    register: PropTypes.func.isRequired
}

export default Register;
