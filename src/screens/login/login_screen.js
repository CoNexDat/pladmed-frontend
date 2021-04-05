import React, { useContext } from 'react';
import {
    Container,
    Col
} from 'react-bootstrap';
import styles from './styles.module.css';
import background from "../../assets/network.jpg";
import { Context } from '../../controllers/context_provider'
import Login from '../../components/login/login'

function LoginScreen() {
    const { login } = useContext(Context);
    
    const dispatchLogin = async (email, password) => {
        await login(email, password);
    }

    return (
        <Container
            fluid
            style={{backgroundImage: `url(${background}` }}
            className={styles.loginBackground}
        >
            <Col className={styles.login}>
                <Login
                    login={dispatchLogin}
                    forgotPassUrl={"/forgot-password"}
                    registerUrl={"/register"}
                />
            </Col>
        </Container>
    );
};

export default LoginScreen;
