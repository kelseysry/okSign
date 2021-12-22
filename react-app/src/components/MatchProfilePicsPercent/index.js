import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import { getConversations, clearConversation } from "../../store/conversation";
import { createConversation } from "../../store/conversation";

import { useHistory } from 'react-router';

const MatchProfilePicsPercent = ({matchProfileObj}) => {
  const dispatch = useDispatch()
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)

  const conversationsObj = useSelector((state) => state.conversation)
  const conversations = Object.values(conversationsObj)[0]

  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id_one = sessionUser?.id

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  useEffect(async () => {
    await dispatch(clearConversation())
    await dispatch(getConversations())

    if (!isLoaded) setIsLoaded(true);

  }, [dispatch])



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

  const checkConversationExists = (user_id_one, discoverUserId) => {


    const existingConvo = conversations?.filter(function(convo){
      // console.log("convo one", convo?.user_id_one)
      // console.log("convo two", convo?.user_id_two)
      // console.log("discoverUserId", discoverUserId)
      if(((convo?.user_id_one === discoverUserId) && (convo?.user_id_two === user_id_one)) || ((convo?.user_id_two === discoverUserId) && (convo?.user_id_one === user_id_one))) {
        // console.log("convo in if", convo)
        return convo
      } else {
        return null
      }
    })
    // console.log("existingconvo", existingConvo)
    return existingConvo

  }


  // let userProfileObj = (getUserProfile(user_id_one))

  const handleCreateConversation = async (discoverProfileId) => {
    // console.log("discoverProfileId", discoverProfileId)


    let conversationExists =  checkConversationExists(user_id_one, discoverProfileId)
    // console.log("conversationexists", conversationExists)

    if(conversationExists[0]?.id) {
      history.push(`/conversations/${conversationExists[0]?.id}`)
    } else {

      let user_id_two = discoverProfileId
      let formData = {user_id_one , user_id_two}

      let newConversation = await dispatch(createConversation(formData))

      let convo = Object.values(newConversation)

      if(newConversation){
        history.push(`/conversations/${convo[0]?.id}`)
      }
    }
  }



  return (
    <>

    { isLoaded && matchProfileObj[0]?.user_id && (
      <>
      <div className="oneMatchProfileContainer">
          <div className="oneMatchProfileContainerHeader">
            {getUserName(matchProfileObj[0]?.user_id)}
            <div className="matchButtonsContainer">
              <button
              className="matchButton"
              onClick={() => {handleCreateConversation(matchProfileObj[0]?.user_id)}}
              >Message  <i className="far fa-comment-dots"></i></button>

              <button
              className="matchButton"
              >Like  <i className="fas fa-heart"></i></button>
            </div>

          </div>

          <div className="match_profile_images_container">
            <img className="match_profile_image_discover" src={matchProfileObj[0]?.image_url1} alt="match_image"/>
            <img className="match_profile_image_discover" src={matchProfileObj[0]?.image_url2} alt="match_image"/>
            <img className="match_profile_image_discover" src={matchProfileObj[0]?.image_url3} alt="match_image"/>
          </div>

          <div className="spacer-match">&nbsp;&nbsp;</div>

          <div className="matchPercentContainer">
            <div className="matchContainerHeader">
              You and {getUserName(matchProfileObj[0]?.user_id)}
            </div>
            <div className="MatchProfileInnerContainer">
              <div className="circlesContainer">
                {/* <div className="userPhotoMatch-first" style={{ backgroundImage: `url('${userProfileObj[0]?.image_url1}')` }}></div> */}
                <div className="userPhotoMatch-last" style={{ backgroundImage: `url('${matchProfileObj[0]?.image_url1}')` }}></div>
                {/* <div className="matchPercentCircle">{matchPercent}%<div><i className="fas fa-heart"></i>&nbsp;</div></div> */}
              </div>
              <div className="agreeTable">
                <div className="agree">
                  <div>Agree</div>
                  {/* <div>🥰 {userIdPercentObj[1]}</div> */}
                </div>
                <div className="disagree">
                  <div>Disagree</div>
                  {/* <div>🙃 {disagree}</div> */}
                </div>
              </div>
            </div>

          </div>

      </div>
      <hr></hr>
      </>

      )
    }

    </>

  )
}

export default MatchProfilePicsPercent
