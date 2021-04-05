import React, { useState, useEffect, useContext } from 'react';
import {
    Container,
    Row,
    Col,
    Form
} from 'react-bootstrap';
import styles from './styles.module.css';
import { Context } from '../../controllers/context_provider'
import ButtonLoad from '../../components/button_load/button_load'
import Map from '../../components/map/map'
import { Tooltip } from 'react-leaflet'
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/es';

function OperationsScreen() {
    const { getAllProbes } = useContext(Context);

    const [probes, setProbes] = useState([]);
    const [probesTouched, setProbesTouched] = useState([]);
    
    useEffect(() => {
        async function init() {
            try {
                const data = await getAllProbes();

                setProbes(data)
            } catch (e) {

            }
        }
        
        init();
    }, [getAllProbes]);

    const markerTouch = (probe) => {
        if (!probe["connected"]) {
            return;
        }

        const filtered = probesTouched.filter(
            pr => pr["identifier"] !== probe["identifier"]
        )

        if (filtered.length === probesTouched.length) {
            setProbesTouched([...probesTouched, probe]);
        } else {
            setProbesTouched(filtered)
        }
    }

    const markerOpacity = (probe) => {
        const exists = probesTouched.some(
            pr => pr["identifier"] === probe["identifier"]
        )

        return exists ? 1.0 : 0.4;
    }

    const renderTooltip = (probe) => {
        if (probe["connected"]) {
            return (
                <Tooltip>
                    Sonda conectada <br/> Disponibilidad: {probe["availability"] * 100}%
                </Tooltip>  
            )
        }

        return (
            <Tooltip>
                Sonda desconectada
            </Tooltip>  
        )        
    }

    return (
        <Container
            fluid
            className={"py-4"}
        >
            <Row className={[styles.surface, "mx-auto"]}>
                <Form className={styles.form}>
                    <Form.Label className={[styles.title, "h3"]}>
                        Buscar medición
                    </Form.Label>
                    <Form.Row>
                        <Col
                            xl={8} lg={8} md={8} sm={8} xs={12}
                        >
                            <Form.Control
                                type="input"
                                placeholder="Identificador..."
                                className={styles.search}
                            />
                        </Col>
                        <Col
                            xl={4} lg={4} md={4} sm={4} xs={12}
                            className={styles.centered}
                        >
                            <ButtonLoad
                                variant="primary"
                                type="button"
                                //onClick={this.registerProbe}
                                //disabled={!this.registerEnabled()}
                                className={styles.centered}
                                loading={false}
                            >
                                Buscar
                            </ButtonLoad>
                        </Col>
                    </Form.Row>
                </Form>
            </Row>
            <Row className={[styles.surface, "mx-auto", "mt-4"]}>
                <Form className={styles.form}>
                    <Form.Label className={[styles.title, "h3"]}>
                        Crear medición
                    </Form.Label>
                     <Form.Row>
                        <Col
                            xl={8} lg={8} md={8} sm={8} xs={12}
                        >
                            <Form.Control as="select" className={styles.options}>
                                <option>Traceroute</option>
                                <option>Resolución DNS</option>
                                <option>Ping</option>
                            </Form.Control>
                        </Col>
                     </Form.Row>
                     <Form.Row className={"pt-4"}>
                        <Col
                            xl={8} lg={8} md={8} sm={8} xs={12}
                        >
                            <Form.Group controlId="formIps">
                                <Form.Control
                                    type="input"
                                    placeholder="Ips separadas por coma..."
                                />
                                <Form.Text
                                    className={"text-muted"}
                                >
                                    Ejemplo: 192.168.0.1, 192.168.1.1, ...
                                </Form.Text>
                            </Form.Group>
                        </Col>
                     </Form.Row>
                     <Form.Row>
                        <Col
                            xl={8} lg={8} md={8} sm={8} xs={12}
                        >
                            <Form.Group controlId="formIps">
                                <Form.Control
                                    type="input"
                                    placeholder="FQDNs separadas por coma..."
                                />
                                <Form.Text
                                    className={"text-muted"}
                                >
                                    Ejemplo: www.google.com, www.yahoo.com.ar, ...
                                </Form.Text>
                            </Form.Group>
                        </Col>
                     </Form.Row>
                     <Form.Row className={"pt-4"}>
                        <Col
                            xl={8} lg={8} md={8} sm={8} xs={12}
                        >
                            <Form.Label>
                                Parámetros de la medición
                            </Form.Label>
                            <Form.Group controlId="formIps">
                                <div className={styles.jsonContainer}>
                                    <JSONInput
                                        id='jsonInput'
                                        locale={locale}
                                        height='35vh'
                                        width='100%'
                                        theme="light_mitsuketa_tribute"
                                        colors = {{
                                            default: "black",
                                            background: "white",
                                        }}
                                        style = {{
                                            contentBox: {
                                                color: 'black',
                                            }
                                        }}
                                    />
                                </div>
                                <Form.Text
                                    className={"text-muted"}
                                >
                                    Ejemplo para Traceroute: <br/>
                                    {"{"}
                                    <br/>
                                    &nbsp; firsthop: 1                                    
                                    <br/>
                                    {"}"}
                                    <br/>
                                    Para aprender más sobre parámetros, consultar el
                                    <a href={"https://www.caida.org/tools/measurement/scamper/man/scamper.1.pdf"}>
                                        &nbsp;manual de Scamper
                                    </a> 
                                </Form.Text>
                            </Form.Group>
                        </Col>
                     </Form.Row>                     
                    <Form.Row className={"pt-4"}>
                        <Col>
                            <Map
                                className={styles.map}
                                markers={probes}
                                markerTouch={markerTouch}
                                renderTooltip={renderTooltip}
                                markerOpacity={markerOpacity}
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row className={styles.buttonCreate}>
                        <ButtonLoad
                            variant="primary"
                            type="button"
                            //onClick={this.registerProbe}
                            //disabled={!this.registerEnabled()}
                            className={styles.centered}
                            loading={false}
                        >
                            Crear medición
                        </ButtonLoad>
                    </Form.Row>
                </Form>
            </Row>            
        </Container>
    );
};

export default OperationsScreen;
