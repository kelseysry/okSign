
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import { getProfile } from "../../store/profile";
import './MatchProfile.css'
import { createConversation } from "../../store/conversation";
import ConversationForm from "../ConversationForm";
import { useHistory } from 'react-router';

const MatchProfile = ({profile_id}) => {
  const dispatch = useDispatch()
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [createConversationButton, setCreateConversationButton] = useState(false)
  // console.log("match profile id", +profile_id)

  let profileObj = useSelector((state) => state?.profile[profile_id])
  // let profile = Object.values(profileObj)

  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id_one = sessionUser?.id

  // get one profile
  useEffect(() => {
    dispatch(getProfile(profile_id));
  }, [dispatch, profile_id]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);


  // console.log("profileObj", profileObj)
  // console.log("about me---", profileObj?.about_me)

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

  const handleCreateConversation = async (discoverProfileId) => {
    console.log("discoverProfileId", discoverProfileId)
    let user_id_two = discoverProfileId
    let formData = {user_id_one , user_id_two}

    let newConversation = await dispatch(createConversation(formData))
    // console.log("newConversation handle", newConversation)
    // console.log("newconvo array", Object.values(newConversation))
    let convo = Object.values(newConversation)

    // console.log("convo-----", convo[0].id)

    // console.log("newConversation handle id", newConversation?.id)

    if(newConversation){
      history.push(`/conversations/${convo[0]?.id}`)
    }

    // setCreateConversationButton(true);
  }

  return (
    <div>
      <button
        onClick={() => {handleCreateConversation(profileObj?.user_id)}}
      >Message  <i class="far fa-comment-dots"></i></button>

      {/* <ConversationForm createConversationButton={createConversationButton} user_id_two={profileObj?.user_id}/> */}

      <button>Like  <i class="fas fa-heart"></i></button>
      <div>{getUserName(profileObj?.user_id)}</div>
      <img className="match_profile_image" src={profileObj?.image_url1} alt="Photo"/>
      {profileObj?.goal}
    </div>
  )

}


export default MatchProfile
