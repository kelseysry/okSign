import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../../store/profile";
import './UserProfile.css'
import EditUserProfileForm from '../EditUserProfileForm';
import EditProfile from '../EditProfile';


function UserProfile() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const dispatch = useDispatch()
  let profileObj = useSelector((state) => state?.profile[userId])


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


  return (
    <>
    {/* <EditUserProfileForm /> */}
    {/* <EditProfile /> */}
    <img className= 'user_profile_image' src={profileObj?.image_url1} alt="Photo"/>
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
        moments !! need to seed this data : {profileObj?.moments}
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
          education: {profileObj?.education}
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

    </div>



    </>
  );
}
export default UserProfile;
