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

function UserProfile({count, setCount}) {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const dispatch = useDispatch()
  const history = useHistory();

  const [isLoaded, setIsLoaded] = useState(false)
  // let profileObj = useSelector((state) => state?.profile[userId])

  const [showEditProfileForm, setShowEditProfileForm] = useState(false)

  const profilesObj = useSelector((state) => state?.profile)
  const profiles = Object?.values(profilesObj)[0]
  // const [count, setCount] = useState(0)

  //   useEffect(() => {
  //        dispatch(clearProfiles())
  // },[dispatch])



// original code -> rewritten below to prevent race conditions
  useEffect(async () => {
    // dispatch(clearProfiles())
    await dispatch(getProfiles());
    // await getCurrentProfile(user_id,profiles)
    if (!isLoaded) setIsLoaded(true);
  },[dispatch, profiles?.length, userId, count, isLoaded])

  // prevent race conditions

  // useEffect(() => {
  //   async function fetchData() {

  //     await dispatch(getProfiles());
  //     if (!isLoaded) setIsLoaded(true);

  //   }
  //   fetchData();
  // }, [dispatch, profiles?.length, userId, count, isLoaded]);



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

// // get one profile
//   useEffect(() => {
//     dispatch(getProfile(userId));
//   }, [dispatch, userId]);


  if (!user) {
    return null;
  }

  // let user_id = userId

  // console.log("hello")
    // console.log("all profiles", profiles)


  // console.log("profiles being filtered", profiles)

  let currentProfile = profiles?.filter((profile) => {
    // console.log("profile", profile)
    // console.log("profile.user_id", profile.user_id)
    return profile?.user_id === +userId
  })

  // const res = Object.keys(foo).filter(i => foo[i] === 'Yes')



  // console.log("currentProfile-----------", currentProfile)
  // console.log("user_id userProfile", user_id)
  // console.log("profile.user_id", profile)


  let content = null;
  if(showEditProfileForm && userId) {
    content = (

      <EditUserProfileForm count={count} setCount={setCount} currentProfile={currentProfile} hideForm={() => setShowEditProfileForm(false)}/>
    )
  } else if (isLoaded){
    content = (
      <>
      {/* <div> comment this whole green back in once figure out how to create profile</div> */}
    <img className= 'user_profile_image' src={currentProfile[0]?.image_url1} alt="Photo"/>
    <div className="user_profile_container">

      <div>
        about me : {currentProfile[0]?.about_me}
      </div>
      <div>
        goal : {currentProfile[0]?.goal}
      </div>
      <div>
        talent : {currentProfile[0]?.talent}
      </div>
      <div>
        my traits : {currentProfile[0]?.my_traits}
      </div>
      <div>
        needs : {currentProfile[0]?.needs}
      </div>
      <div>
        hobbies : {currentProfile[0]?.hobbies}
      </div>
      <div>
        moments : {currentProfile[0]?.moments}
      </div>
      <div>
        secrets : {currentProfile[0]?.secrets}
      </div>
      <div>
        looking for : {currentProfile[0]?.looking_for}
      </div>
      <div>
        user audio : {currentProfile[0]?.user_audio}
      </div>

      <section className="Details">
        <h1> Details </h1>
        <div>
          gender : {currentProfile[0]?.gender_id}
        </div>
        <div>
          number of likes: {currentProfile[0]?.number_likes}
        </div>
        <div>
          orientation : {currentProfile[0]?.orientation_id}
        </div>
        <div>
          pronouns: {currentProfile[0]?.pronouns}
        </div>
        <div>
          height: {currentProfile[0]?.height} cm
        </div>
        <div>
          education: {currentProfile[0]?.education}
        </div>
        <div>
          occupation: {currentProfile[0]?.occupation}
        </div>
        <div>
          horoscope_id: {currentProfile[0]?.horoscope_id}
        </div>
        <div>
          smoking_id: {currentProfile[0]?.smoking_id}
        </div>
        <div>
          drinking_id: {currentProfile[0]?.drinking_id}
        </div>

        {/* <div>
          smoking: {currentProfile[0]?.smoking? "Smokes" : "Doesn't smoke"}
        </div> */}
        {/* <div>
          <i className="fas fa-cocktail"></i> {currentProfile[0]?.smoking? "Drinks" : "Doesn't drink"}
        </div> */}
        <div>
          children_id: {currentProfile[0]?.children_id}
        </div>
        <div>
          pet_id: {currentProfile[0]?.pet_id}
        </div>
        <div>
          politic_id: {currentProfile[0]?.politic_id}
        </div>
        <div>
          religion_id: {currentProfile[0]?.religion_id}
        </div>
        <div>
          partner_id: {currentProfile[0]?.partner_id}
        </div>
      </section>
    </div>

      </>
    )
  } else {
    <div>hello</div>
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
   <button className="edit-profile-button" onClick={() => setShowEditProfileForm(true)}>Edit Profile <i className="fas fa-edit"></i></button>
   {/* <button className="edit-profile-button" onClick={() => setShowEditProfileForm(true)}>Delete Profile <i className="fas fa-edit"></i></button> */}
   <button className="" onClick={() => {handleDeleteProfile(currentProfile[0]?.id)}}>Delete Profile <i className="fas fa-trash"></i></button>

    </>
  )


  return (
    <>
    {/* {content} */}
    {/* <button className="edit-profile-button" onClick={() => setShowEditProfileForm(true)}>Edit Profile <i className="fas fa-edit"></i></button> */}


  { isLoaded && (currentProfile[0]?.id? content_edit_compiled :
    ( <div>
        <NavLink to={`/createProfile`}><div className=""></div>Create Profile <i className="fas fa-address-card"></i></NavLink>
      </div>))
  }


    </>
  );
}
export default UserProfile;
