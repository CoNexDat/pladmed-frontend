import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import PropTypes from 'prop-types';
import L from 'leaflet';
import routerGreen from "../../assets/router_green.svg"
import routerRed from "../../assets/router_red.svg"
import routerOrage from "../../assets/router_orange.svg"

const iconRed = L.icon({
    iconUrl: routerRed,
    iconSize: [32, 32],
})

const iconGreen = L.icon({
    iconUrl: routerGreen,
    iconSize: [32, 32],
})

const iconOrange = L.icon({
    iconUrl: routerOrage,
    iconSize: [32, 32],
})

const LOW_AVAILABILITY = 0.3;

function Map(props) {
    const center = [5.409025, -16.994204];
    const {
        renderPopup, markers, markerTouch, renderTooltip,
        markerOpacity, ...otherProps
    } = props;

    const renderMarkerPopup = (marker) => {
        if (renderPopup === undefined) {
            return null;
        }

        return renderPopup(marker);
    }

    const renderMarkerTooltip = (marker) => {
        if (renderTooltip === undefined) {
            return null;
        }

        return renderTooltip(marker);
    }

    const markerTouched = (marker) => {
        if (markerTouch !== undefined) {
            markerTouch(marker);
        }
    }

    const selectIcon = (marker) => {
        if (marker["connected"]) {
            if (marker["availability"] < LOW_AVAILABILITY) {
                return iconOrange;
            }

            return iconGreen;
        }

        return iconRed;
    }

    const markerOpacitySet = (marker) => {
        if (markerOpacity !== undefined) {
            return markerOpacity(marker);
        }

        return 1.0;
    }

    return (
        <MapContainer {...otherProps} center={center} zoom={2} scrollWheelZoom={false}>
            <TileLayer
                attribution='<a href="https://www.google.es/maps/preview">Google Maps</a>'
                url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
            />
            {markers.map((marker, idx) => 
                <Marker
                    key={idx}
                    position={
                        [marker["location"]["latitude"],
                        marker["location"]["longitude"]]
                    }
                    eventHandlers={{
                        click: () => {
                            markerTouched(marker)
                        },
                    }}
                    icon={selectIcon(marker)}
                    opacity={markerOpacitySet(marker)}
                >
                    {renderMarkerPopup(marker)}
                    {renderMarkerTooltip(marker)}
                </Marker>
            )}
        </MapContainer>
    );
};

Map.propTypes = {
    markers: PropTypes.array.isRequired
}

export default Map;
