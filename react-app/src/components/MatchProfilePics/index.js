import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import { getConversations, clearConversation } from "../../store/conversation";
import { createConversation } from "../../store/conversation";
import { getProfiles, updateProfileLikeCount } from "../../store/profile";
import { GetMatches } from "../../context/MatchesContext";
import { useHistory } from 'react-router';

const MatchProfilePics = ({matchProfileObj}) => {
  const dispatch = useDispatch()
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)

  let [number_likes, setNumLikes] = useState('')

  const conversationsObj = useSelector((state) => state.conversation)
  const conversations = Object.values(conversationsObj)[0]

  const profilesObj = useSelector((state) => state.profile)
  const profiles = Object.values(profilesObj)

  const [profileC, setProfileC] = useState([]);
  const [count, setCount] = useState('')
  const [colorLike, setLikeColor] = useState('empty')

  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id_one = sessionUser?.id

    const {userIdsPercentsArr} = GetMatches()
  // console.log("match profile ids from context", userIdsPercentsArr)

  useEffect(async () => {

    await dispatch(getProfiles())
    // await dispatch(getConversations())

    if (!isLoaded) setIsLoaded(true);

  }, [dispatch, profiles.length, isLoaded, conversations?.length, number_likes])



  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/profiles/userProfile/${matchProfileObj[0]?.user_id}`);
      const responseData = await response.json();
      setProfileC(responseData);
    }
    fetchData();
  }, [number_likes, count]);

  // console.log("profilesC,", number_likes)


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
  // let number_likes = matchProfileObj[0]?.number_likes
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

    let newLikes = await setNumLikes(() => {
      return number_likes = matchProfileObj[0]?.number_likes + 1
    })

    // console.log("current number_likes", number_likes)
    console.log("newLikes", newLikes)

      let editProfile  = {
      age, location, lat, lng, about_me, goal, talent, my_traits, needs, hobbies, moments, secrets,looking_for, user_audio, gender_id, gender_preference_id, number_likes, image_url1, image_url2, image_url3, image_url4, image_url5, image_url6, orientation_id, partner_id, pronouns, height, education, occupation, horoscope_id, smoking_id, drinking_id, children_id, pet_id, politic_id, religion_id, user_id
      }

      dispatch(updateProfileLikeCount(editProfile, profile_id))

      setCount(count +1)
  }

  return (
    <>

    { isLoaded && matchProfileObj[0]?.user_id && (
      <>
          <div className="oneMatchProfileContainerHeaderPage">
            {getUserName(matchProfileObj[0]?.user_id)}
            <div className="matchButtonsContainer">
              <button
              className="matchButton"
              onClick={() => {handleCreateConversation(matchProfileObj[0]?.user_id)}}
              >Message  <i className="far fa-comment-dots"></i></button>

              <div className={(colorLike)}>
                <button
                onClick={()=>
               {   setLikeColor(colorLike ==='empty'? 'red':'empty')
                  handleIncreaseProfileLikes()}
                }
                >
                  <span className={colorLike}>

                  <i class="fas fa-heart fa-2x"></i>  {profileC?.number_likes}
                  </span>
                  </button>
              </div>


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
