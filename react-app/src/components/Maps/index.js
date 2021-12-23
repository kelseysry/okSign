import React, { useState, useCallback } from 'react';
import { useSelector } from "react-redux";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';


const MapPageE= () => {

const [currentPosition, setCurrentPosition] = useState({lat:43.11016617798622,lng:-89.48826131670266})
const [destination, setDestination] = useState('')
const [origin, setOrigin] = useState({lat:43.00952168472677, lng:-89.47153080578808})
const [response, setResponse] = useState(null)



const markers = [{id:1, lat:43.084618386432446, lng:-89.47629842436679, name:"pancake", color:"blue"}, {id:2, lat:43.07709559601529, lng:-89.44591435948044, name:"panera", color:"red"}]

const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY
  })

  const containerStyle = {
    width: '800px',
    height: '800px'
  };

  const [map, setMap] = useState(null)

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  const directionsCallback = (response) => {

    if (response !== null) {
      if (response.status === 'OK') {
        setResponse(
            response
        )


    } else {
        console.log("Route: " + response.status);
    }
    }
  }
  const makeDestination = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setDestination({lat, lng})
  }


    return (
      // Important! Always set the container height explicitly
      <div className="map_page__container">

        <div style={{ height: '900px', width: '900px' }}>
        {isLoaded ?<GoogleMap
          mapContainerStyle={containerStyle}
          zoom={8}
          center={currentPosition}
          onUnmount={onUnmount}
          >
              <Marker
              title='Starting Point'
              position={origin}
              />
               {markers?.map((marker) => (

              <Marker
              key={marker.id}
              position={{lat:marker.lat, lng:marker.lng}}
              title={marker.name}
              icon={{
                path: 'M 100 100 L 300 100 L 200 300 z',
                fillColor: marker.color,
                fillOpacity: 1,
                scale: .2,
                strokeColor: 'gold',
                strokeWeight: 2
              }}
              onClick={(e)=>makeDestination(e)}
              streetView={false} >
              <InfoWindow
              position={{lat:marker.lat, lng:marker.lng}}
              >
                <div>
                <h3>Click the Marker make directions</h3>
                  <span style={{color: `${marker.color}`}}>{marker.name}</span>
                </div>
              </InfoWindow>
             </Marker>
           ))}
          { (destination !== '' && response === null) && (
                <DirectionsService
                  // required
                  options={{
                    destination: destination,
                    origin: origin,
                    travelMode: 'WALKING'
                  }}
                  // required
                  callback={directionsCallback}

                />
              )
            }

            {
              response !== null && (
                <DirectionsRenderer
                  panel={document.getElementById("panel")}
                  options={{
                    directions: response
                  }}

                />
              )
            }

        </GoogleMap>:null}
        </div>

        <div id='panel'>

        </div>

      </div>
    );

}

export default MapPageE
