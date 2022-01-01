import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { getQuestions } from "../../store/question";
import NoMatches from "../NoMatches";
import DiscoverHoroscopeProfile from "./DiscoverHoroscopeProfile";
import { useDiscoverContent } from "../../context/DiscoverContentContext";

const DiscoverHoroscope = () => {
  // const dispatch = useDispatch()

  const [profiles, setProfiles] = useState([]);
  let [navigateClick, setNavigateClick] = useState(-1)
  const [slide, setSlide] = useState(1)
  const {discoverContent, setDiscoverContent} = useDiscoverContent()


  const sessionUser = useSelector((state) => state?.session);
  const user_id = sessionUser?.user.id
  console.log("🤠🤠🤠🤠user_id", user_id)
  console.log("profiless🤠🤠🤠🤠🤠🤠🤠🤠🤠🤠-------------", profiles)


  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/profiles/');
      const responseData = await response.json();
      setProfiles(responseData.profiles);
    }
    fetchData();
  }, []);

  // will need to do this for brand new users or for users who delete their profile - or else
  // get an error when render Horoscope Match page b/c no horoscope_id exists
  let checkUserHasProfile = profiles.filter(function(profile) {
    return profile.user_id === user_id
  })

  console.log("checkUserHasProfile checkUserHasProfile", checkUserHasProfile)


  let allProfilesExcludeCurrent = profiles.filter(function(profile) {
    return profile.user_id !== user_id
  })


  // console.log("allProfilesExcludeCurrent", allProfilesExcludeCurrent)


  const handleLeftClick = (e) => {
    e.preventDefault();
    const left = document.querySelector('#discoverProfile');
    left.scrollLeft -= 1050;
    setSlide(1)
    if(navigateClick !== -1) {
      setNavigateClick(navigateClick -= 1)
    } else {
      navigateClick = -1
    }

  }
  // add functionality to only see name when click

  const handleRightClick = (e) => {
    e.preventDefault();
    const right = document.querySelector('#discoverProfile');
     right.scrollLeft += 1050;
     setSlide(1)
     if(navigateClick < allProfilesExcludeCurrent?.length -1) {
      setNavigateClick(navigateClick += 1)
     } else {
       return navigateClick
     }

  }



  let content;

  if (profiles?.length && checkUserHasProfile?.length) {
    content = (
<>


<section className="DiscoverContentContainer">

<button
    id="go-back"f
    className="left"
    onClick={handleLeftClick}
    onAnimationEnd={() => setSlide(0)}
    slide={slide}
    >
    <span className="hide-button">⬅️</span>
</button>


  <div className="discover-profiles-container" id="discoverProfile">

   <section className="step-container">
      <div className="Step1">Discover</div>
      <div className="Step2">Users</div>
      <div className="Step3">By</div>
      {/* <div className="Step4">Questions</div> */}
      <button className="Step4" onClick={() => setDiscoverContent('QuestionMatch')}>Questions</button>

      <div className="Step5">Or</div>
      {/* <div className="Step6">Horoscope</div> */}
      <button className="Step6" onClick={()=> setDiscoverContent('HoroscopeMatch')}>Horoscope</button>
    </section>


<div className="discover-profiles-spacer">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
      {allProfilesExcludeCurrent?.map((profile, idx) =>
          <div  className={navigateClick === idx? `one-discover-profile` : `one-discover-profile-o` } key={idx}>
              <DiscoverHoroscopeProfile navigateClick={navigateClick} idx={idx} setSlide={setSlide} slide={slide} profile={profile}/>
          </div>
        )}
   </div>


  <button
  id="next-profile"
  className="right"
      onClick={handleRightClick}
      onAnimationEnd={() => setSlide(0)}
      slide={slide}
  >
    <span className="hide-button">➡️</span>
  </button>
</section>






        {/* {allProfilesExcludeCurrent?.map((profile, idx) =>
          <div key={idx}>
            <NavLink
              to={`/matchProfile/${profile.user_id}`} // userIdPercentObj[0] is the user.id
              >
              <DiscoverHoroscopeProfile profile={profile}/>
            </NavLink>
          </div>
        )} */}

</>

    )
  }     else {
    content = (
      <div className="center-no-matches-component">
        <NoMatches user_id={user_id} />
      </div>
    )
  }


  return (
    <>
      {content}
    </>
  )

}


export default DiscoverHoroscope
