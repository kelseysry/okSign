// responsible for render one conversation

import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GetProfilePic from "../GetProfilePic";
import DotDotButton from "../DotDotButton";
import EditMessageForm from "../EditMessageForm";
import './Message.css'

const Message = ({message}) => {
  const dispatch = useDispatch()
  const { conversationId }  = useParams();


  const [showEditMessageForm, setShowEditMessageForm] = useState(false)

  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id = sessionUser?.id
  let conversation_id = +conversationId


 // show edit message form
 useEffect(() => {
  setShowEditMessageForm(false)
},[dispatch])

  let messageBubbleColor;
  messageBubbleColor = (
    <>
      {
      message.from_user_id === user_id?
      <section className="grey-container">
        <div className="grey">
          {message?.content}
        </div>
          <GetProfilePic userId={message?.from_user_id}/>
          <DotDotButton messageId={message.id} conversation_id={conversation_id} message={message}  showEditMessageForm={showEditMessageForm} setShowEditMessageForm={setShowEditMessageForm}/>
      </section>
        :
        <section className="blue-container">
          <GetProfilePic userId={message?.from_user_id}/>
          <div className="blue">
            {message?.content}
          </div>
        </section>

      }
    </>
  )

  let editFormColor;
  editFormColor = (
    <>
      {
      message.from_user_id === user_id?
      <section className="grey-container">
        <div className="grey">
          <EditMessageForm message={message} hideForm={() => setShowEditMessageForm(false)}/>
        </div>

      </section>
        :
        <section className="blue-container">
          <div className="blue">
            <EditMessageForm message={message} hideForm={() => setShowEditMessageForm(false)}/>
          </div>
        </section>
      }
    </>

  )


  return (

      <div className="one-message-container">
        {showEditMessageForm? editFormColor : messageBubbleColor }
      </div>

  )

}


export default Message
