import { GoogleMap, useJsApiLoader, Marker, InfoWindow, StyledMapType} from '@react-google-maps/api';
import './Maps.css'
import './LoginMap.css'

import React, { useEffect, useState } from 'react';

const LoginMap= ({profiles, keyy}) => {

  const [selectedCenter, setSelectedCenter] = useState(null);

  // console.log("styles", styles)

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
      lat: 50,
      lng: -180
    };

    const options = { closeBoxURL: '', enableEventPropagation: true };

    const containerStyle = {
      width: '2000px',
      height: '600px',
    };



    return (
      <>

      {/* <div> */}

      <div>
        {(isLoaded && allMarkers.length && keyy) && (
        <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={3}
        center={center}

        options={{
          styles: [ {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "saturation": 36
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 40
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 17
                },
                {
                    "weight": 1.2
                }
            ]
        },
        {
            "featureType": "administrative.province",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#e3b141"
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#e0a64b"
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#0e0d0a"
                }
            ]
        },
        {
            "featureType": "administrative.neighborhood",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#d1b995"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 21
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#12120f"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "lightness": "-77"
                },
                {
                    "gamma": "4.48"
                },
                {
                    "saturation": "24"
                },
                {
                    "weight": "0.65"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "lightness": 29
                },
                {
                    "weight": 0.2
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#f6b044"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#4f4e49"
                },
                {
                    "weight": "0.36"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#c4ac87"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#262307"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#a4875a"
                },
                {
                    "lightness": 16
                },
                {
                    "weight": "0.16"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#deb483"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 19
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#0f252e"
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#080808"
                },
                {
                    "gamma": "3.14"
                },
                {
                    "weight": "1.07"
                }
            ]
        }]
        }}

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
