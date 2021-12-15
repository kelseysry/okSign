import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../../store/profile";
import './UserProfile.css'
import EditUserProfileForm from '../EditUserProfileForm';
import { getProfiles } from '../../store/profile';
import HideCreateProfileForm from '../HideCreateProfileForm';

function UserProfile() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  let profileObj = useSelector((state) => state?.profile[userId])

  const [showEditProfileForm, setShowEditProfileForm] = useState(false)

  const profilesObj = useSelector((state) => state?.profile)
  const profiles = Object?.values(profilesObj)

// attempt
  useEffect(async () => {
    await dispatch(getProfiles());
    // await getCurrentProfile(user_id,profiles)
    if (!isLoaded) setIsLoaded(true);
  },[dispatch, profiles?.length])


// show edit profile form
  useEffect(() => {
    setShowEditProfileForm(false)
  },[dispatch, userId])



// get current user
  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

// get one profile
  useEffect(() => {
    dispatch(getProfile(userId));
  }, [dispatch, userId]);


  if (!user) {
    return null;
  }

  let user_id = userId

  console.log("hello")
  console.log("all profiles", profiles)

  // console.log("all profiles", profiles[0])

  let currentProfile = profiles[1]?.filter((profile) => {
    // console.log("profile", profile)
    // console.log("profile.user_id", profile.user_id)
    return profile?.user_id === +userId
  })

  // const res = Object.keys(foo).filter(i => foo[i] === 'Yes')



  console.log("currentProfile-----------", currentProfile)
  // console.log("user_id userProfile", user_id)
  // console.log("profile.user_id", profile)


  let content = null;
  if(showEditProfileForm && userId) {
    content = (

      <EditUserProfileForm currentProfile={currentProfile} hideForm={() => setShowEditProfileForm(false)}/>
    )
  } else if (isLoaded){
    content = (
      <>
      <div> comment this whole green back in once figure out how to create profile</div>
    <img className= 'user_profile_image' src={currentProfile[0]?.image_url1} alt="Photo"/>
    <div className="user_profile_container">

      <div>
        about me : {profileObj?.about_me}
      </div>
      <div>
        goal : {profileObj?.goal}
      </div>
      <div>
        talent : {profileObj?.talent}
      </div>
      <div>
        my traits : {profileObj?.my_traits}
      </div>
      <div>
        needs : {profileObj?.needs}
      </div>
      <div>
        hobbies : {profileObj?.hobbies}
      </div>
      <div>
        moments : {profileObj?.moments}
      </div>
      <div>
        secrets : {profileObj?.secrets}
      </div>
      <div>
        looking for : {profileObj?.looking_for}
      </div>
      <div>
        user audio : {profileObj?.user_audio}
      </div>

      <section className="Details">
        <h1> Details </h1>
        <div>
          gender : {profileObj?.gender_id}
        </div>
        <div>
          number of likes: {profileObj?.number_likes}
        </div>
        <div>
          orientation : {profileObj?.orientation_id}
        </div>
        <div>
          pronouns: {profileObj?.pronouns}
        </div>
        <div>
          height: {profileObj?.height} cm
        </div>
        <div>
          education: {profileObj?.education}
        </div>
        <div>
          occupation: {profileObj?.occupation}
        </div>
        <div>
          horoscope_id: {profileObj?.horoscope_id}
        </div>
        <div>
          smoking: {profileObj?.smoking? "Smokes" : "Doesn't smoke"}
        </div>
        <div>
          <i class="fas fa-cocktail"></i> {profileObj?.smoking? "Drinks" : "Doesn't drink"}
        </div>
        <div>
          children_id: {profileObj?.children_id}
        </div>
        <div>
          pet_id: {profileObj?.pet_id}
        </div>
        <div>
          politic_id: {profileObj?.politic_id}
        </div>
        <div>
          religion_id: {profileObj?.religion_id}
        </div>
        <div>
          partner_id: {profileObj?.partner_id}
        </div>
      </section>
    </div>

      </>
    )
  } else {
    <div>hello</div>
  }


  return (
    <>
    {content}
    <button className="edit-profile-button" onClick={() => setShowEditProfileForm(true)}>Edit Profile</button>
    {/* <HideCreateProfileForm /> */}

      {/* <ul>
        <li>
          <strong>User Id</strong> {userId}
        </li>
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
      </ul> */}

    </>
  );
}
export default UserProfile;
