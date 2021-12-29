import { GoogleMap, useJsApiLoader, Marker, InfoWindow, InfoBox} from '@react-google-maps/api';

import React, { useEffect, useState } from 'react';
import './ErrorMaps.css'

const ErrorMaps= ({allMarkers, keyy}) => {

  const [selectedCenter, setSelectedCenter] = useState(null);

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
      lat: 11.560114866039607,
      lng: 104.91626530485476
    };

    const options = { closeBoxURL: '', enableEventPropagation: true };

    const containerStyle = {
      width: '900px',
      height: '600px',
    };

    return (
      <>


      <div className="big-screen-home">
        {(isLoaded && allMarkers.length && keyy) && (
        <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={14}
        center={center}
        >

{
          allMarkers.map((marker,idx) => (
            <InfoBox
            key={idx}
            // onLoad={onLoad}
            options={options}
            position={marker.position}
          >
                  <div className ="error-black"style={{ backgroundColor: 'black', opacity: 0.75, padding: 3, color: 'white'}}>
              <div style={{ fontSize: 16, fontColor: `#08233B` }}>
                {marker.name}
              </div>
            </div>
          </InfoBox>
          ))}

        {allMarkers?.map((center, idx) => (
              <Marker
                key={idx}

                position={{
                  lat: parseFloat(center.position.lat),
                  lng: parseFloat(center.position.lng)
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

export default ErrorMaps
