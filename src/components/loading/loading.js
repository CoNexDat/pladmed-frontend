import React, { useState, useRef, useEffect } from 'react';
import {
    Container,
    Spinner,
} from 'react-bootstrap';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

function Loading(props) {
    const children = useRef();

    const [height, setHeight] = useState("100vh")

    useEffect(() => {
        setHeight(children.current.offsetHeight)
    }, [])

    return (
        <Container fluid className={styles.container}>
            <div ref={children}>
                {props.children}
            </div>
            {
                props.loading &&
                <Container
                    fluid
                    className={styles.loading}
                    style={{height: height}}
                >           
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </Container>
            }
        </Container>
    )
}

Loading.propTypes = {
    loading: PropTypes.bool.isRequired
}

export default Loading;
