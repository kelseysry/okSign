
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import { getProfile } from "../../store/profile";
import { clearProfiles } from "../../store/profile";

const GetProfilePic = ({userId}) => {
  const dispatch = useDispatch()

  let profileObj = useSelector((state) => state?.profile[userId])

  // const profile = Object.values(profileObj)


  // get one profile
    useEffect(() => {
      dispatch(getProfile(userId));
    }, [dispatch, userId]);

  // useEffect(() => {
  //   dispatch(clearProfiles())
  //   dispatch(getProfile());
  // }, [dispatch, userId]);

  console.log("profileObj-------------", profileObj)
  // console.log("profile-------------", profile)






  return (
    <>
      <img className="match_profile_image" src={profileObj?.image_url2} alt="Photo"/>
    </>
  )

}


export default GetProfilePic
