import React, { useContext } from 'react';
import {
    Container,
    Col
} from 'react-bootstrap';
import styles from './styles.module.css';
import background from "../../assets/network.jpg";
import { Context } from '../../controllers/context_provider'
import { useHistory } from "react-router-dom";
import Register from '../../components/register/register'
import { requestRegister } from '../../requesters/account_requester'

function RegisterScreen() {
    const history = useHistory();
    const { setLogged } = useContext(Context);

    const register = async (email, password) => {
        console.log("Trying to register")
        try {
            const [status, res] = await requestRegister(email, password);

            const success = status === 201;

            console.log("Res is ", res)

            if (success) {
                setLogged(true)
                history.push("/");
            }

            return success;
        } catch (e) {
            console.log("Error: ", e)
            return false;
        }
    }

    return (
        <Container
            fluid
            style={{backgroundImage: `url(${background}` }}
            className={styles.registerBackground}
        >
            <Col className={styles.register}>
                <Register
                    register={register}
                />
            </Col>
        </Container>
    );
};

export default RegisterScreen;
