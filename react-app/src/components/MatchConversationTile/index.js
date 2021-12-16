
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import { getProfile } from "../../store/profile";
import './MatchConversationTile.css';

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


  return (
    <>

        <div className="each_match_profile_container">
          <img className="match_profile_image" src={profileObj?.image_url1} alt="Photo"/>
          <div>{getUserName(profileObj?.user_id)}</div>



        </div>

    </>
  )

}


export default MatchConversationTile
