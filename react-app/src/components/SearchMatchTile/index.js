import { NavLink } from "react-router-dom";
import MatchProfile from "../MatchProfile";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { GetMatchPercent } from "../../context/CalculatePercent";
import pictures from "../../data/pictures";

// matchProfile is the entire profile obj for one match
const SearchMatchTile = ({searchUserResults, profile, slide, setSlide, idx, navigateClick}) => {

  // const [isLoaded, setIsLoaded] = useState(false)
  const [users, setUsers] = useState([]);
  const [currentUserProfile, setCurrentUserProfile] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const [defaultImg, setDefaultImage] = useState(0);


  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id = sessionUser?.id

  const {userIdsPercentsObj} = GetMatchPercent()

  console.log("profile-----------", profile.age)

  // console.log("currentUserProfile", currentUserProfile.oneProfile[0])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/profiles/userProfile/${user_id}`);
      const responseData = await response.json();
      console.log("responseData",responseData )
      setCurrentUserProfile(responseData);
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

  const getPercent = (matchProfileUserId) => {
    const percentMatch = userIdsPercentsObj?.filter(function(percent){

      return percent[0] === matchProfileUserId
     });
    if (percentMatch[0]) {
      console.log("percentMatch[0]", percentMatch[0][1])

     return percentMatch[0]
    }
    else {
      return null
    }
  }
  let percent = getPercent(profile?.user_id)
  // console.log("percent--------------", percent)


  return (
    <>

    {profile?.user_id && (
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
            <NavLink
                to={`/matchProfile/${profile?.user_id}`} // userIdPercentObj[0] is the user.id
              >
            <div className="userNameCursive">{getUserName(profile?.user_id)}</div>
            <div className="match_details_discover_under_name_Age"> {profile?.age} | {profile?.occupation}</div>
            <div className="match_details_discover_under_name"> {profile?.about_me}</div>
            </NavLink>

          </div>
        </>
        ): null
      }

        <div className="oneMatchProfileContainer">

            <section className='ImageContainer'>
              <NavLink
                to={`/matchProfile/${profile?.user_id}`}
              >
                    <div className='defaultImage'>
                      {defaultImg === 0 ? <img src={profile?.image_url1} alt='default photo' className='defaultImage'></img> :  <img src={defaultImg} alt='default photo' className="defaultImage"></img>}
                    </div>
                </NavLink>
                    <div className='IconImagesContainer'>
                        <div>
                          <img src={profile?.image_url1} alt='photo 1' className="iconImg"
                            onClick={() => setDefaultImage(profile?.image_url1)}></img>
                        </div>
                        <div>
                          <img src={profile?.image_url2} alt='photo 2' className="iconImg"
                            onClick={() => setDefaultImage(profile?.image_url2)}></img>
                        </div>

                        <div>
                          <img src={profile?.image_url3} alt='photo 3' className="iconImg"
                            onClick={() => setDefaultImage(profile?.image_url3)}></img>
                        </div>

                        <div>
                          <img src={profile?.image_url4} alt='photo 4' className="iconImg"
                            onClick={() => setDefaultImage(profile?.image_url4)}></img>
                        </div>

                        <div>
                          <img src={profile?.image_url5} alt='photo 5' className="iconImg"
                            onClick={() => setDefaultImage(profile?.image_url5)}></img>
                        </div>


                        <div>
                          <img src={profile?.image_url6} alt='photo 6' className="iconImg"
                            onClick={() => setDefaultImage(profile?.image_url6)}></img>
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
                          { currentUserProfile.oneProfile?  <div className="userPhotoMatch-first_D" style={{ backgroundImage: `url('${currentUserProfile.oneProfile[0]?.image_url1}')` }}></div> : null}
                          <div className="userPhotoMatch-last_D" style={{ backgroundImage: `url('${profile?.image_url1}')` }}></div>
                          <div className="matchPercentCircle_D">{percent? percent[1] : null}0%<div><i className="fas fa-heart"></i>&nbsp;</div></div>
                        </div>

                    </div>
                  : null }
              </div>
         </div>
      </section>

      <div className={idx === searchUserResults?.length -1 ? `displayFinalItem` : `displayNothing`}>
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

export default SearchMatchTile
