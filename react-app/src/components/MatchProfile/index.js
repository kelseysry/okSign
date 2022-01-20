
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
// import { getProfile } from "../../store/profile";
import './MatchProfile.css'
import { createConversation } from "../../store/conversation";
import { useHistory } from 'react-router';
import { getConversations, clearConversation } from "../../store/conversation";
import { getProfiles } from "../../store/profile";
import { NavLink } from "react-router-dom";

import './DiscoverPics.css'
const MatchProfile = ({get, correctNumberMatches, userIdPercentObj, slide, setSlide, idx, navigateClick}) => {
  const dispatch = useDispatch()
  const history = useHistory();

  const [defaultImg, setDefaultImage] = useState(0);


  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)

  // this profile_id value is actually the user.id, bad naming on my part haha
  let profile_id = userIdPercentObj[0]
  let matchPercent = ((Number(userIdPercentObj[1])/10)*100)

  let disagree = 10 - (Number(userIdPercentObj[1]))

  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id_one = sessionUser?.id

  const profilesObj = useSelector((state) => state.profile)
  const profiles = Object.values(profilesObj)

  const conversationsObj = useSelector((state) => state.conversation)
  const conversations = Object.values(conversationsObj)[0]


  console.log("ppnavigateClick", navigateClick)

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

  // this is displaying on the front discover page
  return (
    <>

    { isLoaded && matchProfileObj[0]?.user_id  && (

      <section  className={navigateClick === idx? `one-discover-profile` : `one-discover-profile-o` }>

      <>
      <section className="MatchProfileContainer">
      {
        // true ?
        idx === navigateClick || correctNumberMatches === idx?
        (
        <>
          <div
            className={`slide`+idx}
            slide={slide}
            onClick={() => setSlide(idx)}
            onAnimationEnd={() => setSlide(0)}>
            <div className="userNameCursive">{idx}{getUserName(matchProfileObj[0]?.user_id)}</div>
            <div className="match_details_discover_under_name"> {matchProfileObj[0]?.age} | {matchProfileObj[0]?.about_me}</div>
          </div>
        </>
        ): null
      }

        <div className="oneMatchProfileContainer">

            <section  className='ImageContainer'>
                        <NavLink
                to={`/matchProfile/${userIdPercentObj[0]}`} // userIdPercentObj[0] is the user.id
              >
                    <div className='defaultImage'>
                      {defaultImg === 0 ? <img src={matchProfileObj[0]?.image_url1} alt='default photo' className='defaultImage'></img> :  <img src={defaultImg} alt='default photo' className="defaultImage"></img>}
                    </div>
                </NavLink>
                    <div className='IconImagesContainer'>
                        <div>
                          <img src={matchProfileObj[0]?.image_url1} alt='photo 1' className="iconImg"
                            onClick={() => setDefaultImage(matchProfileObj[0]?.image_url1)}></img>
                        </div>
                        <div>
                          <img src={matchProfileObj[0]?.image_url2} alt='photo 2' className="iconImg"
                            onClick={() => setDefaultImage(matchProfileObj[0]?.image_url2)}></img>
                        </div>

                        <div>
                          <img src={matchProfileObj[0]?.image_url3} alt='photo 3' className="iconImg"
                            onClick={() => setDefaultImage(matchProfileObj[0]?.image_url3)}></img>
                        </div>

                        <div>
                          <img src={matchProfileObj[0]?.image_url4} alt='photo 4' className="iconImg"
                            onClick={() => setDefaultImage(matchProfileObj[0]?.image_url4)}></img>
                        </div>

                        <div>
                          <img src={matchProfileObj[0]?.image_url5} alt='photo 5' className="iconImg"
                            onClick={() => setDefaultImage(matchProfileObj[0]?.image_url5)}></img>
                        </div>


                        <div>
                          <img src={matchProfileObj[0]?.image_url6} alt='photo 6' className="iconImg"
                            onClick={() => setDefaultImage(matchProfileObj[0]?.image_url6)}></img>
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
                          <div className="userPhotoMatch-last_D" style={{ backgroundImage: `url('${matchProfileObj[0]?.image_url1}')` }}></div>
                          <div className="matchPercentCircle_D">{matchPercent}%<div><i className="fas fa-heart"></i>&nbsp;</div></div>
                        </div>

                    </div>
                  : null }
              </div>
         </div>
      </section>
      </>



      </section>

      )
    }

    </>

  )

}


export default MatchProfile
