import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow} from '@react-google-maps/api';
import { Polyline } from '@react-google-maps/api';
import './Maps.css'
import { useSelector, useDispatch } from "react-redux";
import mapStyle from '../../data/mapStyle';


const MapTwoUsers= ({user, match, keyy}) => {

  // console.log("match in page", match)
  // console.log("user in page", user)

const center = {
  lat: 35,
  lng: -180
};

const k = useSelector((state) => state.key)

const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: keyy
  })

  // useEffect(() => {
  //   dispatch(getAllMarkers())
  // },[dispatch])

  const containerStyle = {
    width: '699px',
    height: '500px'
  };


  const onLoad = polyline => {
    console.log('polyline: ', polyline)
  };



  const path = [
    {lat: user[0]?.lat, lng: user[0]?.lng},
    {lat: match[0]?.lat,lng: match[0]?.lng},
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
<>
      <div className="map_page__container">

        {isLoaded ?<GoogleMap
          mapContainerStyle={containerStyle}
          zoom={2}
          center={center}
          onUnmount={onUnmount}
          options={{
            styles:mapStyle
          }}
          >
              <Marker
                key={user[0]?.id}
                position={{lat:user[0]?.lat, lng:user[0]?.lng}}

                streetView={false}
                >
                  <InfoWindow
                position={{lat:user[0]?.lat, lng:user[0]?.lng}}
                >
                  <div className="image-map-container" style={{ backgroundImage: `url('${user[0]?.image_url1}')`}}>
                  </div>
                </InfoWindow>
             </Marker>

             <Marker
                key={match[0]?.id}
                position={{lat:match[0]?.lat, lng:match[0]?.lng}}

                streetView={false}
                >
                  <InfoWindow
                position={{lat:match[0]?.lat, lng:match[0]?.lng}}
                >
                  <div className="image-map-container" style={{ backgroundImage: `url('${match[0]?.image_url1}')`}}>
                  </div>
                </InfoWindow>
             </Marker>

        <Polyline
              onLoad={onLoad}
              path={path}
              options={options}
            />

        </GoogleMap>:null}
        </div>
        <div id='panel'>
        </div>
  </>
    );

}

export default MapTwoUsers
