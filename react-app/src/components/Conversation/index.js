// responsible for render one conversation

import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from 'react';
import { getMessages } from "../../store/message";
import { useParams } from 'react-router-dom';
import { clearMessages } from "../../store/message";
import { getProfiles } from "../../store/profile";
// import GetProfilePic from "../GetProfilePic";
// import DotDotButton from "../DotDotButton";
import './Conversation.css'
// import EditMessageForm from "../EditMessageForm";
import Message from "../Message";
import MessageForm from "../MessageForm";
import { clearProfiles } from "../../store/profile";

const Conversation = ({profile_id}) => {
  const dispatch = useDispatch()
  const { conversationId }  = useParams();
  // const [users, setUsers] = useState([]);

  const messagesObj = useSelector((state) => state.message)
  const messages = Object.values(messagesObj)


  let conversation_id = +conversationId

  useEffect(() => {
    dispatch(clearMessages())
    dispatch(clearProfiles())
  },[dispatch, conversationId])

  useEffect(() => {
    dispatch(getMessages(conversation_id))
  },[dispatch, messages.length, conversationId, conversation_id])



  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);



  return (

    <>

    { messages?.map((message, idx) =>
    <div key={idx}>
      <Message message={message}/>
    </div>)}

      <MessageForm conversationId={conversationId} />

    </>
  )

}


export default Conversation
