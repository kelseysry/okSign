
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import './MatchConversationTile.css';
import { getProfiles } from "../../store/profile";


// profile_id is actually the user.id, so need to grab all the profiles
// and find the one that matches the user_id
const MatchConversationTile = ({profile_id}) => {
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
      return profile?.user_id == profile_id
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

  console.log("getmatchProfile", getMatchProfile(profile_id))
  let matchProfileObj = (getMatchProfile(profile_id))

  return (
    <>
        { isLoaded && matchProfileObj[0]?.id && (


        <div className="each_match_profile_container">
          <div>{getUserName(matchProfileObj[0]?.user_id)}</div>
          <img className="match_profile_image" src={matchProfileObj[0]?.image_url1} alt="match_picture"/>
        </div>

        )
      }

    </>
  )

}


export default MatchConversationTile
