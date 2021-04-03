import React from 'react';
import {
    Container
} from 'react-bootstrap';
import styles from './styles.module.css'

function Footer(props) {
    if (!props.logged) {
        return null;
    }

    const email = "pladmed@cnet.fi.uba.ar";

    return (
        <Container fluid className={styles.footer}>
            <a href={"mailto:" + email} className={styles.link}>
                {email}
            </a>
            <div>
                (+54 11) 5285 0716 / 0704
            </div>
            <div>
                Facultad de Ingeniería - Universidad de Buenos Aires
            </div>
        </Container>
    );        
}

export default Footer;
