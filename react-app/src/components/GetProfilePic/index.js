
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect} from 'react';
import { getProfile } from "../../store/profile";

const GetProfilePic = ({userId}) => {
  const dispatch = useDispatch()

  let profileObj = useSelector((state) => state?.profile[userId])

  // get one profile
    useEffect(() => {
      dispatch(getProfile(userId));
    }, [dispatch, userId]);

  // console.log("profileObj-------------", profileObj)

  return (
    <>
      <img className="match_profile_image" src={profileObj?.image_url2} alt="Photo"/>
    </>
  )
}

export default GetProfilePic
