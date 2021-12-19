
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from 'react';
import { getProfile } from "../../store/profile";

// have access to the profile.id
// reference MatchProfile
// need to grab the getProfile thunk and display each profile that way

const SearchMatchTile = ({matchProfileId}) => {
  const dispatch = useDispatch()

  const profileObj = useSelector((state) => state.profile)
  const profile = Object.values(profileObj)
  console.log("profile in searchMatchtile", profile)
  console.log("matchProfileId in search", matchProfileId)

  useEffect(() => {
    dispatch(getProfile(matchProfileId))
  },[dispatch, matchProfileId])


  return (
    <>
    <img className="match_profile_image" src={matchProfileId?.image_url1} alt="match_image"/>

    </>
  )
}

export default SearchMatchTile
