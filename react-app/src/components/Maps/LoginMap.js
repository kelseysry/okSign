import { GoogleMap, useJsApiLoader, Marker, InfoWindow} from '@react-google-maps/api';
import './Maps.css'

import React, { useEffect, useState } from 'react';

const LoginMap= ({profiles, keyy}) => {


  // const [key, setKey] = useState([]);

  const [selectedCenter, setSelectedCenter] = useState(null);



  let allMarkers;
  allMarkers = profiles

  const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: keyy
    })


    useEffect(() => {
      const listener = e => {
        if (e.key === "Escape") {
          setSelectedCenter(null);
        }
      };
      window.addEventListener("keydown", listener);

      return () => {
        window.removeEventListener("keydown", listener);
      };
    }, []);


    const center = {
      lat: 35,
      lng: -180
    };

    const options = { closeBoxURL: '', enableEventPropagation: true };

    const containerStyle = {
      width: '1150px',
      height: '600px',
    };

    return (
      <>


      <div className="big-screen-home">
        {(isLoaded && allMarkers.length && keyy) && (
        <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={3}
        center={center}
        >

        {allMarkers?.map((center, idx) => (
              <Marker
                key={idx}

                position={{
                  lat: parseFloat(center.lat),
                  lng: parseFloat(center.lng)
                }}

                // causes pop up
                onClick={() => {
                  setSelectedCenter(center);
              }}
              />
            ))}

          {selectedCenter && (
                <InfoWindow
                  onCloseClick={() => {
                    setSelectedCenter(null);
                  }}
                  position={{
                    lat: parseFloat(selectedCenter.lat),
                    lng: parseFloat(selectedCenter.lng)
                  }}
                >
                  <div className="image-map-container" style={{ backgroundImage: `url('${selectedCenter.image_url1}')`}}></div>
                </InfoWindow>
          )}
        </GoogleMap>
        )}
      </div>
      </>
    );

}

export default LoginMap
