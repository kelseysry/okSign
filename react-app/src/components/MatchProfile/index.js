
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
// import { getProfile } from "../../store/profile";
import './MatchProfile.css'
import { createConversation } from "../../store/conversation";
import { useHistory } from 'react-router';
import { getConversations } from "../../store/conversation";
import { getProfiles } from "../../store/profile";
// this profile_id value is actually the user.id, bad naming on my part haha
const MatchProfile = ({profile_id}) => {
  const dispatch = useDispatch()
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)

  // console.log("match profile id", +profile_id)

  // let profileObj = useSelector((state) => state?.profile[profile_id])
  // let profile = Object.values(profileObj)

  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id_one = sessionUser?.id

  const profilesObj = useSelector((state) => state.profile)
  const profiles = Object.values(profilesObj)

  const conversationsObj = useSelector((state) => state.conversation)
  const conversations = Object.values(conversationsObj)[0]

  // console.log("match profiles conversations", conversations)
  // console.log("profiles in match profile", profiles[0])


  // get one profile
  // useEffect(() => {
  //   dispatch(getProfile(profile_id));
  // }, [dispatch, profile_id]);

  useEffect(async () => {
    await dispatch(getProfiles())
    if (!isLoaded) setIsLoaded(true);

  }, [dispatch, profiles.length, isLoaded])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);


  useEffect(() => {
    dispatch(getConversations())
  },[dispatch])

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
//  if((convo.user_id_one === discoverUserId && convo.user_id_two === user_id_one ))
//|| (convo.user_id_one === user_id_one && convo.user_id_two === discoverUserId )
// || (convo?.user_id_two === discoverUserId) || (convo?.user_id_two === user_id_one)
  const checkConversationExists = (user_id_one, discoverUserId) => {
    const existingConvo = conversations?.filter(function(convo){
      // console.log("convo one", convo?.user_id_one)
      // console.log("convo two", convo?.user_id_two)
      // console.log("discoverUserId", discoverUserId)
      if(((convo?.user_id_one === discoverUserId) && (convo?.user_id_two === user_id_one)) || ((convo?.user_id_two === discoverUserId) && (convo?.user_id_one === user_id_one))) {
        console.log("convo in if", convo)
        return convo
      } else {
        return null
      }
    })
    console.log("existingconvo", existingConvo)
    return existingConvo
  }

  const getMatchProfile = (profile_id) => {
    const matchProfile = profiles[0]?.filter(function(profile){
      // console.log("profile_id in get match", profile_id)
      // console.log("profile?.user_id in get match", profile?.user_id)
      // console.log("profile?.user_id in get match", profile)
      // console.log(profile?.user_id == profile_id)
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

  console.log("getmatchProfile", getMatchProfile(profile_id))
  let matchProfileObj = (getMatchProfile(profile_id))


  const handleCreateConversation = async (discoverProfileId) => {
    // console.log("discoverProfileId", discoverProfileId)


    let conversationExists =  checkConversationExists(user_id_one, discoverProfileId)
    console.log("conversationexists", conversationExists)

    if(conversationExists[0]?.id) {
      history.push(`/conversations/${conversationExists[0]?.id}`)
    } else {

      let user_id_two = discoverProfileId
      let formData = {user_id_one , user_id_two}

      let newConversation = await dispatch(createConversation(formData))
      // console.log("newConversation handle", newConversation)
      // console.log("newconvo array", Object.values(newConversation))
      let convo = Object.values(newConversation)

      // console.log("convo-----", convo[0].id)


      if(newConversation){
        history.push(`/conversations/${convo[0]?.id}`)
      }

    }


  }


  return (
    <>




    { isLoaded && (

    <div>

      <button
        onClick={() => {handleCreateConversation(matchProfileObj[0]?.user_id)}}
      >Message  <i class="far fa-comment-dots"></i></button>

      <button>Like  <i class="fas fa-heart"></i></button>
      <div>{getUserName(matchProfileObj[0]?.user_id)}</div>
      <img className="match_profile_image" src={matchProfileObj[0]?.image_url1} alt="Photo"/>
      {matchProfileObj[0]?.goal}
    </div> )

  }

  </>

  )

}


export default MatchProfile
