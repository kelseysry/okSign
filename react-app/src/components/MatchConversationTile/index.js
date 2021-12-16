
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import { getProfile } from "../../store/profile";
import './MatchConversationTile.css';
import Conversation from "../Conversation";



const MatchConversationTile = ({profile_id}) => {
  const dispatch = useDispatch()

  let profileObj = useSelector((state) => state?.profile[profile_id])

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);


  // let profile = Object.values(profileObj)


  // get one profile
  useEffect(() => {
    dispatch(getProfile(profile_id));
  }, [dispatch, profile_id]);

  // console.log("profileObj", profileObj)
  // console.log("about me---", profileObj?.about_me)



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
  <Conversation profile_id={profile_id}/>


  return (
    <>

        <div className="each_match_profile_container">
          <div>{getUserName(profileObj?.user_id)}</div>
          <img className="match_profile_image" src={profileObj?.image_url1} alt="Photo"/>

        </div>

    </>
  )

}


export default MatchConversationTile
