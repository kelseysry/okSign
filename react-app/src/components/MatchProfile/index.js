
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import { getProfile } from "../../store/profile";
import './MatchProfile.css'
import { createConversation } from "../../store/conversation";
import { useHistory } from 'react-router';
import { getConversations } from "../../store/conversation";

const MatchProfile = ({profile_id}) => {
  const dispatch = useDispatch()
  const history = useHistory();

  const [users, setUsers] = useState([]);
  // console.log("match profile id", +profile_id)

  let profileObj = useSelector((state) => state?.profile[profile_id])
  // let profile = Object.values(profileObj)

  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id_one = sessionUser?.id

  const conversationsObj = useSelector((state) => state.conversation)
  const conversations = Object.values(conversationsObj)[0]

  console.log("match profiles conversations", conversations)

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

      // console.log("newConversation handle id", newConversation?.id)

      if(newConversation){
        history.push(`/conversations/${convo[0]?.id}`)
      }

    }


  }

  return (
    <div>
      <button
        onClick={() => {handleCreateConversation(profileObj?.user_id)}}
      >Message  <i class="far fa-comment-dots"></i></button>


      <button>Like  <i class="fas fa-heart"></i></button>
      <div>{getUserName(profileObj?.user_id)}</div>
      <img className="match_profile_image" src={profileObj?.image_url1} alt="Photo"/>
      {profileObj?.goal}
    </div>
  )

}


export default MatchProfile
