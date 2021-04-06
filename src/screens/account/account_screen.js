import React, { useContext, useEffect, useState, useRef } from 'react';
import {
    Container,
    Row,
    Form,
    OverlayTrigger,
    Tooltip,
    Button,
    Col,
    ListGroup
} from 'react-bootstrap';
import { Context } from '../../controllers/context_provider'
import styles from './styles.module.css';
import Loading from '../../components/loading/loading'
import { BsFillQuestionCircleFill } from "react-icons/bs";
import RegisterProbe from '../../components/register_probe/register_probe'
import TokenModal from '../../components/token_modal/token_modal'
import { MdRouter, MdLocationOn, MdInfoOutline, MdVpnKey } from "react-icons/md"

function AccountScreen() {
    const { getUserData, getMyProbes, registerProbe } = useContext(Context);

    const [id, setId] = useState("")
    const [email, setEmail] = useState("");
    const [credits, setCredits] = useState(0);
    const [loading, setLoading] = useState(true);
    const [myProbes, setMyProbes] = useState([]);

    const registerModal = useRef();
    const tokenModal = useRef();

    const handleShowModal = () => registerModal.current.display();

    const retrieveProbes = async () => {
        const probes = await getMyProbes();

        setMyProbes(probes)
    }

    useEffect(() => {
        async function init() {
            try {
                const userData = await getUserData();
                const probes = await getMyProbes();
                
                setEmail(userData["email"])
                setCredits(userData["credits"])
                setId(userData["_id"])
                setMyProbes(probes)
                setLoading(false);
            } catch (e) {
                
            }
        }
        
        init();
    }, [getUserData, getMyProbes]);

    const register = async (latitude, longitude) => {
        await registerProbe(latitude, longitude);
        retrieveProbes();
    }

    const checkTokenAccess = (idx) => {
        tokenModal.current.display(myProbes[idx]);
    }

    const renderProbes = () => {
        if (myProbes.length === 0) {
            return (
                <Row className={styles.noProbes}>
                    No tienes sondas registradas
                </Row>
            )
        }

        let rows = []

        myProbes.map((probe, idx) => 
            rows.push(
                <ListGroup.Item key={idx} className={styles.probeInfo}>
                    <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                        <MdRouter
                            size="3em"
                            color={probe["connected"] ? "green" : "red"}
                        />
                    </Col>
                    <Col xl={10} lg={10} md={10} sm={10} xs={10}>
                        <ListGroup variant="flush">
                            <ListGroup.Item className={styles.group}>
                                <MdInfoOutline
                                    size="1.3em"
                                />
                                &nbsp;
                                {probe["identifier"]}
                            </ListGroup.Item>
                            <ListGroup.Item className={styles.group}>
                                <MdLocationOn
                                    size="1.3em"
                                />
                                &nbsp;
                                {probe["location"]["latitude"]},
                                {probe["location"]["longitude"]}
                            </ListGroup.Item>
                            <ListGroup.Item
                                className={styles.groupToken}
                                onClick={checkTokenAccess.bind(this, idx)}
                            >
                                <MdVpnKey
                                    size="1.3em"
                                    color='black'
                                />
                                &nbsp;
                                Ver clave de acceso
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </ListGroup.Item>
            )
        );
                
        return (
            <ListGroup>
                {rows}
            </ListGroup>
        );
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Los creditos se consiguen mientras tus sondas realizan mediciones
        </Tooltip>
    );

    const QuestionTooltip = () => {
        return (
            <OverlayTrigger
                placement={"bottom"}
                overlay={renderTooltip}
                transition={false}
            >
                {({ ref, ...triggerHandler }) => (
                    <div
                        {...triggerHandler}
                    >
                        <div ref={ref} className={styles.question}>
                            {credits}&nbsp;
                            <BsFillQuestionCircleFill
                                size="1.0em"
                            />
                        </div>
                    </div>

                )}
            </OverlayTrigger>
        );
    }

    return (
        <Loading
            loading={loading}
        >
            <Container
                fluid
                className={[styles.mainContainer, "py-4"]}
            >
                <Row className={[styles.accountData, "mx-auto"]}>
                    <Form className={styles.form}>
                        <Form.Label className={[styles.title, "h3"]}>
                            Datos de cuenta
                        </Form.Label>
                        <Form.Group as={Row} controlId="formId" className={"h6"}>
                            <Form.Label
                                column
                                xl={2} lg={2} md={2} sm={2} xs={3}
                                className={styles.label}
                            >
                                Id:
                            </Form.Label>
                            <Form.Label
                                column
                                xl={4} lg={4} md={4} sm={4} xs={4}
                            >
                                {id}
                            </Form.Label>
                        </Form.Group>                        
                        <Form.Group as={Row} controlId="formEmail" className={"h6"}>
                            <Form.Label
                                column
                                xl={2} lg={2} md={2} sm={2} xs={3}
                                className={styles.label}
                            >
                                Email:
                            </Form.Label>
                            <Form.Label
                                column
                                xl={4} lg={4} md={4} sm={4} xs={4}
                            >
                                {email}
                            </Form.Label>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formCredits" className={"h6"}>
                            <Form.Label
                                column
                                xl={2} lg={2} md={2} sm={2} xs={3}
                                className={styles.label}
                            >
                                Créditos:
                            </Form.Label>
                            <Form.Label
                                column
                                xl={2} lg={2} md={2} sm={2} xs={2}
                                className={styles.questionContainer}
                            >
                                {QuestionTooltip()}
                            </Form.Label>            
                        </Form.Group>
                    </Form>
                </Row>
                <Row className={[styles.accountData, "mt-4", "mx-auto"]}>
                    <Form className={styles.form}>
                        <Form.Label className={[styles.title, "h3"]}>
                            Sondas
                        </Form.Label>
                        {renderProbes()}
                        <Row className={styles.registerProbe}>
                            <Button variant="primary" onClick={handleShowModal}>
                                Registrar sonda
                            </Button>
                        </Row>
                    </Form>
                </Row>  
                <RegisterProbe
                    ref={registerModal}
                    registerProbe={register}
                />
                <TokenModal
                    ref={tokenModal}
                />
            </Container>
        </Loading>
    );
};

export default AccountScreen;
