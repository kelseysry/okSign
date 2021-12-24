import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow} from '@react-google-maps/api';
import './Maps.css'

import { useEffect } from 'react';

const AllUsersMap= ({matchUsersProfileArr}) => {




  const [selectedCenter, setSelectedCenter] = useState(null);

  let matchUsersProfileArray;
  if(matchUsersProfileArr.length) {
     matchUsersProfileArray = Object.values(matchUsersProfileArr)
  }

  let allMarkers;
  allMarkers = matchUsersProfileArray

  const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: process.env.REACT_APP_MAPS_KEY
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
      width: '900px',
      height: '600px',
    };

    return (
      <>

      <div className="big-screen-home">
        {isLoaded && (
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

export default AllUsersMap
