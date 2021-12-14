
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { getProfile } from "../../store/profile";


const MatchProfile = ({profile_id}) => {
  const dispatch = useDispatch()
  console.log("match profile id", +profile_id)

  let profileObj = useSelector((state) => state?.profile[profile_id])
  // let profile = Object.values(profileObj)


  // get one profile
  useEffect(() => {
    dispatch(getProfile(profile_id));
  }, [dispatch, profile_id]);

  console.log("profileObj", profileObj)
  console.log("about me---", profileObj?.about_me)

  return (
    <div>
      {profileObj?.goal}
    </div>
  )

}


export default MatchProfile
