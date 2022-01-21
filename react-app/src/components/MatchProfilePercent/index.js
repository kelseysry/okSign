import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import { getConversations, clearConversation } from "../../store/conversation";
import { getProfiles } from "../../store/profile";
import { GetMatches } from "../../context/MatchesContext";

import { useHistory } from 'react-router';
import MapTwoUsers from "../Maps";
import './MatchProfilePercent.css'

const MatchProfilePercent = ({matchProfileObj}) => {
  const dispatch = useDispatch()
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const [key, setKey] = useState([]);


  const conversationsObj = useSelector((state) => state.conversation)
  const conversations = Object.values(conversationsObj)[0]

  const profilesObj = useSelector((state) => state.profile)
  const profiles = Object.values(profilesObj)

  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id_one = sessionUser?.id

    const {userIdsPercentsArr} = GetMatches()
  // console.log("match profile ids from context", userIdsPercentsArr)


  useEffect(() => {
    async function fetchData() {
      const res = await fetch (`/api/maps/key`)
      const resData = await res.json()
      setKey(resData);
    }
    fetchData();
  },[]);

  useEffect(async () => {
    await dispatch(getProfiles())
    if (!isLoaded) setIsLoaded(true);
  }, [dispatch, profiles.length, isLoaded, conversations?.length])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  useEffect(async () => {
    await dispatch(clearConversation())
    await dispatch(getConversations())

    if (!isLoaded) setIsLoaded(true);

  }, [dispatch])



  const getUserName = (user_id) => {
    const usernameDisplay = users?.filter(function(el){
      return el.id === user_id
     });
    if (usernameDisplay) {
     return usernameDisplay[0]?.username
    }
    else {
      return null
    }
  }

  const getUserProfile = (user_id_one) => {
    const userProfile = profiles[0]?.filter(function(profile){

      return profile?.user_id === +user_id_one
    })
    if(userProfile) {
      return userProfile
    }
    else {
      return null
    }
  }

  let userProfileObj = (getUserProfile(user_id_one))


  const getMatchPercentage = userIdsPercentsArr.filter(function(userIdsPercentArr) { return userIdsPercentArr[0]=== matchProfileObj[0]?.user_id });
  let matchPercentIndexed = getMatchPercentage[0]

  return (
    <>

    { isLoaded && matchProfileObj[0]?.user_id && (
      <>
          <div className="matchPercentContainer">
            <div className="matchContainerHeader">
              Personality Compatibility
              {/* You and {getUserName(matchProfileObj[0]?.user_id)} */}
            </div>
            <div className="MatchProfileInnerContainer">
              <div className="circlesContainer">
                <div className="userPhotoMatch-first" style={{ backgroundImage: `url('${userProfileObj[0]?.image_url1}')` }}></div>
                <div className="userPhotoMatch-last" style={{ backgroundImage: `url('${matchProfileObj[0]?.image_url1}')` }}></div>
                {matchPercentIndexed?  <div className="matchPercentCircle">{((Number(matchPercentIndexed[1])/10)*100)}%<div><i className="fas fa-heart"></i>&nbsp;</div></div> : null}
              </div>
              <div className="agreeTable">
                <div className="agree">
                  <div>Agree</div>
                  {matchPercentIndexed? <div>🥰 {Number(matchPercentIndexed[1])}</div> :null}
                </div>
                <div className="disagree">
                  <div>Disagree</div>
                  {matchPercentIndexed? <div>🙃 {10 - Number(matchPercentIndexed[1])}</div> :null}
                </div>
              </div>
            </div>

          </div>

          <div  className="one-detail-container-map">
          <div className="about-div-header">Meet your date half way?</div>
          <div className="one-detail-content-map">
          {key.k? <MapTwoUsers keyy={key.k} user={userProfileObj} match={matchProfileObj}/> : null }
          </div>
        </div>

      </>

      )
    }

    </>

  )
}

export default MatchProfilePercent
