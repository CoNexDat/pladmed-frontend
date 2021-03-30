import React from 'react';
import {
    Container,
    Row,
    Col,    
    Image
} from 'react-bootstrap';
import styles from './styles.module.css';
import WorldNetwork from "../../assets/world_network.jpg";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function HomeScreen() {
    return (
        <Container
            fluid
            className={styles.mainContainer}
        >
            <Row className={[styles.title, "h2"]}>
                <Col>
                    Sobre el sistema de medición
                </Col>
            </Row>
            <Row className={styles.descriptionContainer}>
                <Col
                    xl={6} lg={6} md={12} sm={12} xs={12}
                    className={[styles.textContainer, "h4"]}
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sagittis at turpis et consectetur. Sed sit amet ultrices elit. Quisque accumsan libero non laoreet placerat. Phasellus blandit tellus eget suscipit mattis. Aliquam at eros urna. Proin placerat massa accumsan suscipit laoreet. Nulla suscipit fermentum ipsum, in vehicula neque luctus in.
                </Col>
                <Col
                    xl={6} lg={6} md={12} sm={12} xs={12}
                    className={styles.imageContainer}
                >
                    <Image className={styles.image} src={WorldNetwork} rounded />
                </Col>
            </Row>
            <Row>
                <Col
                    xl={12} lg={12} md={12} sm={12} xs={12}
                    className={styles.mapContainer}
                >
                    <Row className={[styles.title, "h2"]}>
                        Tenemos varias sondas disponibles para tus mediciones
                    </Row>
                    <MapContainer className={styles.map} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='<a href="https://www.google.es/maps/preview">Google Maps</a>'
                            url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
                        />
                        <Marker position={[51.505, -0.09]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                        </Marker>
                    </MapContainer>
                </Col>
            </Row>
        </Container>
    );
};

export default HomeScreen;
