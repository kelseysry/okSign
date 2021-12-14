import { useEffect, useState } from 'react';
// import isURL from 'validator/es/lib/isURL';
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from '../../store/profile'

const EditUserProfile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile)

  // grab all the profiles and filter out the one that has user_id matching with session user
  // have to do this b/c a user can delete their profile so then profile_id is no longer
  // directly correlated with the user.id



  // grab the user from state so a user doesn't have the manually input their data into the form
  //  automatically know who's submitting the form
  const sessionUser = useSelector((state) => state.session.user)
  const user_id = sessionUser.id

  return (
    <div> in the edit user profile component </div>
  )
}


export default EditUserProfile
