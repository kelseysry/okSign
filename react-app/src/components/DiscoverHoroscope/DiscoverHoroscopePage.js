import { useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import NoMatches from "../NoMatches";
import DiscoverHoroscopeProfile from "./DiscoverHoroscopeProfile";
import { useDiscoverContent } from "../../context/DiscoverContentContext";
import pictures from "../../data/pictures";
import horoscopePics from "../../data/horoscopePics";
import {SwipeInstructionModal } from "../../context/Modal";

const DiscoverHoroscope = () => {

  const [profiles, setProfiles] = useState([]);
  let [navigateClick, setNavigateClick] = useState(-1)
  const [slide, setSlide] = useState(1)
  const {discoverContent, setDiscoverContent} = useDiscoverContent()
  const [currentUserProfile, setCurrentUserProfile] = useState();
  const sessionUser = useSelector((state) => state?.session);
  const user_id = sessionUser?.user.id

  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/profiles/');
      const responseData = await response.json();
      setProfiles(responseData.profiles);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/profiles/userProfile/${user_id}`);
      const responseData = await response.json();
      setCurrentUserProfile(responseData);
    }
    fetchData();
  }, []);

  // will need to do this for brand new users or for users who delete their profile - or else
  // get an error when render Horoscope Match page b/c no horoscope_id exists
  let checkUserHasProfile = profiles.filter(function(profile) {
    return profile.user_id === user_id
  })

  let allProfilesExcludeCurrent = profiles.filter(function(profile) {
    return profile.user_id !== user_id
  })


  let currentUserGenderPreference = currentUserProfile?.oneProfile[0]?.gender_preference_id

  let horoscopeMatchesGenderPrefer = allProfilesExcludeCurrent.filter((matchProfile) => matchProfile?.gender_id  === currentUserGenderPreference)

  const handleLeftClick = (e) => {
    e.preventDefault();
    const left = document.querySelector('#discoverProfile');
    left.scrollLeft -= 650;
    setSlide(1)
    if(navigateClick !== -1) {
      setNavigateClick(navigateClick -= 1)
    } else {
      navigateClick = -1
    }

  }

  const handleRightClick = (e) => {
    e.preventDefault();
    const right = document.querySelector('#discoverProfile');
     right.scrollLeft += 650;
     setSlide(1)
     if(navigateClick < horoscopeMatchesGenderPrefer?.length -1) {
      setNavigateClick(navigateClick += 1)
     } else {
       return navigateClick
     }
  }


  const handleRightClickAfterModal = () => {
    // e.preventDefault();
    const right = document.querySelector('#discoverProfile');
     right.scrollLeft += 650;
     setSlide(1)
     if(navigateClick < horoscopeMatchesGenderPrefer?.length -1) {
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
          id="go-back"
          className={slide === 1? `noLeft` : `left` }
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
            <button id={discoverContent === 'HoroscopeMatch' ? 'whiteFont' : 'orangeFont'} className="Step4" onClick={() => setDiscoverContent('QuestionMatch')}>Questions</button>
            <div className={discoverContent === 'HoroscopeMatch' ? 'DiscoverStepClick1' : 'hideClickMe' }
            onClick={() => setDiscoverContent('QuestionMatch')}
            >Click Me</div>


            <div className="Step5">Or</div>
            <button id={discoverContent === 'HoroscopeMatch' ? 'orangeFont' : 'whiteFont'} className="Step6" onClick={()=> setDiscoverContent('HoroscopeMatch')}>Horoscope</button>
            <div className={discoverContent === 'HoroscopeMatch' ? 'hideClickMe' : 'DiscoverStepClick2' }
            >Click Me</div>
            <button className="img-stairs-horoscope"
              // onClick={handleRightClick}
              onClick={() => {
                setShowModal(true)}

              }
            >
              <img src={horoscopePics.collection[(currentUserProfile?.oneProfile[0]?.horoscope_id)-1]?.imageUrl} />
              </button>
            {showModal && (
              <SwipeInstructionModal onClose={() => {
                setShowModal(false)
                handleRightClickAfterModal()
              }}>

                <section className="InstructionsContainer">
                  <div className="instructionsHeader">Instructions</div>
                  <div className="instructionsContent">Click on the center picture to see a user's profile</div>
                  <div className="instructionsImgContainer">
                  <div className="leftSwipe"><span className="instructionsEmoji">🧐</span> Click to the left of the center picture to see the previous user</div>
                  <div className="rightSwipe"><span className="instructionsEmoji">🥱</span> Click to the right of the center picture to see the next user</div>

                    <img class="instructionsImg" src={pictures.collection[13].imageUrl} />
                  </div>

                </section>
              </SwipeInstructionModal>
            )}
          </section>


      <div className="discover-profiles-spacer">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        {horoscopeMatchesGenderPrefer?.map((profile, idx) =>
            <div  className={navigateClick === idx? `one-discover-profile` : `one-discover-profile-o` } key={idx}>
                <DiscoverHoroscopeProfile horoscopeMatchesGenderPrefer={horoscopeMatchesGenderPrefer} navigateClick={navigateClick} idx={idx} setSlide={setSlide} slide={slide} profile={profile}/>
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
  </>
    )} else {
    content = (
      <div className="center-no-matches-component">
        {/* <NoMatches user_id={user_id} /> */}
        <div className="loading">
        <img src={pictures.collection[11].imageUrl} />
         </div>

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
