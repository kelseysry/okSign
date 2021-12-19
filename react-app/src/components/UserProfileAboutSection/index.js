import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getGenders } from '../../store/gender';
import { getHoroscopes } from '../../store/horoscope';

function UserProfileAboutSection(currentUserProfile) {
  const dispatch = useDispatch()

  // console.log("currentProfile", currentUserProfile)

  let currentProfile = currentUserProfile.currentUserProfile

  const horoscopesObj = useSelector((state) => state.horoscope)
  const horoscopes = Object?.values(horoscopesObj)[0]

  const gendersObj = useSelector((state) => state.gender)
  const genders = Object?.values(gendersObj)[0]

  console.log("genders", genders)

  useEffect(async () => {
    await dispatch(getHoroscopes())
    await dispatch(getGenders())
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
            smoking_id: {currentProfile[0]?.smoking_id}
          </div>
          <div>
            drinking_id: {currentProfile[0]?.drinking_id}
          </div>

          {/* <div>
            smoking: {currentProfile[0]?.smoking? "Smokes" : "Doesn't smoke"}
          </div> */}
          {/* <div>
            <i className="fas fa-cocktail"></i> {currentProfile[0]?.smoking? "Drinks" : "Doesn't drink"}
          </div> */}
          <div>
            children_id: {currentProfile[0]?.children_id}
          </div>
          <div>
            pet_id: {currentProfile[0]?.pet_id}
          </div>
          <div>
            politic_id: {currentProfile[0]?.politic_id}
          </div>
          <div>
            religion_id: {currentProfile[0]?.religion_id}
          </div>
          <div>
            partner_id: {currentProfile[0]?.partner_id}
          </div>
        </section>
      </>
  )
}

export default UserProfileAboutSection
