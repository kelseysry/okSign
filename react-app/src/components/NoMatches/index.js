import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import { getProfiles } from '../../store/profile';
import { useHistory } from 'react-router';
import { useDiscoverContent } from "../../context/DiscoverContentContext";

import './NoMatches.css'

const NoMatches = ({user_id}) => {
  const dispatch = useDispatch()
  const {discoverContent, setDiscoverContent} = useDiscoverContent()

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

  const handleQuestionRedirect = async (e) => {
    e.preventDefault();
    console.log("able to click handle questions")
    history.push('/questions')
  }


  const handleCreateProfileRedirect = () => {
    history.push(`/profiles/${user_id}`)
  }

  return (
    <>

      <section className="step-container-new-user">
          <div className="Step1N">No Matches</div>
          <div className="Step2N">yet...</div>

          <div className="Step3N"
            onClick={handleQuestionRedirect}>
            Answer
          </div>

          <div className="Step3NQ"
            onClick={handleQuestionRedirect}>
            Questions
          </div>

          <div className="Step4NQ">and</div>

          <div className="Step5NQ"
            onClick={handleCreateProfileRedirect}>
            fill out profile
          </div>

          <div className="Step6N">to get</div>
          <div className="Step7N">Matches</div>


          {/* <button id={discoverContent === 'HoroscopeMatch' ? 'whiteFont' : 'orangeFont'} className="Step4" onClick={() => setDiscoverContent('QuestionMatch')}>Questions</button>
          <div className={discoverContent === 'HoroscopeMatch' ? 'StepClick1' : 'hideClickMe' }>Click Me</div>


          <div className="Step5">Or</div>
          <button id={discoverContent === 'HoroscopeMatch' ? 'orangeFont' : 'whiteFont'} className="Step6" onClick={()=> setDiscoverContent('HoroscopeMatch')}>Horoscope</button>
          <div className={discoverContent === 'HoroscopeMatch' ? 'hideClickMe' : 'StepClick2' }>Click Me</div> */}
        </section>


    </>
  )
}

export default NoMatches
