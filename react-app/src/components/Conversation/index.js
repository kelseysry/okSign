// responsible for render one conversation
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import { getMessages } from "../../store/message";
import { useParams } from 'react-router-dom';
import { clearMessages } from "../../store/message";
import { getProfiles } from "../../store/profile";
import './Conversation.css'
import Message from "../Message";
import MessageForm from "../MessageForm";
import { clearProfiles } from "../../store/profile";
import { getConversations } from "../../store/conversation";
import { NavLink } from "react-router-dom";

const Conversation = () => {
  const dispatch = useDispatch()
  const { conversationId }  = useParams();

  const [users, setUsers] = useState([]);

  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id = sessionUser?.id

  // const conversationObj = useSelector((state) => state.conversation)
  // const conversations = Object.values(conversationObj)
  const [conversations, setConversations] = useState([]);


  const messagesObj = useSelector((state) => state.message)
  const messages = Object.values(messagesObj)

  const profilesObj = useSelector((state) => state.profile)
  const profiles = Object.values(profilesObj)

  console.log("conversation in conversation", conversations)

  let conversation_id = +conversationId

  useEffect(() => {
    dispatch(clearMessages())
    dispatch(clearProfiles())
    dispatch(getConversations())
  },[dispatch, conversationId])

  useEffect(() => {
    dispatch(getMessages(conversation_id))
  },[dispatch, messages.length, conversationId, conversation_id])

  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/conversations/');
      const responseData = await response.json();
      setConversations(responseData.conversations);
    }
    fetchData();
  }, []);



  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  console.log("conversations-------------------", conversations)

  let currentConversation =  conversations?.filter(function(conversation) {
    return conversation.id === +conversationId
  })


  const getMatchProfileId = (currentConversation) => {
    if(currentConversation) {

      if(user_id === currentConversation[0]?.user_id_one){
        return currentConversation[0]?.user_id_two
      } else if (user_id === currentConversation[0]?.user_id_two) {
        return currentConversation[0]?.user_id_one
      }
      else {
        return null
      }
    }
  }

  const getMatchUserProfile = (currentConversation) => {
    const matchProfile = profiles[0]?.filter(function(profile){

      return profile?.user_id === +getMatchProfileId(currentConversation)
    })
    if(matchProfile) {
      // console.log("match match", matchProfile)
      return matchProfile
    }
    else {
      return null
    }
  }

  let getMatchImage = getMatchUserProfile(currentConversation)

  const getUserName = (currentConversation) => {
    const usernameDisplay = users?.filter(function(el){
      return el.id === getMatchProfileId(currentConversation)
     });
    //  console.log("tryThis", usernameDisplay[0].username)
    if (usernameDisplay) {
     return usernameDisplay[0]?.username
    }
    else {
      return null
    }
  }

console.log("etMatchImage[0]",getMatchImage)

  return (

    <>
        <section className="profile-user-info">
          <div className="profile-userInfo-inner">
            <div className="profile-userInfo-inner-content">
              <div className="profile-userInfo-thumb">
                <div className="profile-thumb">
                  {getMatchImage ? <img src={getMatchImage[0]?.image_url1} alt="user_image"/> : null }
                </div>
              </div>
                <div className="profile-basics">
                  <div className="profile-basics-username">
                   {currentConversation? <span className="username-text">{getUserName(currentConversation)}</span> : null}
                  </div>
                <div className="profile-asl">
                  <div className="profile-asl-row">
                    <div>
                      {getMatchImage? <span className="profile-asl-age">{getMatchImage[0]?.age}</span> : null}
                      <span className="profile-asl-spacer"></span>
                      {getMatchImage? <span className="profile-asl-location">{getMatchImage[0]?.location}</span> : null}
                    </div>
                    <div>
                      {getMatchImage?

                       <NavLink
                      to={`/matchProfile/${getMatchImage[0]?.user_id}`}
                      >
                        <button className="conversation-profile-button">Go to Profile</button>
                       </NavLink>
                       : null

                      }

                    </div>
                  </div>
                </div>
                </div>
            </div>
          </div>
        </section>

        <section className="messages-outer-container">

          <section className="messages-container">
            <div className="message-header">{getUserName(currentConversation)}</div>

            { messages?.map((message, idx) =>
            <div key={idx}>
              <Message message={message}/>
            </div>
            )}
            <MessageForm conversationId={conversationId} />
          </section>

          {/* <section className="type-message-box">
            <MessageForm conversationId={conversationId} />
          </section> */}
        </section>



    </>
  )

}


export default Conversation
