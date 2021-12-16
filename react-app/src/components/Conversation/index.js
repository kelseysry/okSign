// responsible for render one conversation

import { useSelector, useDispatch } from "react-redux";
import { GetMatches } from "../../context/MatchesContext";
import MatchConversationTile from "../MatchConversationTile";
import { NavLink } from 'react-router-dom';
import { getConversations } from "../../store/conversation";
import React, { useEffect, useState } from 'react';



const Conversation = () => {
  const dispatch = useDispatch()


  const conversationObj = useSelector((state) => state.conversation)
  const conversations = Object.values(conversationObj)



  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id = sessionUser?.id

  // const [users, setUsers] = useState([]);



  return (

    <>
    <div>"in one conversation</div>

    null

    </>
  )

}


export default Conversation
