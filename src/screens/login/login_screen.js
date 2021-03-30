import React, { useContext } from 'react';
//import axios from 'axios';
import {
    Container,
    Col
} from 'react-bootstrap';
import styles from './styles.module.css';
import background from "../../assets/network.jpg";
import { Context } from '../../controllers/context_provider'
import { useHistory } from "react-router-dom";
import Login from '../../components/login/login'

function LoginScreen() {
    const history = useHistory();
    const { setLogged } = useContext(Context);

    /*const [data, setData] = useState();

    const getBackendData = () => {
        axios.get('http://0.0.0.0:5000/')
                .then(res => {
                    setData(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
    }*/

    const login = () => {
        console.log("Trying to login")
        setLogged(true)
        history.push("/");
    }

    return (
        <Container
            fluid
            style={{backgroundImage: `url(${background}` }}
            className={styles.loginBackground}
        >
            <Col className={styles.login}>
                <Login
                    login={login}
                    forgotPassUrl={"/forgot-password"}
                    registerUrl={"/register"}
                />
            </Col>
        </Container>
    );
};

export default LoginScreen;
