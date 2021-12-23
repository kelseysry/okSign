import React, { useState, useCallback } from 'react';
import { useSelector } from "react-redux";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { Polyline } from '@react-google-maps/api';

const MapPageE= (image) => {

const center = {
  lat: 0,
  lng: -180
};

const markers = [{id:2, lat: 33.85897723024835, lng: -118.08115190136616, name:"randoWhy", color:"red"}, {id:1, lat: 35.66386037006631	, lng: 139.71280545767016, name:"kels", color:"blue"}]

const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY
  })

  const containerStyle = {
    width: '800px',
    height: '800px'
  };


  const onLoad = polyline => {
    console.log('polyline: ', polyline)
  };

  const path = [
    {lat: 33.85897723024835, lng: -118.08115190136616},
    {lat: 35.66386037006631	, lng: 139.71280545767016},
  ];



  const [map, setMap] = useState(null)

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])


  const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 1,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1
  };


    return (
      // Important! Always set the container height explicitly
      <div className="map_page__container">

        <div style={{ height: '900px', width: '900px' }}>
        {isLoaded ?<GoogleMap
          mapContainerStyle={containerStyle}
          zoom={2}
          center={center}
          onUnmount={onUnmount}
          >


               {markers?.map((marker) => (

              <Marker
              key={marker.id}
              position={{lat:marker.lat, lng:marker.lng}}
              icon={image}
              title={marker.name}
              streetView={false} >
             </Marker>
           ))}

        <Polyline
              onLoad={onLoad}
              path={path}
              options={options}
            />

        </GoogleMap>:null}
        </div>
        <div id='panel'>
        </div>
      </div>
    );

}

export default MapPageE
