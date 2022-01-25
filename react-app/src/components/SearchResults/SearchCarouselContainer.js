
import React, { useEffect, useState } from 'react';
import SearchMatchTile from '../SearchMatchTile';
import {SwipeInstructionModal } from "../../context/Modal";
import pictures from "../../data/pictures";
import Instructions from "../Instructions/Instructions.js"

const SearchCarouselContainer = ({input, searchUserResults, inputExists}) => {

  let [navigateClick, setNavigateClick] = useState(-1)
  const [slide, setSlide] = useState(1)
  const [showModal, setShowModal] = useState(false);

  useEffect( () => {

    // if user search again, will force page to restart at position left 0
      if(inputExists !== input) {
        const left = document.querySelector('#discoverProfile');
        left.scrollLeft = 0;
        setNavigateClick(-1)
      }

  },[input])


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

  const handleRightClick = (e) => {
    e.preventDefault();
    const right = document.querySelector('#discoverProfile');
     right.scrollLeft += 1050;
     setSlide(1)
     if(navigateClick < searchUserResults?.length -1) {
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
     if(navigateClick < searchUserResults?.length -1) {
      setNavigateClick(navigateClick += 1)
     } else {
       return navigateClick
     }
  }

  return (
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

      <section className="step-container-search">
    <div className="Step1s">search</div>
    <div className="Step2s">results</div>
    <div className="Step3s">for</div>
    <div className="Step5ss">{input}</div>

  <button className="img-stairs"
  onClick={() => {
    setShowModal(true)}
    }
  >
  <img src={pictures.collection[14].imageUrl} />
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
          {searchUserResults?.map((profile, idx) =>
              <div  id={profile?.user_id? `user-profile-exist` : `user-profile-not-exist` } className={navigateClick === idx ? `one-discover-profile` : `one-discover-profile-o` } key={idx}>
                  <SearchMatchTile setNavigateClick={setNavigateClick} navigateClick={navigateClick} idx={idx} setSlide={setSlide} slide={slide} profile={profile} />
                  {/* <MatchProfile navigateClick={navigateClick} idx={idx} setSlide={setSlide} slide={slide} userIdPercentObj={userIdPercentObj}/> */}
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

  )

}

export default SearchCarouselContainer
