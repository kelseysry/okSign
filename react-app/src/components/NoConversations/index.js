import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import './NoConversations.css'

const NoConversations = ({}) => {
  const dispatch = useDispatch()
  const history = useHistory();
  const sessionUser = useSelector((state) => state?.session);
  const user_id = sessionUser?.user.id

  const handleQuestionRedirect = () => {
    history.push('/questions')
  }

  const handleCreateProfileRedirect = () => {
    history.push(`/profiles/${user_id}`)
  }


  return (

      <section className="step-container-no-convo">

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
          <div className="click-me-new-user">Click Me</div>

          <div className="Step4NQ">and</div>

          <div className="Step5NQC"
            onClick={handleCreateProfileRedirect}>
            fill out profile
          </div>

          <div className="Step6NC">to get</div>
          <div className="Step7NC">Matches</div>

        </section>

  )
}

export default NoConversations
