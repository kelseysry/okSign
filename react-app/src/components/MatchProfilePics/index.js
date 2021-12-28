import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import { getConversations, clearConversation } from "../../store/conversation";
import { createConversation } from "../../store/conversation";
import { getProfiles, updateProfileLikeCount, getProfile } from "../../store/profile";
import { GetMatches } from "../../context/MatchesContext";
import { useHistory } from 'react-router';
import { createLike, EditLike, getProfileUserLiked } from "../../store/like";

const MatchProfilePics = ({matchProfileObj}) => {
  const dispatch = useDispatch()
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoadedAgain, setIsLoadedAgain] = useState(false)


  const conversationsObj = useSelector((state) => state.conversation)
  const conversations = Object.values(conversationsObj)[0]



  const [profileC, setProfileC] = useState([]);
  const [count, setCount] = useState('')
  // const [colorLike, setLikeColor] = useState('empty')
  const [profileLiked, setProfileLiked] = useState([])


  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id_one = sessionUser?.id

  const profileSel = useSelector((state) => state.like)
  const profileSelArr = Object.values(profileSel)
  // console.log("🚩profileSel", profileSel)


  const profileObj = useSelector((state) => state.profile.oneProfile)


  // const profile = Object.values(profileObj[0])

  // console.log("🚩profileObj", profileObj[0])
  let profile;
  if(profileObj) {
    profile = (profileObj[0])
  }
  let [number_likes, setNumLikes] = useState('')

  // console.log("🍎🍎n🍎🍎nprofile?.number_likes", profile?.number_likes)
  // console.log("🍎🍎number_likes", number_likes)

  // console.log("🤡🤡🤡profileObj[0]?.number_likes", profileObj[0]?.number_likes)

    const {userIdsPercentsArr} = GetMatches()
  // console.log("match profile ids from context", userIdsPercentsArr)

  // useEffect(async () => {
  //   await dispatch(getProfiles())
  //   if (!isLoaded) setIsLoaded(true);
  // }, [dispatch, profiles.length, isLoaded, conversations?.length, number_likes])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/profiles/userProfile/${matchProfileObj[0]?.user_id}`);
      const responseData = await response.json();
      setProfileC(responseData);
    }
    fetchData();
  }, [count]);

  console.log("profileLiked", profileLiked)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/likes/user/${user_id_one}/matchProfile/${matchProfileObj[0]?.id}`);
      const responseData = await response.json();
      setProfileLiked(responseData);
    }
    fetchData();
  }, [count]);

  let match_profile_id = matchProfileObj[0]?.id

  useEffect(async () => {
    await dispatch(getProfile(matchProfileObj[0]?.user_id))

    if (!isLoadedAgain) setIsLoadedAgain(true);
  }, [dispatch, matchProfileObj[0]?.user_id, count, number_likes])

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
    // console.log("existingconvo", existingConvo)
    return existingConvo

  }

  const handleCreateConversation = async (discoverProfileId) => {
    // console.log("discoverProfileId", discoverProfileId)


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

  let age = matchProfileObj[0]?.age;
  let location = matchProfileObj[0]?.location;
  let lat = matchProfileObj[0]?.lat;
  let lng = matchProfileObj[0]?.lng;
  let about_me = matchProfileObj[0]?.about_me
  let goal = matchProfileObj[0]?.goal
  let talent = matchProfileObj[0]?.talent
  let my_traits = matchProfileObj[0]?.my_traits
  let needs =matchProfileObj[0]?.needs
  let hobbies = matchProfileObj[0]?.hobbies
  let moments = matchProfileObj[0]?.moments
  let secrets = matchProfileObj[0]?.secrets
  let looking_for = matchProfileObj[0]?.looking_for
  let user_audio = matchProfileObj[0]?.user_audio
  let gender_id = matchProfileObj[0]?.gender_id
  let gender_preference_id = matchProfileObj[0]?.gender_preference_id
  let image_url1 = matchProfileObj[0]?.image_url1
  let image_url2 = matchProfileObj[0]?.image_url2
  let image_url3 = matchProfileObj[0]?.image_url3
  let image_url4 = matchProfileObj[0]?.image_url4
  let image_url5 = matchProfileObj[0]?.image_url5
  let image_url6 = matchProfileObj[0]?.image_url6
  let orientation_id = matchProfileObj[0]?.orientation_id
  let partner_id = matchProfileObj[0]?.partner_id
  let pronouns = matchProfileObj[0]?.pronouns
  let height = matchProfileObj[0]?.height
  let education = matchProfileObj[0]?.education
  let occupation = matchProfileObj[0]?.occupation
  let horoscope_id = matchProfileObj[0]?.horoscope_id
  let smoking_id = matchProfileObj[0]?.smoking_id
  let drinking_id = matchProfileObj[0]?.drinking_id
  let children_id = matchProfileObj[0]?.children_id
  let pet_id = matchProfileObj[0]?.pet_id
  let politic_id = matchProfileObj[0]?.politic_id
  let religion_id = matchProfileObj[0]?.religion_id
  let user_id = matchProfileObj[0]?.user_id
  let profile_id = matchProfileObj[0]?.id



  const handleIncreaseProfileLikes = async() => {
    // e.preventDefault();
    // await setNumLikes(() => {
    //   return number_likes + 1
    // })
    
    setNumLikes(() => {
      return number_likes + 1
    })

    console.log("🍎🍎number_likes increase?", number_likes)

      let editProfile  = {
      age, location, lat, lng, about_me, goal, talent, my_traits, needs, hobbies, moments, secrets,looking_for, user_audio, gender_id, gender_preference_id, number_likes, image_url1, image_url2, image_url3, image_url4, image_url5, image_url6, orientation_id, partner_id, pronouns, height, education, occupation, horoscope_id, smoking_id, drinking_id, children_id, pet_id, politic_id, religion_id, user_id
      }

      console.log("🍎🍎editProfile for increase🍎🍎", editProfile)

      dispatch(updateProfileLikeCount(editProfile, profile_id))

      // setNumLikes(() => {
      //     return number_likes = profileObj[0]?.number_likes + 1
      //   })
  }

  const handleDecreaseProfileLikes = async () => {
    // e.preventDefault();

    // await setNumLikes(() => {
    //   return number_likes - 1
    // })

      setNumLikes(() => {
        return number_likes - 1
      })

      console.log("🍎🍎number_likes decrease?", number_likes)


      let editProfile  = {
      age, location, lat, lng, about_me, goal, talent, my_traits, needs, hobbies, moments, secrets,looking_for, user_audio, gender_id, gender_preference_id, number_likes, image_url1, image_url2, image_url3, image_url4, image_url5, image_url6, orientation_id, partner_id, pronouns, height, education, occupation, horoscope_id, smoking_id, drinking_id, children_id, pet_id, politic_id, religion_id, user_id
      }
      console.log("🍎🍎editProfile for decrease🍎🍎", editProfile)


        dispatch(updateProfileLikeCount(editProfile, profile_id))


  }


  const handleLikeToggle = () => {
    // console.log("🤡enter handleLikeToggle")
    let user_id = user_id_one

    // console.log("profileLiked.liked🤡🤡", profileLiked.liked)
    let liked;
    let match_profile_id;


    // so we should check first if profile has been liked by the current user before
    // if has been liked, profileLiked.liked =="true"
    // then we want to handleDecreaseLike and edit the like to be false
    if(profileSel[1]?.liked === "true") {
      liked = "false"
      console.log("liked🤡🤡  minus", liked)
      match_profile_id = matchProfileObj[0]?.id
      let changeProfileLikeToFalse = {
        liked, user_id, match_profile_id
      }
      // console.log("🤡 🤡 🤡  changeProfileLikeToFalse", changeProfileLikeToFalse)
      handleDecreaseProfileLikes();

      dispatch(EditLike(changeProfileLikeToFalse, user_id, match_profile_id))

    } else if(profileSel[1]?.liked === "false") {
      liked = "true"
      console.log("😂  plus", liked)
      match_profile_id = matchProfileObj[0]?.id
      let changeProfileLikeToTrue = {
        liked, user_id, match_profile_id
      }

      handleIncreaseProfileLikes();

      dispatch(EditLike(changeProfileLikeToTrue, user_id, match_profile_id))

    } else {
      // otherwise we should handleIncreaseLike
      liked = "true"
      console.log("liked🤡🤡  first", liked)
      match_profile_id = matchProfileObj[0]?.id
      let createFirstProfileLike = {
        liked, user_id, match_profile_id
      }
      handleIncreaseProfileLikes()
      dispatch(createLike(createFirstProfileLike, user_id, match_profile_id))

    }

  }
  console.log("profileLiked", profileLiked)


  return (
    <>

    { isLoaded && matchProfileObj[0]?.user_id && profileSel[1]?.liked && profileObj[0]?.number_likes && isLoadedAgain && (
      <>
          <div className="oneMatchProfileContainerHeaderPage">
            {getUserName(matchProfileObj[0]?.user_id)}
              <div className="matchButtonsContainer">
                    <div>
                        <button
                          className="matchButton"
                          onClick={() => {handleCreateConversation(matchProfileObj[0]?.user_id)}}
                          >Message  <i className="far fa-comment-dots fa-2x"></i>
                        </button>
                    </div>





                        {/* <div className={()}> */}
                            <button
                            className={(profileSel[1].liked === "true"? " selected" : " blank")}
                            onClick={()=>
                              {
                                // setLikeColor(colorLike ==='empty'? 'red':'empty')
                                  // handleIncreaseProfileLikes()
                                  handleLikeToggle()
                              }
                            }
                            >
                              <span className="heart-text">
                                  <i class="fas fa-heart"></i>
                                  {profile?.number_likes}
                                  <div>{profileSel[1]?.liked }</div>
                              </span>
                            </button>
                        {/* </div> */}


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
