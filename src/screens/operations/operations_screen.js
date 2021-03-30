import React from 'react';
import {
    Container,
} from 'react-bootstrap';
import styles from './styles.module.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function OperationsScreen() {
    return (
        <MapContainer className={"map"} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default OperationsScreen;
