
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { getProfile } from "../../store/profile";


const MatchProfile = ({profile_id}) => {
  const dispatch = useDispatch()
  console.log("match profile id", +profile_id)

  const profileObj = useSelector((state) => state.profile[profile_id])


// get one profile
  useEffect(() => {
    dispatch(getProfile(profile_id));
  }, [dispatch, profile_id]);


  return (
    null
  )

}


export default MatchProfile
