import { NavLink } from "react-router-dom";
import MatchProfile from "../MatchProfile";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { GetMatchPercent } from "../../context/CalculatePercent";

// matchProfile is the entire profile obj for one match
const SearchMatchTile = ({matchProfile}) => {

  // const [isLoaded, setIsLoaded] = useState(false)
  const [users, setUsers] = useState([]);
  const [currentUserProfile, setCurrentUserProfile] = useState([]);

  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id = sessionUser?.id

  const {userIdsPercentsObj} = GetMatchPercent()

  console.log("userIdsPercentsObj", userIdsPercentsObj)


  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/profiles/userProfile/${user_id}`);
      const responseData = await response.json();
      console.log("responseData",responseData )
      setCurrentUserProfile(responseData);
    }
    fetchData();
  }, []);

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

  const getPercent = (matchProfileUserId) => {
    const percentMatch = userIdsPercentsObj?.filter(function(percent){
      return percent[0] === matchProfileUserId
     });
    if (percentMatch[0]) {

     return percentMatch[0][1]
    }
    else {
      return null
    }
  }


  return (
    <>
      { matchProfile?.user_id && (
      <>
      <div className="oneMatchProfileContainer">
          <div className="oneMatchProfileContainerHeader">
            {getUserName(matchProfile.user_id)}
            <div className="matchButtonsContainer">
              <button
              className="matchButton"
              // onClick={() => {handleCreateConversation(matchProfile?.user_id)}}
              >Message  <i className="far fa-comment-dots"></i></button>

              <button
              className="matchButton"
              >Like  <i className="fas fa-heart"></i></button>
            </div>

          </div>

          <div className="match_profile_images_container">
            <img className="match_profile_image_discover" src={matchProfile?.image_url1} alt="match_image"/>
            <img className="match_profile_image_discover" src={matchProfile?.image_url2} alt="match_image"/>
            <img className="match_profile_image_discover" src={matchProfile?.image_url3} alt="match_image"/>
          </div>

          <div className="spacer-match">&nbsp;&nbsp;</div>

          <div className="matchPercentContainer">
            <div className="matchContainerHeader">
              You and {getUserName(matchProfile?.user_id)}
            </div>
            <div className="MatchProfileInnerContainer">
              <div className="circlesContainer">
                <div className="userPhotoMatch-first" style={{ backgroundImage: `url('${currentUserProfile?.image_url1}')` }}></div>
                <div className="userPhotoMatch-last" style={{ backgroundImage: `url('${matchProfile?.image_url1}')` }}></div>
                 <div className="matchPercentCircle">{getPercent(matchProfile?.user_id)}0%<div><i className="fas fa-heart"></i>&nbsp;</div></div>
              </div>
              <div className="agreeTable">
                <div className="agree">
                  <div>Agree</div>
                 <div>🥰 {getPercent(matchProfile?.user_id)}</div>
                </div>
                <div className="disagree">
                  <div>Disagree</div>
                  <div>🙃 {10-getPercent(matchProfile?.user_id)}</div>
                </div>
              </div>
            </div>

          </div>

      </div>
      <hr></hr>
      </>

      )
    }


    </>
  )
}

export default SearchMatchTile
