import React, { PureComponent } from 'react';
import {
    Button,
    Modal
} from 'react-bootstrap';

class TokenModal extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            token: ""
        }
    }

    hide = () => this.setState({showModal: false});
    
    display = (probe) => this.setState({showModal: true, token: probe["token"]});

    render() {
        return (
            <Modal
                show={this.state.showModal}
                onHide={this.hide}
                animation={false}
                centered
                scrollable={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Clave de acceso
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.token}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.hide}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
};

export default TokenModal;
