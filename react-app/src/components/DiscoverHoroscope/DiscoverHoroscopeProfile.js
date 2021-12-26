
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
// import { getProfile } from "../../store/profile";
import { createConversation } from "../../store/conversation";
import { useHistory } from 'react-router';
import { getConversations, clearConversation } from "../../store/conversation";
import { getProfiles } from "../../store/profile";


const DiscoverHoroscopeProfile = ({profile}) => {
  const dispatch = useDispatch()
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)

  // console.log("profile🤠🤠🤠🤠🤠🤠🤠🤠🤠🤠-------------", profile)


  // this profile_id value is actually the user.id, bad naming on my part haha
  let profile_id = profile[0]


  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id_one = sessionUser?.id

  const profilesObj = useSelector((state) => state.profile)
  const profiles = Object.values(profilesObj)

  const conversationsObj = useSelector((state) => state.conversation)
  const conversations = Object.values(conversationsObj)[0]

  // console.log("conversations-------", conversations)

  useEffect(async () => {

    await dispatch(getProfiles())
    // await dispatch(getConversations())

    if (!isLoaded) setIsLoaded(true);

  }, [dispatch, profiles.length, isLoaded, conversations?.length])

  useEffect(async () => {
    await dispatch(clearConversation())
    await dispatch(getConversations())

    if (!isLoaded) setIsLoaded(true);

  }, [dispatch, profiles.length])


  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);


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

  const getMatchProfile = (profile_id) => {
    const matchProfile = profiles[0]?.filter(function(profile){

      return profile?.user_id === +profile_id
    })
    if(matchProfile) {
      // console.log("match match", matchProfile)
      return matchProfile
    }
    else {
      return null
    }
  }


  const getUserProfile = (user_id_one) => {
    const userProfile = profiles[0]?.filter(function(profile){

      return profile?.user_id === +user_id_one
    })
    if(userProfile) {
      // console.log("match match", userProfile)
      return userProfile
    }
    else {
      return null
    }
  }


  // console.log("getmatchProfile", getMatchProfile(profile_id))
  let matchProfileObj = (getMatchProfile(profile_id))

  let userProfileObj = (getUserProfile(user_id_one))

  // console.log("userProfileObh", userProfileObj)


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

  /*
  Horoscopes id # in db

  1 Aries
  2 Taurus
  3 Gemini
  4 Cancer
  5 Leo
  6 Virgo
  7 Libra
  8 Scorpio
  9 Sagittarius
  10 Capricorn
  11 Aquarius
  12 Pisces

  */

  // console.log("userProfileObj[0].horoscope", userProfileObj[0].horoscope_id)

  const getHoroscopeMatchPercent = (matchHoroscopeId, userHoroscopeId) => {

    // aquarius and cancer match
    if((+userHoroscopeId === 11 && +matchHoroscopeId === 4 )|| (+userHoroscopeId === 4 && +matchHoroscopeId === 11 )) {
      return 70
    }

    // aries and aries match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 1 )|| (+userHoroscopeId === 1 && +matchHoroscopeId === 1 )) {
      return 60
    }

    // aries and taurus match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 2 )|| (+userHoroscopeId === 2 && +matchHoroscopeId === 1 )) {
      return 60
    }

    // aries and gemini match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 3 )|| (+userHoroscopeId === 3 && +matchHoroscopeId === 1 )) {
      return 70
    }

    // aries and cancer match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 4 )|| (+userHoroscopeId === 4 && +matchHoroscopeId === 1 )) {
      return 65
    }

    // aries and leo match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 5 )|| (+userHoroscopeId === 5 && +matchHoroscopeId === 1 )) {
      return 90
    }

    // aries and virgo match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 6 )|| (+userHoroscopeId === 6 && +matchHoroscopeId === 1 )) {
      return 45
    }

    // aries and libra match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 7 )|| (+userHoroscopeId === 7 && +matchHoroscopeId === 1 )) {
      return 70
    }

    // aries and scorpio match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 8 )|| (+userHoroscopeId === 8 && +matchHoroscopeId === 1 )) {
      return 80
    }

    // aries and sagitarrius match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 9 )|| (+userHoroscopeId === 9 && +matchHoroscopeId === 1 )) {
      return 90
    }

    // aries and capricorn match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 1 )) {
      return 50
    }

    // aries and aquarius match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 1 )) {
      return 55
    }

    // aries and pisces match
    if((+userHoroscopeId === 1 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 1 )) {
      return 65
    }




    // Taurus and Taurus match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 2 )|| (+userHoroscopeId === 2 && +matchHoroscopeId === 2 )) {
      return 70
    }
    // Taurus and gemini match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 3 )|| (+userHoroscopeId === 3 && +matchHoroscopeId === 2 )) {
      return 70
    }

    // Taurus and cancer match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 4 )|| (+userHoroscopeId === 4 && +matchHoroscopeId === 2 )) {
      return 80
    }

    // Taurus and leo match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 5 )|| (+userHoroscopeId === 5 && +matchHoroscopeId === 2 )) {
      return 70
    }

    // Taurus and virgo match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 6 )|| (+userHoroscopeId === 6 && +matchHoroscopeId === 2 )) {
      return 90
    }

    // taurus and libra match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 7 )|| (+userHoroscopeId === 7 && +matchHoroscopeId === 2 )) {
      return 75
    }

    // taurus and scorpio match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 8 )|| (+userHoroscopeId === 8 && +matchHoroscopeId === 2 )) {
      return 85
    }

    // taurus and sagitarrius match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 9 )|| (+userHoroscopeId === 9 && +matchHoroscopeId === 2 )) {
      return 50
    }

    // taurus and capricorn match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 2 )) {
      return 95
    }

    // taurus and aquarius match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 2 )) {
      return 80
    }

    // taurus and pisces match
    if((+userHoroscopeId === 2 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 2 )) {
      return 85
    }



    // gemini and gemini match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 3 )|| (+userHoroscopeId === 3 && +matchHoroscopeId === 3 )) {
      return 75
    }

    // gemini and cancer match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 4 )|| (+userHoroscopeId === 4 && +matchHoroscopeId === 3 )) {
      return 60
    }

    // gemini and leo match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 5 )|| (+userHoroscopeId === 5 && +matchHoroscopeId === 3 )) {
      return 80
    }

    // gemini and virgo match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 6 )|| (+userHoroscopeId === 6 && +matchHoroscopeId === 3 )) {
      return 75
    }

    // gemini and libra match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 7 )|| (+userHoroscopeId === 7 && +matchHoroscopeId === 3 )) {
      return 90
    }

    // gemini and scorpio match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 8 )|| (+userHoroscopeId === 8 && +matchHoroscopeId === 3 )) {
      return 60
    }

    // gemini and sagitarrius match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 9 )|| (+userHoroscopeId === 9 && +matchHoroscopeId === 3 )) {
      return 76
    }

    // gemini and capricorn match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 3 )) {
      return 50
    }

    // gemini and aquarius match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 3 )) {
      return 90
    }

    // gemini and pisces match
    if((+userHoroscopeId === 3 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 3 )) {
      return 50
    }





  }



  return (
    <>

    { isLoaded && (
      <>
      <div className="oneMatchProfileContainer">
          <div className="oneMatchProfileContainerHeader">
            {getUserName(profile?.user_id)}
            <div className="matchButtonsContainer">
              <button
              className="matchButton"
              onClick={() => {handleCreateConversation(profile?.user_id)}}
              >Message  <i className="far fa-comment-dots"></i></button>

              <button
              className="matchButton"
              >Like  <i className="fas fa-heart"></i></button>
            </div>

          </div>

          <div className="match_profile_images_container">
            <img className="match_profile_image_discover" src={profile?.image_url1} alt="match_image"/>
            <img className="match_profile_image_discover" src={profile?.image_url2} alt="match_image"/>
            <img className="match_profile_image_discover_noP" src={profile?.image_url3} alt="match_image"/>
          </div>

          <div className="spacer-match">&nbsp;&nbsp;</div>

          <div className="matchPercentContainer">
            <div className="matchContainerHeader">
              You and {getUserName(profile?.user_id)}
            </div>
            <div className="MatchProfileInnerContainer">
              <div className="circlesContainer">
                <div className="userPhotoMatch-first" style={{ backgroundImage: `url('${userProfileObj[0]?.image_url1}')` }}></div>
                <div className="userPhotoMatch-last" style={{ backgroundImage: `url('${profile?.image_url1}')` }}></div>
                <div className="matchPercentCircle">{getHoroscopeMatchPercent(profile.horoscope_id,userProfileObj[0]?.horoscope_id)}%<div><i className="fas fa-heart"></i>&nbsp;</div></div>
              </div>
              <div className="agreeTable">
                <div className="agree">
                  <div>Agree</div>
                  {/* <div>🥰 {profile[1]}</div> */}
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


export default DiscoverHoroscopeProfile
