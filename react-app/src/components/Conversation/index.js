// responsible for render one conversation

import { useSelector, useDispatch } from "react-redux";
import { GetMatches } from "../../context/MatchesContext";
import React, { useEffect, useState } from 'react';
import { getMessages } from "../../store/message";
import { useParams } from 'react-router-dom';
import { clearMessages } from "../../store/message";


const Conversation = () => {
  const dispatch = useDispatch()
  const { conversationId }  = useParams();
  console.log("conversationId", conversationId)

  const messagesObj = useSelector((state) => state.message)
  const messages = Object.values(messagesObj)

  let conversation_id = +conversationId
  
  useEffect(() => {
    dispatch(clearMessages())
  },[dispatch, conversationId])

  useEffect(() => {
    dispatch(getMessages(conversation_id))
  },[dispatch, messages.length, conversationId, conversation_id])


  console.log("messages", messages)

  messages.map((message) => {console.log(message.content)})




  return (

    <>


    { messages?.map((message) =><div>{message?.content}</div>)}



    </>
  )

}


export default Conversation
