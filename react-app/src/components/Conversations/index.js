
import { useSelector, useDispatch } from "react-redux";
import MatchConversationTile from "../MatchConversationTile";
import { NavLink } from 'react-router-dom';
import { getConversations } from "../../store/conversation";
import React, { useEffect, useState } from 'react';
import NoConversations from "../NoConversations";
import './Conversations.css'
import AllUsersMap from "../Maps/AllUsersMap";
import { getMatchProfiles } from "../../store/match";
import pictures from "../../data/pictures";

const Conversations = () => {
  const dispatch = useDispatch()

  const [key, setKey] = useState([]);

  const [currentUserProfile, setCurrentUserProfile] = useState();

  const [isLoaded, setIsLoaded] = useState(false)

  const conversationObj = useSelector((state) => state.conversation)
  const conversations = Object.values(conversationObj)

  const matchUserIdsObj = useSelector((state) => state.match.user)
  let matchUserIdsArr;
  if(matchUserIdsObj) {
    matchUserIdsArr = Object.values(matchUserIdsObj)
  }

  // console.log("matchUserIdsObj--------------", matchUserIdsObj)
  // console.log("matchUserIdsArr--------------", matchUserIdsArr)


  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id = sessionUser?.id


  // const [users, setUsers] = useState([]);


  useEffect(() => {
    setIsLoaded(true)
    async function fetchData() {
      const response = await fetch(`/api/profiles/userProfile/${user_id}`);
      const responseData = await response.json();
      console.log("responseData",responseData )
      setCurrentUserProfile(responseData);
    }
    fetchData();
  }, [isLoaded]);



  useEffect(async ()=>{
    // await dispatch(clearProfiles)
    await dispatch(getConversations())

    await dispatch(getMatchProfiles(matchUserIds))

}, [dispatch, conversations.length])

    useEffect(() => {
      async function fetchData() {
        const res = await fetch (`/api/maps/key`)
        const resData = await res.json()
        setKey(resData);
      }
      fetchData();
    },[]);

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

  // gets the user Ids that are matched
  let matchUserIds = [];
  // console.log("conversationsArray", conversationsArray[0])

  const getMatchUserIds = async() => {
  conversationsArray[0]?.map((conversation) => {
    if(getMatchProfileId(conversation.user_id_one, conversation.user_id_two)) {
      let matchProfileUserId = getMatchProfileId(conversation.user_id_one, conversation.user_id_two)
    matchUserIds.push(matchProfileUserId)
    }
  })
  }

  // console.log("conversationsArray", conversationsArray)

  getMatchUserIds()

  let previousCurrentUserConversations =  conversationsArray[0]?.filter(function(el) {
    // console.log("el.id",el.id)
    return (el.user_id_one === +user_id) || (el.user_id_two === +user_id)
  })

  console.log("previousCurrentUserConversations", previousCurrentUserConversations)
  // console.log("matchUserIdsArr matchUserIdsArr", matchUserIdsArr)

  let mapRender;
  mapRender = (
    <div>
      {key.k? <AllUsersMap keyy={key.k} matchUsersProfileArr={matchUserIdsArr}/> : null }
    </div>
  )

console.log("currentUserProfile?.oneProfile",currentUserProfile?.oneProfile?.length)



let loading;


loading = (

  <div className="loading">
    <img src={pictures.collection[11].imageUrl} />
  </div>
)

if(isLoaded === true && currentUserProfile?.oneProfile?.length === 0) {
            loading = (
            <NoConversations />
            )
}



  let content;
  if(previousCurrentUserConversations?.length && currentUserProfile?.oneProfile?.length) {
    content = (
      <>
        <div className="ConversationHeaderContainer">
          <div className="ConversationHeader">Your Conversations</div>
        </div>
        <section className="ConversationsBody">
          <section className="conversations-container">
            {conversationsArray[0]?.map((conversation) =>
                  <NavLink to={`/conversations/${conversation?.id}`}>
                    <MatchConversationTile conversation_id={conversation?.id} profile_id={getMatchProfileId(conversation.user_id_one, conversation.user_id_two)}/>
                  </NavLink>
            )}
          </section>

          {matchUserIdsArr?


        <div className="one-conversation-container">
          <div className="one-map-header-name">Click On a Marker To See Where Your Matches Are! &nbsp; <i class="fas fa-map-marker-alt"></i></div>
                {mapRender}
          </div>

          : null }
          </section>
      </>


    )
  }  else {
    content = (
      // <div className="">
      //   <NoConversations />
      // </div>
      loading
    )
  }


  return (

    <>
      {content}
    </>
  )

}


export default Conversations
