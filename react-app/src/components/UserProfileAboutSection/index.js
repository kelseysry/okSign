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
import './UserProfileAboutSection.css'
import Player from '../Player';

function UserProfileAboutSection(currentUserProfile) {
  const dispatch = useDispatch()

  // console.log("currentProfile", currentUserProfile)


  let currentProfile = currentUserProfile.currentUserProfile

  const horoscopesObj = useSelector((state) => state.horoscope)
  const horoscopes = Object?.values(horoscopesObj)[0]

  const gendersObj = useSelector((state) => state.gender)
  const genders = Object?.values(gendersObj)[0]

  const smokingsObj = useSelector((state) => state.smoking)
  const smokings = Object.values(smokingsObj)[0]

  const drinkingsObj = useSelector((state) => state.drinking)
  const drinkings = Object.values(drinkingsObj)[0]

  const childrenObj = useSelector((state) => state.children)
  const children = Object.values(childrenObj)[0]

  const petsObj = useSelector((state) => state.pet)
  const pets = Object.values(petsObj)[0]

  const politicsObj = useSelector((state) => state.politic)
  const politics = Object.values(politicsObj)[0]

  const religionObj = useSelector((state) => state.religion)
  const religions = Object.values(religionObj)[0]

  const partnersObj = useSelector((state) => state.partner)
  const partners = Object.values(partnersObj)[0]

  const orientationsObj = useSelector((state) => state.orientation)
  const orientations = Object.values(orientationsObj)[0]

  useEffect(async () => {
    await dispatch(getHoroscopes())
    await dispatch(getGenders())
    await dispatch(getSmokings())
    await dispatch(getDrinkings())
    await dispatch(getChildren())
    await dispatch(getPets())
    await dispatch(getPolitics())
    await dispatch(getReligions())
    await dispatch(getPartners())
    await dispatch(getOrientations())

  }, [dispatch])


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

  const getGender = (genderId) => {
    const userGender = genders?.filter(function(gender){
      return gender.id === +genderId
    });
    if(userGender) {
       if (+userGender[0]?.id === 2) {
         return "Man"
       } else {
         return "Woman"
       }
    }
    else {
      return null
    }
  }

  const getSmoking = (smokingId) => {
    const userSmoking = smokings?.filter(function(smoking){
      return smoking.id === +smokingId
    });
    if(userSmoking) {
      return userSmoking[0]?.name
    }
    else {
      return null
    }
  }

    const getDrinking = (drinkingId) => {
    const userDrinking = drinkings?.filter(function(drinking){
      return drinking.id === +drinkingId
    });
    if(userDrinking) {
      return userDrinking[0]?.name
    }
    else {
      return null
    }
  }

  const getChildrenText = (childrenId) => {
    const userChildren = children?.filter(function(child){
      return child.id === +childrenId
    });
    if(userChildren) {
      // console.log("userChildren", userChildren)
      return userChildren[0]?.preference
    }
    else {
      return null
    }
  }

  const getPet = (petId) => {
    const userPet = pets?.filter(function(pet){
      return pet.id === +petId
    });
    if(userPet) {
      // console.log("userPet", userPet)
      return userPet[0]?.preference
    }
    else {
      return null
    }
  }

    const getPolitic = (politicId) => {
    const userPolitic = politics?.filter(function(politic){
      return politic.id === +politicId
    });
    if(userPolitic) {
      // console.log("userPolitic", userPolitic)
      return userPolitic[0]?.belief
    }
    else {
      return null
    }
  }

  const getReligion = (religionId) => {
    const userReligion = religions?.filter(function(religion){
      return religion.id === +religionId
    });
    if(userReligion) {
      return userReligion[0]?.belief
    }
    else {
      return null
    }
  }

    const getPartner = (partnerId) => {
    const userPartner = partners?.filter(function(partner){
      return partner.id === +partnerId
    });
    if(userPartner) {
      return userPartner[0]?.title
    }
    else {
      return null
    }
  }

  const getOrientation = (orientationId) => {
    const userOrientation = orientations?.filter(function(orientation){
      return orientation.id === +orientationId
    });
    if(userOrientation) {
      return userOrientation[0]?.preference
    }
    else {
      return null
    }
  }


  return (
    <>

    <div className="match-profile-all-content">

      <section className="about-section">

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
          <div className="about-div-header">A Shower thought you recently had</div>
          <div className="one-detail-content">
            <Player sound={currentProfile[0]?.user_audio}/>
          </div>
        </div>

      </section>

        <section className="Details">
            <div className="about-div-header">Details</div>
              <div className="details-container">
              <div className="one-detail">
                {getGender(currentProfile[0]?.gender_id)} | {getOrientation(currentProfile[0]?.orientation_id)} | {getPartner(currentProfile[0]?.partner_id)} | {currentProfile[0]?.pronouns}
              </div>

              <div className="one-detail">
              <i class="fas fa-male"></i> {currentProfile[0]?.height} cm
              </div>

              <div className="one-detail">
              <i class="fas fa-graduation-cap"></i> {currentProfile[0]?.education}
              </div>

              <div className="one-detail">
              <i class="fas fa-briefcase"></i> {currentProfile[0]?.occupation}
              </div>

              <div className="one-detail">
              <i class="fas fa-bolt"></i> {getHoroscope(currentProfile[0]?.horoscope_id)}
              </div>

              <div className="one-detail">
              <i class="fas fa-cocktail"></i> {getSmoking(currentProfile[0]?.smoking_id)} | {getDrinking(currentProfile[0]?.drinking_id)}
              </div>

              <div className="one-detail">
                <i class="fas fa-baby"></i> {getChildrenText(currentProfile[0]?.children_id)}
              </div>

              <div className="one-detail">
              <i class="fas fa-paw"></i> {getPet(currentProfile[0]?.pet_id)}
              </div>

              <div className="one-detail">
              <i class="fas fa-landmark"></i> {getPolitic(currentProfile[0]?.politic_id)}
              </div>

              <div className="one-detail">
                <i class="fas fa-pray"></i> {getReligion(currentProfile[0]?.religion_id)}
              </div>
          </div>
        </section>
        </div>
      </>
  )
}

export default UserProfileAboutSection
