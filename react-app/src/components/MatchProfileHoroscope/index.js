import horoscopePics from "../../data/horoscopePics"
import "./MatchProfileHoroscope.css"
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

const MatchProfileHoroscope = ({matchProfile}) => {

  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id = sessionUser?.id

  const [currentUserProfile, setCurrentUserProfile] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/profiles/userProfile/${user_id}`);
      const responseData = await response.json();
      setCurrentUserProfile(responseData);
    }
    fetchData();
  }, []);

  let currentUserHoroscopeId = currentUserProfile?.oneProfile[0]?.horoscope_id
  
  return (
    <>
      <div className="matchContainerHeader">Horoscope Compatibility</div>
      <div className="MatchHoroscopeInnerContainer">
        <div className="bench">
          <img src={horoscopePics.collection[12].imageUrl} />
        </div>
        <div className="matchHoroscopeSign">
          <img src={horoscopePics.collection[matchProfile.horoscope_id - 1 ]?.sign} />
        </div>
        <div className="currentUserHoroscopeSign">
          <img src={horoscopePics.collection[currentUserHoroscopeId - 1 ]?.sign} />
        </div>
      </div>
    </>

  )


}

export default MatchProfileHoroscope
