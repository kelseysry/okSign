import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
// import { getProfile } from "../../store/profile";
import './UserProfile.css'
import EditUserProfileForm from '../EditUserProfileForm';
import { getProfiles } from '../../store/profile';
import { NavLink } from "react-router-dom";
import { deleteProfile } from '../../store/profile';
import { useHistory } from 'react-router';
import { getHoroscopes } from '../../store/horoscope';
import UserProfileAboutSection from '../UserProfileAboutSection';
import ProfileForm from '../ProfileForm';

function UserProfile({count, setCount}) {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const dispatch = useDispatch()
  const history = useHistory();

  const [isLoaded, setIsLoaded] = useState(false)

  const [showEditProfileForm, setShowEditProfileForm] = useState(false)


  const profilesObj = useSelector((state) => state?.profile)
  const profiles = Object?.values(profilesObj)[0]


  useEffect(async () => {
    // dispatch(clearProfiles())
    await dispatch(getProfiles());
    // await getCurrentProfile(user_id,profiles)
    if (!isLoaded) setIsLoaded(true);
  },[dispatch, profiles?.length, userId, count, isLoaded])


  useEffect(async () => {
    await dispatch(getHoroscopes())
  }, [dispatch])

  // show edit profile form
  useEffect(() => {
    setShowEditProfileForm(false)
  },[dispatch, userId])


  useEffect(async ()  => {
    await dispatch(getProfiles()).then(()=>dispatch(getProfiles()))
  },[dispatch, count])

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

  if (!user) {
    return null;
  }

  console.log("user from api", user.first_name)
  console.log("profile☕️s------------ ", profiles)


  let currentProfile = profiles?.filter((profile) => {
    return profile?.user_id === +userId
  })

  console.log("urrentProfile[0]?.age", currentProfile)

  let content = null;
  if(showEditProfileForm && userId) {
    content = (
      <EditUserProfileForm count={count} setCount={setCount} currentProfile={currentProfile} hideForm={() => setShowEditProfileForm(false)}/>
    )
  } else if (isLoaded){
    content = (
      <>
        <div className="profile-user-info">
          <div className="profile-userInfo-inner">
            <div className="profile-userInfo-inner-content">
              <div className="profile-userInfo-thumb">
                <div className="profile-thumb">
                  {currentProfile ? <img src={currentProfile[0]?.image_url1} alt="user_image"/> : null }
                </div>
              </div>
                <div className="profile-basics">
                  <div className="profile-basics-username">
                    <span className="username-text">{user?.first_name}</span>

                  </div>
                <div className="profile-asl">
                  <div className="profile-asl-row">
                    {currentProfile? <span className="profile-asl-age">{currentProfile[0]?.age}</span> : null}
                    <span className="profile-asl-spacer"></span>
                    {currentProfile? <span className="profile-asl-location">{currentProfile[0]?.location}</span> : null}
                    &nbsp; | &nbsp; 
                    {currentProfile? <span className="profile-asl-location">{currentProfile[0]?.number_likes} <i class="fas fa-heart"></i> </span> : null}
                  </div>
                </div>

                </div>
                <div className="profile-buttons">
                <button className="edit-profile-button" onClick={() => setShowEditProfileForm(true)}>Edit Profile <i className="fas fa-edit"></i></button>
                <button className="delete-profile-button" onClick={() => {handleDeleteProfile(currentProfile[0]?.id)}}>Delete Profile <i className="fas fa-trash"></i></button>

                </div>
            </div>
          </div>
        </div>

        <div className="user_profile_container">
          <UserProfileAboutSection currentUserProfile={currentProfile}/>
        </div>
      </>
    )
  } else {
    return null
  }


  const handleDeleteProfile = (id) => {
    dispatch(deleteProfile(id));
    setCount(count + 1)
   history.push(`/profiles/${userId}`)
 }

  let content_edit_compiled;
  content_edit_compiled = (
    <>
      {content}
    </>
  )


  if(showEditProfileForm && userId) {
    content = (
      <EditUserProfileForm count={count} setCount={setCount} currentProfile={currentProfile} hideForm={() => setShowEditProfileForm(false)}/>
    )
  } else if (isLoaded){
    content = (
      <>

        <div className="profile-user-info">
          <div className="profile-userInfo-inner">
            <div className="profile-userInfo-inner-content">
              <div className="profile-userInfo-thumb">
                <div className="profile-thumb">
                  {currentProfile ? <img src={currentProfile[0]?.image_url1} alt="user_image"/> : null }
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="user_profile_container">
          <UserProfileAboutSection currentUserProfile={currentProfile}/>
        </div>
      </>
    )
  } else {
    return null
  }

  return (
    <>
       {   currentProfile?.length ? content_edit_compiled :
          <>
            <ProfileForm />
          </>
       }
    </>
  );
}
export default UserProfile;
