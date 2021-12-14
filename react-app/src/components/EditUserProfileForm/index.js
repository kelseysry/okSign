import { useEffect, useState } from 'react';
// import isURL from 'validator/es/lib/isURL';
import { useDispatch, useSelector } from "react-redux";
import { editProfile, getProfiles } from '../../store/profile'

const EditUserProfileForm = () => {
  const dispatch = useDispatch();
  const profilesObj = useSelector((state) => state.profile)
  const profiles = Object.values(profilesObj)
  // grab all the profiles and filter out the one that has user_id matching with session user
  // have to do this b/c a user can delete their profile so then profile_id is no longer
  // directly correlated with the user.id

  useEffect(() => {
    dispatch(getProfiles());
  },[dispatch])

  // grab the user from state so a user doesn't have the manually input their data into the form
  //  automatically know who's submitting the form
  const sessionUser = useSelector((state) => state.session.user)
  const user_id = sessionUser.id

  console.log("profiles in editUser", profiles)


  // let currentUserQuestion = questions[0]?.filter((question) => {return question.user_id === user_id})
  let currentProfile = profiles[0]?.filter((profile) => {return profile.user_id === user_id})
  console.log("currentProfile in edit", currentProfile)


  return (
    <div> in the edit user profile component </div>
  )
}


export default EditUserProfileForm
