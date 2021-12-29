import React, { useState, useEffect } from 'react';
import LoginMap from '../Maps/LoginMap';

const LoginMapContainer = () => {

  const [profiles, setProfiles] = useState([]);

  const [key, setKey] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/profiles/');
      const responseData = await response.json();
      setProfiles(responseData.profiles);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch (`/api/maps/key`)
      const resData = await res.json()
      setKey(resData);
    }
    fetchData();
  },[]);

  console.log("profiles in login map container", profiles)

  return (

    <div>
      {key.k? <LoginMap profiles={profiles} keyy={key.k} /> : null}
    </div>
  )
}

export default LoginMapContainer
