

import React, { useEffect, useState } from 'react';
import {SwipeInstructionModal } from "../../context/Modal";
import pictures from "../../data/pictures";

const Instructions = ({searchUserResults, showModal, setShowModal, slide, setSlide, navigateClick, setNavigateClick }) => {


  // const [showModal, setShowModal] = useState(false);
  // const [slide, setSlide] = useState(1)
  // let [navigateClick, setNavigateClick] = useState(-1)


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
  <>

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
  )

  }


  </>
  )

}

export default Instructions
