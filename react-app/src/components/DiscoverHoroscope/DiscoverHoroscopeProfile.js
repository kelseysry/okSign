
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
// import { getProfile } from "../../store/profile";
import { createConversation } from "../../store/conversation";
import { useHistory } from 'react-router';
import { getConversations, clearConversation } from "../../store/conversation";
import { getProfiles } from "../../store/profile";
import { getHoroscopeMatchPercent } from "./getHoroScopeMatchPercent";
import { horoscopeContent } from "./getHoroScopeMatchPercent";
import './DiscoverHoroscope.css'
import { NavLink } from "react-router-dom";
import './DiscoverHoroscopeSlide.css'
import pictures from "../../data/pictures";

const DiscoverHoroscopeProfile = ({profile, slide, setSlide, idx, navigateClick, horoscopeMatchesGenderPrefer}) => {
  const dispatch = useDispatch()
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const [horoscopes, setHoroscopes] = useState([])
  const [defaultImg, setDefaultImage] = useState(0);
  const [picNum, setPicNum] = useState('')

  console.log("navigateClick", navigateClick)



  // this profile_id value is actually the user.id, bad naming on my part haha
  let profile_id = profile[0]


  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id_one = sessionUser?.id

  const profilesObj = useSelector((state) => state.profile)
  const profiles = Object.values(profilesObj)

  const conversationsObj = useSelector((state) => state.conversation)
  const conversations = Object.values(conversationsObj)[0]


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


  return (
    <>

{ isLoaded && profile?.user_id && (
      <>
      <section className="MatchProfileContainer">
      {
        idx === navigateClick?
        (
        <>
          <div
            className={`slide`+idx}
            slide={slide}
            onClick={() => setSlide(idx)}
            onAnimationEnd={() => setSlide(0)}>
            <div className="userNameCursive">{getUserName(profile?.user_id)}</div>
            <div className="match_details_discover_under_name"> {profile?.age} | {getHoroscope(profile?.horoscope_id)}</div>
            <div className="horoscope-content-slide">

              {horoscopeContent?.length  > 50 ? `${horoscopeContent.slice(0, 200)}...click to find out more about ${getUserName(profile?.user_id)}!` : horoscopeContent}

            </div>
          </div>
        </>
        ): null
      }

        <div className="oneMatchProfileContainer">

            <section className='ImageContainer'>
                        <NavLink
                to={`/matchProfile/${profile?.user_id}`} // userIdPercentObj[0] is the user.id
              >

                <section>
                    {defaultImg === 0 || picNum === 0 ?
                    <div className='defaultImageHoroscope'><img src={profile?.image_url1} alt='default photo' className='defaultImage'></img></div> :
                    <div className="defaultImage"><img src={defaultImg} alt='default photo after ternary' className='defaultImage'></img></div>
                    }
                </section>

                </NavLink>
                    <div className='IconImagesContainer'>
                        <div key={0}>
                          <img src={profile?.image_url1} alt='photo 1' className="iconImg"
                            onClick={() =>
                              {setDefaultImage(profile?.image_url1);
                              setPicNum(0)
                              }
                            }
                            ></img>

                        </div>
                        <div key={1}>
                          <img src={profile?.image_url2} alt='photo 2' className="iconImg"
                            onClick={() => {
                              setDefaultImage(profile?.image_url2)
                              setPicNum(1)
                            }


                            }

                            ></img>
                        </div>

                        <div key={2}>
                          <img src={profile?.image_url3} alt='photo 3' className="iconImg"
                            onClick={() => {
                              setDefaultImage(profile?.image_url3)
                              setPicNum(2)
                              }}></img>
                        </div>

                        <div key={3}>
                          <img src={profile?.image_url4} alt='photo 4' className="iconImg"
                            onClick={() => {
                              setDefaultImage(profile?.image_url4)
                              setPicNum(3)
                              }}></img>
                        </div>

                        <div key={4}>
                          <img src={profile?.image_url5} alt='photo 5' className="iconImg"
                            onClick={() => {
                              setDefaultImage(profile?.image_url5)
                              setPicNum(4)
                              }}></img>
                        </div>


                        <div key={5}>
                          <img src={profile?.image_url6} alt='photo 6' className="iconImg"
                            onClick={() => {
                              setDefaultImage(profile?.image_url6)
                              setPicNum(5)
                              }}></img>
                        </div>
                    </div>
            </section>


              <div className="MatchProfileInnerContainer_D">
                  {
                    idx === navigateClick?
                    <div
                      className={`slide`+idx}
                      slide={slide}
                      onClick={() => setSlide(idx)}
                      onAnimationEnd={() => setSlide(0)}>

                        <div className="circlesContainer_D">
                          <div className="userPhotoMatch-first_D" style={{ backgroundImage: `url('${userProfileObj[0]?.image_url1}')` }}></div>
                          <div className="userPhotoMatch-last_D" style={{ backgroundImage: `url('${profile?.image_url1}')` }}></div>
                          <div className="matchPercentCircle_D">{getHoroscopeMatchPercent(profile.horoscope_id,userProfileObj[0]?.horoscope_id)}%<div><i className="fas fa-heart"></i>&nbsp;</div></div>
                        </div>

                    </div>
                  : null }
              </div>
         </div>
      </section>
      <div className={idx === horoscopeMatchesGenderPrefer?.length -1? `displayFinalItem` : `displayNothing`}>
          <div className="lastImage">
            <img src={pictures.collection[12].imageUrl} />
          </div>
          <div className="lastImageChat">
            No more matches! Please swipe back! ⬅️
          </div>
      </div>

      </>

      )
    }
    </>

  )

}


export default DiscoverHoroscopeProfile
