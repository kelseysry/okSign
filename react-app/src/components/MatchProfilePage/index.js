import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import { getProfiles } from '../../store/profile';
import MatchProfilePercent from '../MatchProfilePercent';
import MatchProfilePics from '../MatchProfilePics';
import MatchAboutSection from '../MatchAboutSection';
import MatchDetailSection from '../MatchDetailSection';
import './MatchProfilePage.css'
import MatchProfileHoroscope from '../MatchProfileHoroscope';
import pictures from '../../data/pictures';

const MatchProfilePage = () => {
  const dispatch = useDispatch()
  const { profileId }  = useParams();


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
                <MatchProfileHoroscope matchProfile={matchProfileObj[0]}/>
                <MatchProfilePercent matchProfileObj={matchProfileObj}/>
              </div>
              <div className="match-user-detail-container">
                <MatchDetailSection currentUserProfile={matchProfileObj}/>
                <div className="rope-man">
                <img src={pictures.collection[16].imageUrl} />
                <div className="match-profile-chat-bubble">Message me! ⬆️ </div>
                </div>
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
