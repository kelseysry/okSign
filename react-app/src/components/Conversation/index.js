// responsible for render one conversation

import { useSelector, useDispatch } from "react-redux";
import { GetMatches } from "../../context/MatchesContext";
import React, { useEffect, useState } from 'react';
import { getMessages } from "../../store/message";
import { useParams } from 'react-router-dom';
import { clearMessages } from "../../store/message";


const Conversation = ({profile_id}) => {
  const dispatch = useDispatch()
  const { conversationId }  = useParams();
  const [users, setUsers] = useState([]);

  const messagesObj = useSelector((state) => state.message)
  const messages = Object.values(messagesObj)


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

  // get one profile
  // useEffect(() => {
  //   dispatch(getProfile(profile_id));
  // }, [dispatch, profile_id]);

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

  console.log("profile_id", profile_id)

  return (

    <>


    { messages?.map((message) =><div>

      {message?.content}
      {message?.from_user_id}
      {getUserName(message?.from_user_id)}

    </div>)}



    </>
  )

}


export default Conversation
