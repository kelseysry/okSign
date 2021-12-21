import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import { getProfiles } from '../../store/profile';
import { useHistory } from 'react-router';

import './NoMatches.css'

const NoMatches = ({user_id}) => {
  const dispatch = useDispatch()

  const profilesObj = useSelector((state) => state?.profile)
  const profiles = Object?.values(profilesObj)[0]
  const history = useHistory();


  useEffect(() => {
     dispatch(getProfiles());
  },[dispatch, profiles?.length, user_id])


  let currentProfile = profiles?.filter((profile) => {
    return profile?.user_id === +user_id
  })

  // console.log("currentProfile in nomatches", currentProfile)

  const handleQuestionRedirect = () => {
    history.push('/questions')
  }

  const handleCreateProfileRedirect = () => {
    history.push(`/profiles/${user_id}`)
  }

  return (
    <>
      <section className="NoMatchesContainer">
        <div className="profile-userInfo">
             <div className="no-matches-header">
                  No Matches Yet!
              </div>
        </div>
      </section>
      <section className="NoMatchesButtonsContainer">
        <div className="NoMatchesButtonsInner">
          Answer questions and fill out your profile to get matches!
        </div>
        <div className="newUserButtons">
          <button className="newUserButton"
          onClick={() => {handleQuestionRedirect()}}
          >Fill Out Questions <i class="fas fa-newspaper"></i>
          </button>
          <button className="newUserButton"
          onClick={() => {handleCreateProfileRedirect()}}
          >Create Profile <i class="fas fa-address-card"></i></button>
        </div>
      </section>
    </>
  )
}

export default NoMatches
