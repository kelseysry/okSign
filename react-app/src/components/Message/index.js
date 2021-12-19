// responsible for render one conversation

import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GetProfilePic from "../GetProfilePic";
import DotDotButton from "../DotDotButton";
import EditMessageForm from "../EditMessageForm";


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




  return (

    <>

      <div className="one-message-container">
        <div className="content-dot-dot">
          <div className="message-bubble">
            {showEditMessageForm? <EditMessageForm message={message} hideForm={() => setShowEditMessageForm(false)}/> : message?.content}
          </div>
          {message.from_user_id === user_id?
          <DotDotButton messageId={message.id} conversation_id={conversation_id} message={message}  showEditMessageForm={showEditMessageForm} setShowEditMessageForm={setShowEditMessageForm}/>


          :
            null
            }

        </div>
      <GetProfilePic userId={message?.from_user_id}/>

      </div>


    </>
  )

}


export default Message
