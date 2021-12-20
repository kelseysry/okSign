import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import { getProfiles } from '../../store/profile';

import './NoMatches.css'

const NoMatches = ({user_id}) => {
  const dispatch = useDispatch()

  const profilesObj = useSelector((state) => state?.profile)
  const profiles = Object?.values(profilesObj)[0]

  useEffect(() => {
     dispatch(getProfiles());
  },[dispatch, profiles?.length, user_id])


  let currentProfile = profiles?.filter((profile) => {
    return profile?.user_id === +user_id
  })

  // console.log("currentProfile in nomatches", currentProfile)


  return (
    <section className="NoMatchesContainer">
      <div className="profile-userInfo">
        <div className="profile-userInfo-inner">
          <div className="profile-userInfo-inner-content">
            <div className="profile-userInfo-thumb">
              <div className="profile-thumb">
                {currentProfile ? <img src={currentProfile[0]?.image_url1} alt="user_image"/> : null }
              </div>
            </div>
            <div className="no-matches-header">
                No Matches Yet!
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default NoMatches
