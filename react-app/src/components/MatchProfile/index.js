
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
// import { getProfile } from "../../store/profile";
import './MatchProfile.css'
import { createConversation } from "../../store/conversation";
import { useHistory } from 'react-router';
import { getConversations } from "../../store/conversation";
import { clearProfiles, getProfiles } from "../../store/profile";
const MatchProfile = ({userIdPercentObj}) => {
  const dispatch = useDispatch()
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)

  // this profile_id value is actually the user.id, bad naming on my part haha
  let profile_id = userIdPercentObj[0]
  let matchPercent = ((Number(userIdPercentObj[1])/10)*100)


  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id_one = sessionUser?.id

  const profilesObj = useSelector((state) => state.profile)
  const profiles = Object.values(profilesObj)

  const conversationsObj = useSelector((state) => state.conversation)
  const conversations = Object.values(conversationsObj)[0]


  useEffect(async () => {
    await dispatch(getProfiles())
    await dispatch(getConversations())

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


  // useEffect(() => {
  //   dispatch(getConversations())
  // },[dispatch])

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


  const checkConversationExists = (user_id_one, discoverUserId) => {


    const existingConvo = conversations?.filter(function(convo){
      // console.log("convo one", convo?.user_id_one)
      // console.log("convo two", convo?.user_id_two)
      // console.log("discoverUserId", discoverUserId)
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


  // console.log("getmatchProfile", getMatchProfile(profile_id))
  let matchProfileObj = (getMatchProfile(profile_id))

  let userProfileObj = (getUserProfile(user_id_one))

  console.log("userProfileObh", userProfileObj)


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

    { isLoaded && matchProfileObj[0]?.user_id && (
      <>
      <div className="oneMatchProfileContainer">
          <div className="oneMatchProfileContainerHeader">
            {getUserName(matchProfileObj[0]?.user_id)}
          </div>
          {/* <button
            onClick={() => {handleCreateConversation(matchProfileObj[0]?.user_id)}}
          >Message  <i className="far fa-comment-dots"></i></button>

          <button>Like  <i className="fas fa-heart"></i></button> */}
          <div className="match_profile_images_container">
            <img className="match_profile_image_discover" src={matchProfileObj[0]?.image_url1} alt="match_image"/>
            <img className="match_profile_image_discover" src={matchProfileObj[0]?.image_url2} alt="match_image"/>
            <img className="match_profile_image_discover" src={matchProfileObj[0]?.image_url3} alt="match_image"/>
          </div>

          <div className="matchPercentContainer">
            <div className="matchContainerHeader">
              You and {getUserName(matchProfileObj[0]?.user_id)}
            </div>
            <div className="MatchProfileInnerContainer">
              <div className="circlesContainer">
                <div className="userPhotoMatch-first" style={{ backgroundImage: `url('${userProfileObj[0]?.image_url1}')` }}></div>
                <div className="userPhotoMatch-last" style={{ backgroundImage: `url('${matchProfileObj[0]?.image_url1}')` }}></div>
                <div className="matchPercentCircle">{matchPercent}%</div>
              </div>
              <div className="agreeTable">
                <div className="agree">
                  Agree 🥰
                </div>
                <div className="disagree">
                  Disagree 🙃
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


export default MatchProfile
