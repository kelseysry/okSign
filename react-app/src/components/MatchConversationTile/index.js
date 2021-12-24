
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import './MatchConversationTile.css';
import { getProfiles } from "../../store/profile";


// profile_id is actually the user.id, so need to grab all the profiles
// and find the one that matches the user_id
const MatchConversationTile = ({profile_id, conversation_id}) => {
  const dispatch = useDispatch()

  const profilesObj = useSelector((state) => state.profile)
  const profiles = Object.values(profilesObj)




  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  useEffect(async () => {
    await dispatch(getProfiles())
    if (!isLoaded) setIsLoaded(true);
  }, [dispatch, profiles.length, isLoaded])





  const getMatchProfile = (profile_id) => {
    const matchProfile = profiles[0]?.filter(function(profile){
      return profile?.user_id === +profile_id
    })
    if(matchProfile) {
      // console.log("match match", matchProfile)
      return matchProfile
    }
    else {
      return null
    }
  }

  const getUserName = (user_id) => {
    const usernameDisplay = users?.filter(function(el){
      return el.id === +user_id
     });

    if (usernameDisplay) {
     return usernameDisplay[0]?.username
    }
    else {
      return null
    }
  }

  let matchProfileObj = (getMatchProfile(profile_id))

  return (
    <>
        { isLoaded && matchProfileObj[0]?.id && (


        <div className="one-conversation-container">
          <div className="one-conversation-header-name">{getUserName(matchProfileObj[0]?.user_id)}</div>
          <img className="match_profile_image_convo" src={matchProfileObj[0]?.image_url1} alt="match_picture"/>
          {/* <div>{messages[messages.length-1].content}</div> */}
        </div>

        )
      }

    </>
  )

}


export default MatchConversationTile
