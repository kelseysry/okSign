import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import { getConversations, clearConversation } from "../../store/conversation";
import { createConversation } from "../../store/conversation";
import { getProfiles, updateProfileLikeCount, getProfile, editProfile } from "../../store/profile";
import { useHistory } from 'react-router';
import { createLike, EditLike, getProfileUserLiked } from "../../store/like";
import EditUserProfileForm from "../EditUserProfileForm";

const MatchProfilePics = ({matchProfileObj}) => {
  const dispatch = useDispatch()
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)

  const conversationsObj = useSelector((state) => state.conversation)
  const conversations = Object.values(conversationsObj)[0]


  const [profileC, setProfileC] = useState([]);
  const [count, setCount] = useState('')
  const [profileLiked, setProfileLiked] = useState([])


  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id_one = sessionUser?.id

  const profileSel = useSelector((state) => state.like)
  const profileSelArr = Object.values(profileSel)

//  let findProfileSel = profileSelArr?.filter((profile) => {return ((profile?.user_id === user_id_one ) && (profile?.match_profile_id === matchProfileObj[0]?.user_id))})

//  let matchProfile = profileC?.oneProfile
// console.log("profileC",profileC?.oneProfile[0].number_likes)

  // const profileObj = useSelector((state) => state.profile.oneProfile)

  // let profile;
  // if(profileObj) {
  //   profile = (profileObj[0])
  // }

  // let [number_likes, setNumLikes] = useState(profile?.number_likes)
  const [number_likes, setNumLikes] = useState(0)

  console.log("number_likes", number_likes)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/profiles/userProfile/${matchProfileObj[0]?.user_id}`);
      const responseData = await response.json();
      setProfileC(responseData);
    }
    fetchData();
  }, []);


  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/likes/user/${user_id_one}/matchProfile/${matchProfileObj[0]?.id}`);
      const responseData = await response.json();
      setProfileLiked(responseData);
    }
    fetchData();
  }, [count]);

  let match_profile_id = matchProfileObj[0]?.id

  useEffect(() => {
    dispatch(getProfile(matchProfileObj[0]?.user_id))
  }, [dispatch, matchProfileObj[0]?.user_id, count])

  useEffect(() => {
    dispatch(getProfileUserLiked(user_id_one, match_profile_id))
  },[match_profile_id, user_id_one, profileSelArr.length])


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
    if (usernameDisplay) {
     return usernameDisplay[0]?.username
    }
    else {
      return null
    }
  }

  const checkConversationExists = (user_id_one, discoverUserId) => {

    const existingConvo = conversations?.filter(function(convo){

      if(((convo?.user_id_one === discoverUserId) && (convo?.user_id_two === user_id_one)) || ((convo?.user_id_two === discoverUserId) && (convo?.user_id_one === user_id_one))) {
        return convo
      } else {
        return null
      }
    })
    return existingConvo

  }

  const handleCreateConversation = async (discoverProfileId) => {

    let conversationExists =  checkConversationExists(user_id_one, discoverProfileId)
    console.log("conversationexists", conversationExists)

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


  const handleIncreaseProfileLikes = () => {
    let matchProfile = profileC?.oneProfile[0]

      matchProfile.number_likes += 1;
      // setNumLikes(number_likes + 1)
      dispatch(editProfile(matchProfile, matchProfile.id))
  }



  const handleLikeToggle = () => {
    // console.log("????enter handleLikeToggle")
    let user_id = user_id_one

    // console.log("profileLiked.liked????????", profileLiked.liked)
    let liked;
    let match_profile_id;

    // so we should check first if profile has been liked by the current user before
    // if has been liked, profileLiked.liked =="true"
    // then we want to handleDecreaseLike and edit the like to be false
    if(profileLiked?.liked === "true") {
      liked = "false"
      console.log("liked????????  minus", liked)
      match_profile_id = matchProfileObj[0]?.id
      let changeProfileLikeToFalse = {
        liked, user_id, match_profile_id
      }


      dispatch(EditLike(changeProfileLikeToFalse, user_id, match_profile_id))
      setCount(count +1)

    } else if(profileLiked?.liked === "false") {
      liked = "true"
      console.log("????  plus", liked)
      match_profile_id = matchProfileObj[0]?.id
      let changeProfileLikeToTrue = {
        liked, user_id, match_profile_id
      }

      dispatch(EditLike(changeProfileLikeToTrue, user_id, match_profile_id))
      setCount(count +1)
    } else {
      // otherwise we should handleIncreaseLike
      liked = "true"
      console.log("first like????????", liked)
      match_profile_id = matchProfileObj[0]?.id
      let createFirstProfileLike = {
        liked, user_id, match_profile_id
      }
      dispatch(createLike(createFirstProfileLike, user_id, match_profile_id))
      setCount(count +1)
    }

  }

  return (
    <>

    { isLoaded && matchProfileObj && profileC && (
      <>
          <div className="oneMatchProfileContainerHeaderPage">

            {getUserName(matchProfileObj[0]?.user_id)}
              <div className="matchButtonsContainer">
                    <div>
                        <button
                          className="matchButton"
                          onClick={() => {handleCreateConversation(matchProfileObj[0]?.user_id)}}
                          >Message  <i className="far fa-comment-dots"></i>
                        </button>
                    </div>

                      {/* <div className="heart-flex">

                          <button
                          className={(profileLiked?.liked === "true"? " selected" : " blank")}
                          onClick={()=>
                            {
                              // setLikeColor(colorLike ==='empty'? 'red':'empty')
                                handleIncreaseProfileLikes()
                                // handleLikeToggle()
                            }
                          }
                          >
                            <div className="heart-text">
                                <i class="fas fa-heart"></i>
                                {profileC?.oneProfile? profileC?.oneProfile[0]?.number_likes : null}
                            </div>
                          </button>

                      </div> */}


                </div>
            </div>




      <div className="oneMatchProfileContainerPage">
        <div className="pic-container-scroll">
          <div className="match_profile_images_container_user">
            <img className="match_profile_image_discover_page" src={matchProfileObj[0]?.image_url1} alt="match_image"/>
            <img className="match_profile_image_discover_page" src={matchProfileObj[0]?.image_url2} alt="match_image"/>
            <img className="match_profile_image_discover_page" src={matchProfileObj[0]?.image_url3} alt="match_image"/>
            <img className="match_profile_image_discover_page" src={matchProfileObj[0]?.image_url4} alt="match_image"/>
            <img className="match_profile_image_discover_page" src={matchProfileObj[0]?.image_url5} alt="match_image"/>
            <img className="match_profile_image_discover_page" src={matchProfileObj[0]?.image_url6} alt="match_image"/>
          </div>

        </div>
      </div>
      </>

      )
    }

    </>

  )
}

export default MatchProfilePics
