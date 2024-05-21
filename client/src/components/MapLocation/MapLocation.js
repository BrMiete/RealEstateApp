import React, { useContext, useEffect, useState } from 'react';
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import HouseIcon from '../../images/HouseIcon.png';

const MapLocation = ({latLng, setLatLng}) => {
    const libraries = ['places'];
    const [markerPosition, setMarkerPosition] = useState(latLng);
    
    const handleMapClick = e => {
        setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        if (setLatLng) {
            setLatLng({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        }
    }

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries
    });

    useEffect(()=>{
        if(latLng.lat){
            setMarkerPosition(latLng);
        }
    },[latLng]);

    return(
        <div className='text-sm'>
            {isLoaded?
                <GoogleMap
                    mapContainerStyle={{width: '330px', height: '240px'}}
                    center = {latLng.lat?latLng:{ lat: -25.28646, lng: -57.647 }}
                    zoom = {8}
                    onClick={handleMapClick}
                >
                    {markerPosition && latLng && <MarkerF position={markerPosition} icon={{url: HouseIcon}}/>}
                </GoogleMap>
            : <p>Loading...</p>
            }
        </div>
    );
}

export default MapLocation;
