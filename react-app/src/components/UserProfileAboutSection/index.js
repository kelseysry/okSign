import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getGenders } from '../../store/gender';
import { getHoroscopes } from '../../store/horoscope';
import { getSmokings } from '../../store/smoking';
import { getDrinkings } from '../../store/drinking';
import { getChildren } from '../../store/children';
import { getPets } from '../../store/pet';
import { getPolitics } from '../../store/politic';
import { getReligions } from '../../store/religion';

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

  useEffect(async () => {
    await dispatch(getHoroscopes())
    await dispatch(getGenders())
    await dispatch(getSmokings())
    await dispatch(getDrinkings())
    await dispatch(getChildren())
    await dispatch(getPets())
    await dispatch(getPolitics())
    await dispatch(getReligions())

  }, [dispatch])



  const getHoroscope = (horoscopeId) => {
    const userHoroscope = horoscopes?.filter(function(horoscope){
      return horoscope.id == +horoscopeId
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
      return gender.id == +genderId
    });
    if(userGender) {
       if (userGender[0]?.id == 2) {
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
      return smoking.id == +smokingId
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
      return drinking.id == +drinkingId
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
      return child.id == +childrenId
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
      return pet.id == +petId
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
      return politic.id == +politicId
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
      return religion.id == +religionId
    });
    if(userReligion) {
      return userReligion[0]?.belief
    }
    else {
      return null
    }
  }


  return (
    <>
        <div>
          about me : {currentProfile[0]?.about_me}
        </div>
        <div>
          goal : {currentProfile[0]?.goal}
        </div>
        <div>
          talent : {currentProfile[0]?.talent}
        </div>
        <div>
          my traits : {currentProfile[0]?.my_traits}
        </div>
        <div>
          needs : {currentProfile[0]?.needs}
        </div>
        <div>
          hobbies : {currentProfile[0]?.hobbies}
        </div>
        <div>
          moments : {currentProfile[0]?.moments}
        </div>
        <div>
          secrets : {currentProfile[0]?.secrets}
        </div>
        <div>
          looking for : {currentProfile[0]?.looking_for}
        </div>
        <div>
          user audio : {currentProfile[0]?.user_audio}
        </div>

        <section className="Details">
          <h1> Details </h1>
          <div>
            gender :  {getGender(currentProfile[0]?.gender_id)}
          </div>
          <div>
            number of likes: {currentProfile[0]?.number_likes}
          </div>
          <div>
            orientation : {currentProfile[0]?.orientation_id}
          </div>
          <div>
            pronouns: {currentProfile[0]?.pronouns}
          </div>
          <div>
            height: {currentProfile[0]?.height} cm
          </div>
          <div>
            education: {currentProfile[0]?.education}
          </div>
          <div>
            occupation: {currentProfile[0]?.occupation}
          </div>
          <div>
            horoscope : {getHoroscope(currentProfile[0]?.horoscope_id)}
          </div>
          <div>
            smoking status: {getSmoking(currentProfile[0]?.smoking_id)}
          </div>
          <div>
            drinking status: {getDrinking(currentProfile[0]?.drinking_id)}
          </div>
          <div>
            children status: {getChildrenText(currentProfile[0]?.children_id)}
          </div>
          <div>
            pet status: {getPet(currentProfile[0]?.pet_id)}
          </div>
          <div>
            political status: {getPolitic(currentProfile[0]?.politic_id)}
          </div>
          <div>
            religion status: {getReligion(currentProfile[0]?.religion_id)}
          </div>
          <div>
            partner_id: {currentProfile[0]?.partner_id}
          </div>
        </section>
      </>
  )
}

export default UserProfileAboutSection
