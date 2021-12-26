
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
// import { getProfile } from "../../store/profile";
import { createConversation } from "../../store/conversation";
import { useHistory } from 'react-router';
import { getConversations, clearConversation } from "../../store/conversation";
import { getProfiles } from "../../store/profile";
import { getHoroscopeMatchPercent } from "./getHoroScopeMatchPercent";
import { horoscopeContent } from "./getHoroScopeMatchPercent";
import './DiscoverHoroscope.css'

const DiscoverHoroscopeProfile = ({profile}) => {
  const dispatch = useDispatch()
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const [horoscopes, setHoroscopes] = useState([])

  // console.log("profile🤠🤠🤠🤠🤠🤠🤠🤠🤠🤠-------------", profile)


  // this profile_id value is actually the user.id, bad naming on my part haha
  let profile_id = profile[0]


  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id_one = sessionUser?.id

  const profilesObj = useSelector((state) => state.profile)
  const profiles = Object.values(profilesObj)

  const conversationsObj = useSelector((state) => state.conversation)
  const conversations = Object.values(conversationsObj)[0]

  // console.log("conversations-------", conversations)

  useEffect(async () => {

    await dispatch(getProfiles())
    // await dispatch(getConversations())

    if (!isLoaded) setIsLoaded(true);

  }, [dispatch, profiles.length, isLoaded, conversations?.length])

  useEffect(async () => {
    await dispatch(clearConversation())
    await dispatch(getConversations())

    if (!isLoaded) setIsLoaded(true);

  }, [dispatch, profiles.length])


  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/horoscopes/');
      const responseData = await response.json();
      setHoroscopes(responseData.horoscopes);
    }
    fetchData();
  }, []);


  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
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


  const checkConversationExists = (user_id_one, discoverUserId) => {


    const existingConvo = conversations?.filter(function(convo){

      if(((convo?.user_id_one === discoverUserId) && (convo?.user_id_two === user_id_one)) || ((convo?.user_id_two === discoverUserId) && (convo?.user_id_one === user_id_one))) {
        // console.log("convo in if", convo)
        return convo
      } else {
        return null
      }
    })
    // console.log("existingconvo", existingConvo)
    return existingConvo

  }

  const getUserProfile = (user_id_one) => {
    const userProfile = profiles[0]?.filter(function(profile){

      return profile?.user_id === +user_id_one
    })
    if(userProfile) {
      // console.log("match match", userProfile)
      return userProfile
    }
    else {
      return null
    }
  }

  const getHoroscope = (horoscopeId) => {
    const userHoroscope = horoscopes?.filter(function(horoscope){
      return horoscope.id === +horoscopeId
    });
    if(userHoroscope) {
      return userHoroscope[0]?.sign
    }
    else {
      return null
    }
  }

  let userProfileObj = (getUserProfile(user_id_one))


  const handleCreateConversation = async (discoverProfileId) => {
    // console.log("discoverProfileId", discoverProfileId)


    let conversationExists =  checkConversationExists(user_id_one, discoverProfileId)
    // console.log("conversationexists", conversationExists)

    if(conversationExists[0]?.id) {
      history.push(`/conversations/${conversationExists[0]?.id}`)
    } else {

      let user_id_two = discoverProfileId
      let formData = {user_id_one , user_id_two}

      let newConversation = await dispatch(createConversation(formData))

      let convo = Object.values(newConversation)

      if(newConversation){
        history.push(`/conversations/${convo[0]?.id}`)
      }
    }
  }


  return (
    <>

    { isLoaded && (
      <>
      <div className="oneMatchProfileContainer">
          <div className="oneMatchProfileContainerHeader">
            {getUserName(profile?.user_id)}
            <div className="matchButtonsContainer">
              <button
              className="matchButton"
              onClick={() => {handleCreateConversation(profile?.user_id)}}
              >Message  <i className="far fa-comment-dots"></i></button>

              <button
              className="matchButton"
              >Like  <i className="fas fa-heart"></i></button>
            </div>

          </div>

          <div className="match_profile_images_container">
            <img className="match_profile_image_discover" src={profile?.image_url1} alt="match_image"/>
            <img className="match_profile_image_discover" src={profile?.image_url2} alt="match_image"/>
            <img className="match_profile_image_discover_noP" src={profile?.image_url3} alt="match_image"/>
          </div>

          <div className="spacer-match">&nbsp;&nbsp;</div>

          <div className="matchPercentContainer">
            <div className="matchContainerHeader">
              {getHoroscope(userProfileObj[0].horoscope_id)} and {getHoroscope(profile.horoscope_id)}

            </div>
            <div className="MatchProfileInnerContainer_Horoscope">
              <div className="circlesContainer_H">
                <div className="userPhotoMatch-first" style={{ backgroundImage: `url('${userProfileObj[0]?.image_url1}')` }}></div>
                <div className="userPhotoMatch-last" style={{ backgroundImage: `url('${profile?.image_url1}')` }}></div>
                <div className="matchPercentCircle">{getHoroscopeMatchPercent(profile.horoscope_id,userProfileObj[0]?.horoscope_id)}%<div><i className="fas fa-heart"></i>&nbsp;</div></div>
              </div>
              <div className="horoscopeContent">
                  {horoscopeContent}
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


export default DiscoverHoroscopeProfile
