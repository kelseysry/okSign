import React, { useState, useEffect } from 'react';
import ErrorMaps from './Errormaps';



const ErrorMapContainer = ({allMarkers}) => {

  const [key, setKey] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch (`/api/maps/key`)
      const resData = await res.json()
      setKey(resData);
    }
    fetchData();
  },[]);


  return (
    <div className="map">
       <div>
      {key.k? <ErrorMaps allMarkers={allMarkers} keyy={key.k}/> : null }
    </div>
    </div>
  );
};

export default ErrorMapContainer;
