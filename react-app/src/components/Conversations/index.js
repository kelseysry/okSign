
import { useSelector, useDispatch } from "react-redux";
import { GetMatches } from "../../context/MatchesContext";
import MatchConversationTile from "../MatchConversationTile";
import { NavLink } from 'react-router-dom';
import { getConversations } from "../../store/conversation";
import React, { useEffect } from 'react';
import NoMatches from "../NoMatches";
import NoConversations from "../NoConversations";



const Conversations = () => {
  const dispatch = useDispatch()
  // matchProfilesIds is actually the user.id
  const {matchedProfileIds} = GetMatches()
  console.log("match profile ids from context", matchedProfileIds)

  const conversationObj = useSelector((state) => state.conversation)
  const conversations = Object.values(conversationObj)



  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id = sessionUser?.id

  // const [users, setUsers] = useState([]);

  useEffect(async ()=>{
    await dispatch(getConversations())
}, [dispatch, conversations.length])




  let conversationsArray = conversations
  // console.log("conversationsArray", conversationsArray[0])


  // FIRST  - get correct user to display from the conversation. You don't want to
  // display the loggin in user
  // profile id we can get from either user_one or user_two
  // create an if conditional that matches the session user
  // if user_id_one == user_id then let profileId = user_id_two and vice versa
  const getMatchProfileId = (conversationId1, conversationId2) => {

    if(user_id === conversationId1){
      return conversationId2
    } else if (user_id === conversationId2) {
      return conversationId1
    }
    else {
      return null
    }
  }

  console.log("conversationArray convo", conversationsArray)

  let previousCurrentUserConversations =  conversationsArray[0]?.filter(function(el) {
    return el.id === +user_id
  })

  console.log("previousCurrentUserConversations", previousCurrentUserConversations)

  let content;
  if(previousCurrentUserConversations?.length) {
    content = (
      conversationsArray[0]?.map((conversation) =>
    <div>

        <NavLink to={`/conversations/${conversation?.id}`}>
          <MatchConversationTile profile_id={getMatchProfileId(conversation.user_id_one, conversation.user_id_two)}/>
        </NavLink>

    </div>
      )
    )
  }  else {
    content = (
      <div className="center-no-matches-component">
        {/* <NoMatches /> */}
        <NoConversations />
      </div>
    )
  }


  return (

    <>
      {content}
    </>
  )

}


export default Conversations
