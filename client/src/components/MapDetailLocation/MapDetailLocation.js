import React, { useContext, useEffect, useState } from 'react';
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import HouseIcon from '../../images/HouseIcon.png';


const MapDetailLocation = ({coordinates}) => {
    const libraries = ['places'];
    const [markerPosition, setMarkerPosition] = useState(coordinates);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libraries
    });
    return  <div className='text-sm'>
        {isLoaded?
            <GoogleMap
                mapContainerStyle={{width: '700px', height: '250px'}}
                center = {coordinates}
                zoom = {10}
            >
                {markerPosition && <MarkerF position={markerPosition} icon={{url: HouseIcon}}/>}
            </GoogleMap>
        : <p>Loading...</p>
        }
    </div>
    
}

export default MapDetailLocation;