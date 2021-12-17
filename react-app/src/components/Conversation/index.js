// responsible for render one conversation

import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import { getMessages } from "../../store/message";
import { useParams } from 'react-router-dom';
import { clearMessages } from "../../store/message";
import { getProfiles } from "../../store/profile";
import GetProfilePic from "../GetProfilePic";
import DotDotButton from "../DotDotButton";
import './Conversation.css'
import EditMessageForm from "../EditMessageForm";
import Message from "../Message";
import MessageForm from "../MessageForm";

const Conversation = ({profile_id}) => {
  const dispatch = useDispatch()
  const { conversationId }  = useParams();
  const [users, setUsers] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const messagesObj = useSelector((state) => state.message)
  const messages = Object.values(messagesObj)

  const profilesObj = useSelector((state) => state.profile)
  const profiles = Object.values(profilesObj)
  console.log("profilesObj in conversation",profilesObj)
  // const [showEditMessageForm, setShowEditMessageForm] = useState(false)
  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id = sessionUser?.id

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


  // // show edit message form
  // useEffect(() => {
  //   setShowEditMessageForm(false)
  // },[dispatch])


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

    { messages?.map((message) =>
    <div>
      <Message message={message}/>
    </div>)}

      <MessageForm conversationId={conversationId} />

    </>
  )

}


export default Conversation
