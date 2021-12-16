// responsible for render one conversation

import { useSelector, useDispatch } from "react-redux";
import { GetMatches } from "../../context/MatchesContext";
import React, { useEffect, useState } from 'react';
import { getMessages } from "../../store/message";
import { useParams } from 'react-router-dom';
import { clearMessages } from "../../store/message";
import { getProfiles } from "../../store/profile";
import GetProfilePic from "../GetProfilePic";


const Conversation = ({profile_id}) => {
  const dispatch = useDispatch()
  const { conversationId }  = useParams();
  const [users, setUsers] = useState([]);

  const messagesObj = useSelector((state) => state.message)
  const messages = Object.values(messagesObj)

  const profilesObj = useSelector((state) => state.profile)
  const profiles = Object.values(profilesObj)
  console.log("profilesObj in conversation",profilesObj)


  let conversation_id = +conversationId

  useEffect(() => {
    dispatch(clearMessages())
  },[dispatch, conversationId])

  useEffect(() => {
    dispatch(getMessages(conversation_id))
  },[dispatch, messages.length, conversationId, conversation_id])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);


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

  const getUser = (user_id) => {
    const user = users?.filter(function(el){
      return el.id === user_id
     });
    //  console.log("try", user_id)
    if (user) {
     return user
    }
    else {
      return null
    }
  }


  const getProfilePic = (user_id_from_getUser) => {
    const profilePic = profiles?.filter(function(el, idx) {

      // console.log("el.user_id", el[idx])
      // console.log("user_id_from_getUser", user_id_from_getUser[0]?.id)
      return el[idx].user_id === user_id_from_getUser[0]?.id
    });
    if (profilePic) {
      console.log("profilePic", profilePic)
      return profilePic
     }
     else {
       return null
     }
  }

  console.log("profile_id", profile_id)

  return (

    <>


    { messages?.map((message) =><div>

      {message?.content}
      {message?.from_user_id}
      {getUserName(message?.from_user_id)}
      <GetProfilePic userId={message?.from_user_id}/>



    </div>)}



    </>
  )

}


export default Conversation
