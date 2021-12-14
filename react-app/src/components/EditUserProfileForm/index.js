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

  // console.log("profiles in editUser", profiles)
  let currentProfile = profiles[0]?.filter((profile) => {return profile.user_id === user_id})
  // console.log("currentProfile in edit", currentProfile)

  const [age, setAge] = useState(currentProfile?.age);
  const [location, setLocation] = useState(currentProfile?.location);
  const [lat, setlat] = useState(currentProfile?.lat);
  const [lng, setlng] = useState(currentProfile?.lng);
  const [about_me, setabout_me] = useState(currentProfile?.about_me);
  const [goal, setgoal] = useState(currentProfile?.goal);
  const [talent, settalent] = useState(currentProfile?.talent);
  const [my_traits, setmy_traits] = useState(currentProfile?.my_traits);
  const [needs, setneeds] = useState(currentProfile?.needs);
  const [hobbies, sethobbies] = useState(currentProfile?.hobbies);
  const [moments, setmoments] = useState(currentProfile?.moments);
  const [secrets, setsecrets] = useState(currentProfile?.secrets);
  const [looking_for, setlooking_for] = useState(currentProfile?.looking_for);
  const [user_audio, setuser_audio] = useState(currentProfile?.user_audio);
  const [gender_id, setgender_id] = useState(currentProfile?.gender_id);
  const [number_likes, setnumber_likes] = useState(currentProfile?.number_likes);
  const [image_url1, setimage_url1] = useState(currentProfile?.image_url1);
  const [image_url2, setimage_url2] = useState(currentProfile?.image_url2);
  const [image_url3, setimage_url3] = useState(currentProfile?.image_url3);
  const [image_url4, setimage_url4] = useState(currentProfile?.image_url4);
  const [image_url5, setimage_url5] = useState(currentProfile?.image_url5);
  const [image_url6, setimage_url6] = useState(currentProfile?.image_url6);
  const [orientation_id, setorientation_id] = useState(currentProfile?.orientation_id);
  const [partner_id, setpartner_id] = useState(currentProfile?.partner_id);
  const [pronouns, setAge] = useState(currentProfile?.pronouns);
  const [height, setheight] = useState(currentProfile?.height);
  const [education, seteducation] = useState(currentProfile?.education);
  const [occupation, setoccupation] = useState(currentProfile?.occupation);
  const [horoscope_id, sethoroscope_id] = useState(currentProfile?.horoscope_id);
  const [smoking, setsmoking] = useState(currentProfile?.smoking);
  const [drinking, setdrinking] = useState(currentProfile?.drinking);
  const [children_id, setchildren_id] = useState(currentProfile?.children_id);
  const [pet_id, setpet_id] = useState(currentProfile?.pet_id);
  const [politic_id, setpolitic_id] = useState(currentProfile?.politic_id);
  const [religion_id, setreligion_id] = useState(currentProfile?.religion_id);
  const [errors, setErrors] = useState([]);

  return (
    <div> in the edit user profile component </div>
  )
}


export default EditUserProfileForm
