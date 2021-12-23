import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
// import { GetMatches } from "../../context/MatchesContext";
import React, { useState, useEffect } from 'react';
import { getProfiles } from '../../store/profile';
import MatchProfile from '../MatchProfile';
import MatchProfilePercent from '../MatchProfilePercent';
import MatchProfilePics from '../MatchProfilePics';
import UserProfileAboutSection from '../UserProfileAboutSection';
import MatchAboutSection from '../MatchAboutSection';
import MatchDetailSection from '../MatchDetailSection';
import MapPageE from '../Maps';


const MatchProfilePage = () => {
  const dispatch = useDispatch()
  const { profileId }  = useParams();

  // const {userIdsPercentsObj} = GetMatches()
  // console.log("match profile ids from context", userIdsPercentsObj)

  const [isLoaded, setIsLoaded] = useState(false)

  const profilesObj = useSelector((state) => state?.profile)
  const profiles = Object?.values(profilesObj)[0]


  useEffect(async () => {
    // dispatch(clearProfiles())
    await dispatch(getProfiles());
    // await getCurrentProfile(user_id,profiles)
    if (!isLoaded) setIsLoaded(true);
  },[dispatch, profiles?.length, profileId, isLoaded])

  let matchProfileObj = profiles?.filter((profile) => {
    return profile?.user_id === +profileId
  })

  // console.log("matchProfile", matchProfileObj[0]?.age)


  return (

    <>
    {
      isLoaded && matchProfileObj[0]?.user_id && (
        <>
          <div className="Entire-Match-Profile-Container">
            <div className="match-profile-pics-container">
              <MatchProfilePics matchProfileObj={matchProfileObj}/>
            </div>

            <div className="about-detail-container">
              <div className="match-user-about-container">
                <MatchAboutSection currentUserProfile={matchProfileObj}/>
                <MatchProfilePercent matchProfileObj={matchProfileObj}/>
                <MapPageE image={matchProfileObj}/>
              </div>
              <div className="match-user-detail-container">
                <MatchDetailSection currentUserProfile={matchProfileObj}/>
              </div>
            </div>




          </div>
        </>
      )
    }

    </>
  )

}


export default MatchProfilePage
