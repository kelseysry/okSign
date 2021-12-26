
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
// import { getProfile } from "../../store/profile";
import { getProfiles } from "../../store/profile";


const GetProfilePic = ({userId}) => {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  let profile_id = +userId

  // let profileObj = useSelector((state) => state?.profile[userId])

  const profilesObj = useSelector((state) => state.profile)
  const profiles = Object.values(profilesObj)

  // // get one profile
  //   useEffect(() => {
  //     dispatch(getProfile(userId));
  //   }, [dispatch, userId]);

  useEffect(async () => {
    await dispatch(getProfiles())
    if (!isLoaded) setIsLoaded(true);

  }, [dispatch, profiles.length, isLoaded])

  // console.log("profileObj-------------", profileObj)

  const getMatchProfile = (profile_id) => {
    const matchProfile = profiles[0]?.filter(function(profile){
      // console.log("profile_id in get match", profile_id)
      // console.log("profile?.user_id in get match", profile?.user_id)
      // console.log("profile?.user_id in get match", profile)
      // console.log(profile?.user_id == profile_id)
      return profile?.user_id === +profile_id
    })
    if(matchProfile) {
      // console.log("match match", matchProfile)
      return matchProfile
    }
    else {
      return null
    }
  }

  // console.log("getmatchProfile", getMatchProfile(profile_id))
  // let matchProfileObj = (getMatchProfile(profile_id))


  return (
    <>
    { isLoaded && (

     <img className="match_profile_image" src={getMatchProfile(profile_id)[0]?.image_url1} alt="match_image"/>

    )}
    </>
  )
}

export default GetProfilePic
