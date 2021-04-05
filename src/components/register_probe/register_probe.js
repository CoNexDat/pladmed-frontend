import React, { PureComponent, createRef } from 'react';
import {
    Form,
    Button,
    Modal
} from 'react-bootstrap';
import styles from './styles.module.css';
import ButtonLoad from '../button_load/button_load'
import ErrorMessage from '../error_message/error_message'
import PropTypes from 'prop-types';

class RegisterProbe extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            latitude: "",
            longitude: "",
            showModal: false,
            registeringProbe: false
        }

        this.errorRegister = createRef();
    }

    hide = () => this.setState({showModal: false, latitude: "", longitude: ""});
    
    display = () => this.setState({showModal: true});

    registerProbe = async () => {
        this.setState({registeringProbe: true})

        try {
            await this.props.registerProbe(
                this.state.latitude,
                this.state.longitude,
            );
            
            this.setState({registeringProbe: false})
            this.hide();
        } catch (e) {
            this.setState({registeringProbe: false})
            this.errorRegister.current.display();
        }        
    }

    onLatitudeSet = (event) => {
        this.setState({latitude: event.target.value})
    }

    onLongitudeSet = (event) => {
        this.setState({longitude: event.target.value})
    }

    registerEnabled = () => {
        return (
            this.state.latitude !== "" &&
            this.state.longitude !== "" &&
            !this.state.registeringProbe
        );
    }

    render() {
        return (
            <Modal
                show={this.state.showModal}
                onHide={this.hide}
                animation={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Registrar sonda
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control
                            type="number"
                            className={styles.controlBox}
                            placeholder="Latitud..."
                            onChange={this.onLatitudeSet}
                        />
                        <Form.Control
                            type="number"
                            className={styles.controlBox}
                            placeholder="Longitud..."
                            onChange={this.onLongitudeSet}
                        />
                    </Form>
                    <ErrorMessage
                        ref={this.errorRegister}
                        styles={styles.error}
                        message="No podemos registrar la sonda por el momento"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.hide}>
                        Cerrar
                    </Button>
                    <ButtonLoad
                        variant="primary"
                        type="button"
                        onClick={this.registerProbe}
                        disabled={!this.registerEnabled()}
                        className={styles.button}
                        loading={this.state.registeringProbe}
                    >
                        Registrar sonda
                    </ButtonLoad>
                </Modal.Footer>
            </Modal>
        );
    }
};

RegisterProbe.propTypes = {
    registerProbe: PropTypes.func.isRequired
}

export default RegisterProbe;
