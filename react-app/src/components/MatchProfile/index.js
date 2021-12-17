
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import { getProfile } from "../../store/profile";
import './MatchProfile.css'

const MatchProfile = ({profile_id}) => {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([]);
  console.log("match profile id", +profile_id)

  let profileObj = useSelector((state) => state?.profile[profile_id])
  // let profile = Object.values(profileObj)


  // get one profile
  useEffect(() => {
    dispatch(getProfile(profile_id));
  }, [dispatch, profile_id]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);


  console.log("profileObj", profileObj)
  console.log("about me---", profileObj?.about_me)

  const getUserName = (user_id) => {
    const usernameDisplay = users?.filter(function(el){
      return el.id === user_id
     });
    //  console.log("try", user_id)
    //  console.log("tryThis", usernameDisplay[0].username)
    if (usernameDisplay) {
     return usernameDisplay[0]?.username
    }
    else {
      return null
    }
  }

  return (
    <div>
      <button>Message  <i class="far fa-comment-dots"></i></button>
      <button>Like  <i class="fas fa-heart"></i></button>
      <div>{getUserName(profileObj?.user_id)}</div>
      <img className="match_profile_image" src={profileObj?.image_url1} alt="Photo"/>
      {profileObj?.goal}
    </div>
  )

}


export default MatchProfile
