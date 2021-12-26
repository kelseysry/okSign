
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
  const [horoscopes, setHoroscopes] = useState([])

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
      const response = await fetch('/api/horoscopes/');
      const responseData = await response.json();
      setHoroscopes(responseData.horoscopes);
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

  const getHoroscope = (horoscopeId) => {
    const userHoroscope = horoscopes?.filter(function(horoscope){
      return horoscope.id === +horoscopeId
    });
    if(userHoroscope) {
      return userHoroscope[0]?.sign
    }
    else {
      return null
    }
  }

  let userProfileObj = (getUserProfile(user_id_one))


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

  let horoscopeContent;

  const getHoroscopeMatchPercent = (matchHoroscopeId, userHoroscopeId) => {

    // aquarius and cancer match
    if((+userHoroscopeId === 11 && +matchHoroscopeId === 4 )|| (+userHoroscopeId === 4 && +matchHoroscopeId === 11 )) {
      horoscopeContent = " Cancer and Aquarius are not your usual happy couple in most cases. Their relationship can be too stressful for Cancer partner and the lack of intimacy will most probably tear them apart. However, the link between them can actually be wonderful when found, and they could open up such interesting new perspectives for one another if this happens. They both want to learn new things and could travel far if a strong base is made at home, so Cancer can remain peaceful."
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



    // cancer and cancer match
    if((+userHoroscopeId === 4 && +matchHoroscopeId === 4 )|| (+userHoroscopeId === 4 && +matchHoroscopeId === 4 )) {
      return 75
    }

    // cancer and leo match
    if((+userHoroscopeId === 4 && +matchHoroscopeId === 5 )|| (+userHoroscopeId === 5 && +matchHoroscopeId === 4 )) {
      return 70
    }

    // cancer and virgo match
    if((+userHoroscopeId === 4 && +matchHoroscopeId === 6 )|| (+userHoroscopeId === 6 && +matchHoroscopeId === 4 )) {
      return 75
    }

    // cancer and libra match
    if((+userHoroscopeId === 4 && +matchHoroscopeId === 7 )|| (+userHoroscopeId === 7 && +matchHoroscopeId === 4 )) {
      return 60
    }

    // cancer and scorpio match
    if((+userHoroscopeId === 4 && +matchHoroscopeId === 8 )|| (+userHoroscopeId === 8 && +matchHoroscopeId === 4 )) {
      return 95
    }

    // cancer and sagitarrius match
    if((+userHoroscopeId === 4 && +matchHoroscopeId === 9 )|| (+userHoroscopeId === 9 && +matchHoroscopeId === 4 )) {
      return 55
    }

    // cancer and capricorn match
    if((+userHoroscopeId === 4 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 4 )) {
      return 45
    }

    // cancer and aquarius match
    if((+userHoroscopeId === 4 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 4 )) {
      return 70
    }

    // cancer and pisces match
    if((+userHoroscopeId === 4 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 4 )) {
      return 90
    }



    // leo and leo match
    if((+userHoroscopeId === 5 && +matchHoroscopeId === 5 )|| (+userHoroscopeId === 5 && +matchHoroscopeId === 5 )) {
      return 85
    }

    // leo and virgo match
    if((+userHoroscopeId === 5 && +matchHoroscopeId === 6 )|| (+userHoroscopeId === 6 && +matchHoroscopeId === 5 )) {
      return 75
    }

    // leo and libra match
    if((+userHoroscopeId === 5 && +matchHoroscopeId === 7 )|| (+userHoroscopeId === 7 && +matchHoroscopeId === 5 )) {
      return 65
    }

    // leo and scorpio match
    if((+userHoroscopeId === 5 && +matchHoroscopeId === 8 )|| (+userHoroscopeId === 8 && +matchHoroscopeId === 5 )) {
      return 75
    }

    // leo and sagitarrius match
    if((+userHoroscopeId === 5 && +matchHoroscopeId === 9 )|| (+userHoroscopeId === 9 && +matchHoroscopeId === 5 )) {
      return 95
    }

    // leo and capricorn match
    if((+userHoroscopeId === 5 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 5 )) {
      return 45
    }

    // leo and aquarius match
    if((+userHoroscopeId === 5 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 5 )) {
      return 70
    }

    // leo and pisces match
    if((+userHoroscopeId === 5 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 5 )) {
      return 75
    }



    // virgo and virgo match
    if((+userHoroscopeId === 6 && +matchHoroscopeId === 6 )|| (+userHoroscopeId === 6 && +matchHoroscopeId === 6 )) {
      return 70
    }

    // virgo and libra match
    if((+userHoroscopeId === 6 && +matchHoroscopeId === 7 )|| (+userHoroscopeId === 7 && +matchHoroscopeId === 6 )) {
      return 80
    }

    // virgo and scorpio match
    if((+userHoroscopeId === 6 && +matchHoroscopeId === 8 )|| (+userHoroscopeId === 8 && +matchHoroscopeId === 6 )) {
      return 85
    }

    // virgo and sagitarrius match
    if((+userHoroscopeId === 6 && +matchHoroscopeId === 9 )|| (+userHoroscopeId === 9 && +matchHoroscopeId === 6 )) {
      return 70
    }

    // virgo and capricorn match
    if((+userHoroscopeId === 6 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 6 )) {
      return 95
    }

    // virgo and aquarius match
    if((+userHoroscopeId === 6 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 6 )) {
      return 50
    }

    // virgo and pisces match
    if((+userHoroscopeId === 6 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 6 )) {
      return 70
    }



    // libra and libra match
    if((+userHoroscopeId === 7 && +matchHoroscopeId === 7 )|| (+userHoroscopeId === 7 && +matchHoroscopeId === 7 )) {
      return 80
    }

    // libra and scorpio match
    if((+userHoroscopeId === 7 && +matchHoroscopeId === 8 )|| (+userHoroscopeId === 8 && +matchHoroscopeId === 7 )) {
      return 85
    }

    // libra and sagitarrius match
    if((+userHoroscopeId === 7 && +matchHoroscopeId === 9 )|| (+userHoroscopeId === 9 && +matchHoroscopeId === 7 )) {
      return 80
    }

    // libra and capricorn match
    if((+userHoroscopeId === 7 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 7 )) {
      return 85
    }

    // libra and aquarius match
    if((+userHoroscopeId === 7 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 7 )) {
      return 95
    }

    // libra and pisces match
    if((+userHoroscopeId === 7 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 7 )) {
      return 50
    }




    // scorpio and scorpio match
    if((+userHoroscopeId === 8 && +matchHoroscopeId === 8 )|| (+userHoroscopeId === 8 && +matchHoroscopeId === 8 )) {
      return 90
    }

    // scorpio and sagitarrius match
    if((+userHoroscopeId === 8 && +matchHoroscopeId === 9 )|| (+userHoroscopeId === 9 && +matchHoroscopeId === 8 )) {
      return 85
    }

    // scorpio and capricorn match
    if((+userHoroscopeId === 8 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 8 )) {
      return 65
    }

    // scorpio and aquarius match
    if((+userHoroscopeId === 8 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 8 )) {
      return 60
    }

    // scorpio and pisces match
    if((+userHoroscopeId === 8 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 8 )) {
      return 95
    }


    // sagitarrius and sagitarrius match
    if((+userHoroscopeId === 9 && +matchHoroscopeId === 9 )|| (+userHoroscopeId === 9 && +matchHoroscopeId === 9 )) {
      return 85
    }

    // sagitarrius and capricorn match
    if((+userHoroscopeId === 9 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 9 )) {
      return 55
    }

    // sagitarrius and aquarius match
    if((+userHoroscopeId === 9 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 9 )) {
      return 60
    }

    // sagitarrius and pisces match
    if((+userHoroscopeId === 9 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 9 )) {
      return 75
    }


    // capricorn and capricorn match
    if((+userHoroscopeId === 10 && +matchHoroscopeId === 10 )|| (+userHoroscopeId === 10 && +matchHoroscopeId === 10 )) {
      return 85
    }

    // capricorn and aquarius match
    if((+userHoroscopeId === 10 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 10 )) {
      return 70
    }

    // capricorn and pisces match
    if((+userHoroscopeId === 10 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 10 )) {
      return 85
    }

    // aquarius and aquarius match
    if((+userHoroscopeId === 11 && +matchHoroscopeId === 11 )|| (+userHoroscopeId === 11 && +matchHoroscopeId === 11 )) {
      return 80
    }

    // aquarius and pisces match
    if((+userHoroscopeId === 11 && +matchHoroscopeId === 12 )|| (+userHoroscopeId === 12 && +matchHoroscopeId === 11 )) {
      return 55
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
              {getHoroscope(userProfileObj[0].horoscope_id)} and {getHoroscope(profile.horoscope_id)}

            </div>
            <div className="MatchProfileInnerContainer">
              <div className="circlesContainer">
                <div className="userPhotoMatch-first" style={{ backgroundImage: `url('${userProfileObj[0]?.image_url1}')` }}></div>
                <div className="userPhotoMatch-last" style={{ backgroundImage: `url('${profile?.image_url1}')` }}></div>
                <div className="matchPercentCircle">{getHoroscopeMatchPercent(profile.horoscope_id,userProfileObj[0]?.horoscope_id)}%<div><i className="fas fa-heart"></i>&nbsp;</div></div>
              </div>
              <div className="agreeTable">
                  {horoscopeContent}
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
