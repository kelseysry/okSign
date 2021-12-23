import React, { useState, useCallback } from 'react';
import { useSelector } from "react-redux";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow} from '@react-google-maps/api';
import './Maps.css'

const AllUsersMap= ({matchUsersProfileArr}) => {

  const matchUsersProfileArray = Object.values(matchUsersProfileArr[0])
console.log("matchUsersProfileArr in all maps------", matchUsersProfileArray)


const center = {
  lat: 35,
  lng: -180
};

const markers = [{id:2, lat: 33.85897723024835, lng: -118.08115190136616}, {id:1, lat: 35.66386037006631	, lng: 139.71280545767016}]

const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY
  })

  const containerStyle = {
    width: '700px',
    height: '500px'
  };


  const onLoad = polyline => {
    console.log('polyline: ', polyline)
  };

  const path = [
    {lat: 33.85897723024835, lng: -118.08115190136616},
    {lat: 35.66386037006631	, lng: 139.71280545767016},
  ];

  // const path = [
  //   {lat: user[0]?.lat, lng: user[0]?.lng},
  //   {lat: match[0]?.lat,lng: match[0]?.lng},
  // ];

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


               {matchUsersProfileArray?.map((matchUserProfileArr) => (

              <Marker
              key={matchUserProfileArr?.id}
              position={{lat:matchUserProfileArr?.lat, lng:matchUserProfileArr?.lng}}
              // icon={image.image[0].image_url1}
              // title={marker.name}
              streetView={false}
              >

             </Marker>
           ))}



        </GoogleMap>:null}
        </div>
        <div id='panel'>
        </div>
      </div>
    );

}

export default AllUsersMap
