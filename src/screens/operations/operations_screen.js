import React, { useRef, useState, useEffect, useContext } from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    ListGroup,
    Accordion,
    Button,
    Card
} from 'react-bootstrap';
import styles from './styles.module.css';
import { Context } from '../../controllers/context_provider'
import ButtonLoad from '../../components/button_load/button_load'
import Map from '../../components/map/map'
import { Tooltip } from 'react-leaflet'
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/es';
import ErrorMessage from '../../components/error_message/error_message'
import { MdAssessment } from "react-icons/md"

const OPERATIONS = [
    "Traceroute",
    "DNS",
    "Ping"
]

const TRACEROUTE_FORMAT = [
    "json",
    "dump"
]

function OperationsScreen() {
    const { 
        getAllProbes,
        getMyOperations,
        createOperation,
        findOperation
    } = useContext(Context);

    const [probes, setProbes] = useState([]);
    const [myOperations, setMyOperations] = useState([]);

    const [operation, setOperation] = useState(OPERATIONS[0])
    const [format, setFormat] = useState("json");
    const [params, setParams] = useState({})
    const [probesTouched, setProbesTouched] = useState([]);
    const [creatingOp, setCreatingOp] = useState(false);

    const [searchOperation, setSearchOperation] = useState("");
    const [searching, setSearching] = useState(false);
    const [results, setResults] = useState({})

    const errorOperation = useRef();
    const errorSearching = useRef();

    const downloadResults = (result) => {
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(result, null, 2)], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "results.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click(); 
    }

    const showResults = () => {
        let resultData = Object.assign({}, results)

        let resultFile = resultData["results"]

        delete resultData["results"]

        return (
            <div>
                <pre>
                    {JSON.stringify(resultData, null, 2)}
                </pre>
                <Button
                    variant="primary"
                    type="button"
                    onClick={downloadResults.bind(this, resultFile)}
                    className={styles.centered}
                >
                    Descargar resultados
                </Button>
            </div>
        )
    }

    const retrieveOperations = async () => {
        const myOps = await getMyOperations();

        setMyOperations(myOps);
    }

    useEffect(() => {
        async function init() {
            try {
                const data = await getAllProbes();
                const myOps = await getMyOperations();

                setProbes(data);
                setMyOperations(myOps);
            } catch (e) {

            }
        }
        
        init();
    }, [getAllProbes, getMyOperations]);

    const createOperationTouch = async () => {
        errorOperation.current.hide();
        setCreatingOp(true);

        try {
            await createOperation(
                operation,
                format,
                params,
                probesTouched
            );

            retrieveOperations();
        } catch (e) {
            errorOperation.current.display();
        }

        setCreatingOp(false);
    }

    const findOperationTouch = async () => {
        errorSearching.current.hide();
        setSearching(true);

        try {
            const data = await findOperation(
                searchOperation
            );
            
            setResults(data);
        } catch (e) {
            errorSearching.current.display();
        }

        setSearching(false);
    }

    const searchEnabled = () => {
        return searchOperation.length > 0 && !searching;
    }

    const createOperationEnabled = () => {
        return Object.keys(params).length > 0 && probesTouched.length > 0 && !creatingOp;
    }

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

    const operationSelect = (event) => {
        setOperation(event.target.value);
    }

    const formatSelect = (event) => {
        setFormat(event.target.value);
    }

    const searchInput = (event) => {
        setSearchOperation(event.target.value);
    }

    const onParamsSet = (event) => {
        if (event.error === false) {
            setParams(event.jsObject);
        } else {
            setParams({})
        }
    }

    const renderOperations = () => {
        if (myOperations.length === 0) {
            return (
                <Row className={styles.noOperations}>
                    No tienes mediciones registradas
                </Row>
            )
        }

        let rows = []

        myOperations.map((op, idx) => 
            rows.push(
                <ListGroup.Item key={idx}>
                    <Row className={styles.operationInfo}>
                        <Col xl={2} lg={2} md={2} sm={2} xs={12}>
                            <MdAssessment 
                                size="3em"
                                color="blue"
                            />
                        </Col>
                        <Col xl={10} lg={10} md={10} sm={10} xs={10}>
                            <Accordion>
                                <Card>
                                    <Card.Header >
                                        <Accordion.Toggle as={Button} variant="link" eventKey={String(idx)}>
                                            Ver parámetros
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={String(idx)}>
                                        <Card.Body>
                                        <ListGroup>
                                            <ListGroup.Item>
                                                Id: {op["_id"]}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                Créditos: {op["credits"]}
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                Parámetros: <br/>
                                                <div>
                                                    <pre>
                                                        {JSON.stringify(op["params"], null, 2)}
                                                    </pre>
                                                </div>
                                            </ListGroup.Item>
                                        </ListGroup>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </Col>
                    </Row>
                </ListGroup.Item>
            )
        );
                
        return (
            <ListGroup>
                {rows}
            </ListGroup>
        );
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
                    <Container>
                        <Form.Row>
                            <Col
                                xl={8} lg={8} md={8} sm={8} xs={12}
                            >
                                <Form.Control
                                    type="input"
                                    placeholder="Identificador..."
                                    className={styles.search}
                                    onChange={searchInput}
                                />
                            </Col>
                            <Col
                                xl={4} lg={4} md={4} sm={4} xs={12}
                                className={styles.centered}
                            >
                                <ButtonLoad
                                    variant="primary"
                                    type="button"
                                    onClick={findOperationTouch}
                                    disabled={!searchEnabled()}
                                    className={styles.centered}
                                    loading={searching}
                                >
                                    Buscar
                                </ButtonLoad>
                            </Col>
                        </Form.Row>
                        <ErrorMessage
                            ref={errorSearching}
                            styles={styles.error}
                            message="La operación no pudo obtenerse"                        
                        />
                        {
                            Object.keys(results).length > 0 &&
                            <Form.Row>
                                {showResults()}
                            </Form.Row>
                        }
                    </Container>
                </Form>
            </Row>
            <Row className={[styles.surface, "mx-auto", "mt-4"]}>
                <Form className={styles.form}>
                    <Form.Label className={[styles.title, "h3"]}>
                        Mis mediciones
                    </Form.Label>
                    <Container>
                        {renderOperations()}
                    </Container>
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
                            <Form.Control
                                as="select"
                                className={styles.options}
                                onChange={operationSelect}
                            >
                                <option>{OPERATIONS[0]}</option>
                                <option>{OPERATIONS[1]}</option>
                                <option>{OPERATIONS[2]}</option>
                            </Form.Control>
                        </Col>
                    </Form.Row>
                    {
                        operation === OPERATIONS[0] &&
                        <Form.Row className={"pb-4"}>
                            <Col
                                xl={8} lg={8} md={8} sm={8} xs={12}
                            >
                            <Form.Control
                                as="select"
                                className={styles.options}
                                onChange={formatSelect}
                            >
                                <option>{TRACEROUTE_FORMAT[0]}</option>
                                <option>{TRACEROUTE_FORMAT[1]}</option>
                            </Form.Control>
                            <Form.Text
                                className={"text-muted"}
                                >
                                Formato de salida de datos
                            </Form.Text>
                            </Col>
                        </Form.Row>
                    }
                    <Form.Row className={"pt-4"}>
                        <Col
                            xl={8} lg={8} md={8} sm={8} xs={12}
                        >
                            <Form.Label>
                                Parámetros de la medición
                            </Form.Label>
                            <Form.Group controlId="formJson">
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
                                        onChange={onParamsSet}
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
                                    Para aprender más sobre parámetros, consultar la
                                    <a href={"https://github.com/fedefunes96/pladmed-backend/blob/master/docs/operation-parameters.md"}>
                                        &nbsp;documentación de Pladmed
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
                    <ErrorMessage
                        ref={errorOperation}
                        styles={styles.error}
                        message="La operación no pudo ser creada"                        
                    />
                    <Form.Row className={styles.buttonCreate}>
                        <ButtonLoad
                            variant="primary"
                            type="button"
                            onClick={createOperationTouch}
                            disabled={!createOperationEnabled()}
                            className={styles.centered}
                            loading={creatingOp}
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
