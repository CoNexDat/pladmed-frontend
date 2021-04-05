import React, { useContext } from 'react';
import {
    Container,
    Col
} from 'react-bootstrap';
import styles from './styles.module.css';
import background from "../../assets/network.jpg";
import { Context } from '../../controllers/context_provider'
import Register from '../../components/register/register'

function RegisterScreen() {
    const { register } = useContext(Context);

    const dispatchRegister = async (email, password) => {
        await register(email, password);
    }

    return (
        <Container
            fluid
            style={{backgroundImage: `url(${background}` }}
            className={styles.registerBackground}
        >
            <Col className={styles.register}>
                <Register
                    register={dispatchRegister}
                />
            </Col>
        </Container>
    );
};

export default RegisterScreen;
