import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
// import { GetMatches } from "../../context/MatchesContext";
import React, { useState, useEffect } from 'react';
import { getProfiles } from '../../store/profile';
import MatchProfile from '../MatchProfile';


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
        <div>in match profile page {matchProfileObj[0]?.age}</div>
        <img className="match_profile_image_discover" src={matchProfileObj[0]?.image_url1} alt="match_image"/>
        </>
      )
    }

    </>
  )

}


export default MatchProfilePage
