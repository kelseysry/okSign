import horoscopePics from "../../data/horoscopePics"
import "./MatchProfileHoroscope.css"
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { getHoroscopeMatchPercent } from "../DiscoverHoroscope/getHoroScopeMatchPercent";
import { horoscopeContent } from "../DiscoverHoroscope/getHoroScopeMatchPercent";

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

console.log("horoscopeContent?.length",horoscopeContent?.length < 500 )

  return (
    <>
      <div className="matchContainerHeader">Horoscope Compatibility</div>

      <section className="MatchHoroscopeInnerContainer">
        <p>
        <img className="bench" src={horoscopePics.collection[12].imageUrl} />
        <section className={horoscopeContent?.length < 500 ? 'contentHoroscopeFiller' : 'noContentHoroscopeFiller'}>
        <div>&nbsp;&nbsp;</div>
        <div>&nbsp;&nbsp;</div>
        <div>&nbsp;&nbsp;</div>
        </section>
        {horoscopeContent}
        </p>

        <div className="matchHoroscopeSign">
          <img src={horoscopePics.collection[matchProfile.horoscope_id - 1 ]?.sign} />
        </div>
        <div className="currentUserHoroscopeSign">
          <img src={horoscopePics.collection[currentUserHoroscopeId - 1 ]?.sign} />
        </div>
        <div className="horoscopePercentBubble">
        {getHoroscopeMatchPercent(matchProfile.horoscope_id, currentUserHoroscopeId)}%
        </div>
        {/* <div className="circle">&nbsp;</div> */}
      </section>

    </>

  )


}

export default MatchProfileHoroscope
