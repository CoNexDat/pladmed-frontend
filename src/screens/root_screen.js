import React, { useState } from 'react';
import axios from 'axios';
import {
    Container,
    Button,
    Alert
} from 'react-bootstrap';

function RootScreen() {
    const [data, setData] = useState();

    const getBackendData = () => {
        axios.get('http://0.0.0.0:5000/')
                .then(res => {
                    setData(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
    }

    return (
        <Container fluid>
            <Alert variant="success">
                <Alert.Heading>
                    Ejemplo de prueba de React
                </Alert.Heading>
            </Alert>
            <Button 
                variant="info"
                onClick={getBackendData.bind(this)}
            >
                Obtener datos del backend
            </Button>
            {data &&
            <Alert variant="success">
                <p>
                    Obtuvimos: {JSON.stringify(data)}
                </p>
            </Alert>
            }
        </Container>
    );
};

export default RootScreen;