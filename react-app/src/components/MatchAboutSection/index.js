import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getGenders } from '../../store/gender';
import { getHoroscopes } from '../../store/horoscope';
import { getSmokings } from '../../store/smoking';
import { getDrinkings } from '../../store/drinking';
import { getChildren } from '../../store/children';
import { getPets } from '../../store/pet';
import { getPolitics } from '../../store/politic';
import { getReligions } from '../../store/religion';
import { getPartners } from '../../store/partner';
import { getOrientations } from '../../store/orientation';

function MatchAboutSection(currentUserProfile) {
  const dispatch = useDispatch()

  // console.log("currentProfile", currentUserProfile)


  let currentProfile = currentUserProfile.currentUserProfile


  return (
    <>

    <div className="">

      <section className="">

        <div  className="one-detail-container">
          <div className="about-div-header">About me</div>
          <div className="one-detail-content">
            {currentProfile[0]?.about_me}
          </div>
        </div>

        <div  className="one-detail-container">
          <div className="about-div-header">Goal</div>
          <div className="one-detail-content">
          {currentProfile[0]?.goal}
          </div>
        </div>

        <div  className="one-detail-container">
          <div className="about-div-header">Talent</div>
          <div className="one-detail-content">
          {currentProfile[0]?.talent}
          </div>
        </div>

        <div  className="one-detail-container">
          <div className="about-div-header">My Traits</div>
          <div className="one-detail-content">
          {currentProfile[0]?.my_traits}
          </div>
        </div>

        <div  className="one-detail-container">
          <div className="about-div-header">Needs</div>
          <div className="one-detail-content">
          {currentProfile[0]?.needs}
          </div>
        </div>

        <div  className="one-detail-container">
          <div className="about-div-header">Hobbies</div>
          <div className="one-detail-content">
          {currentProfile[0]?.hobbies}
          </div>
        </div>

        <div  className="one-detail-container">
          <div className="about-div-header">Moments</div>
          <div className="one-detail-content">
          {currentProfile[0]?.moments}
          </div>
        </div>

        <div  className="one-detail-container">
          <div className="about-div-header">Secrets</div>
          <div className="one-detail-content">
          {currentProfile[0]?.secrets}
          </div>
        </div>

        <div  className="one-detail-container">
          <div className="about-div-header">Looking for</div>
          <div className="one-detail-content">
          {currentProfile[0]?.looking_for}
          </div>
        </div>

        <div  className="one-detail-container">
          <div className="about-div-header">Audio</div>
          <div className="one-detail-content">
          {currentProfile[0]?.user_audio}
          </div>
        </div>

      </section>

        </div>
      </>
  )
}

export default MatchAboutSection
