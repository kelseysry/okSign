import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';


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
    <>
      <section className="NoMatchesContainer">
        <div className="profile-userInfo">
             <div className="no-matches-header">
                  You have no conversations
              </div>
        </div>
      </section>
      <section className="NoMatchesButtonsContainer">
        <div className="NoMatchesButtonsInner">
          Make sure that the answer to each question represents how you think! Don't also forget to add as much info as possible for your profile to get matches!
        </div>
        <div className="newUserButtons">
          <button className="newUserButton"
          onClick={() => {handleQuestionRedirect()}}
          >Questions <i class="fas fa-newspaper"></i>
          </button>
          <button className="newUserButton"
          onClick={() => {handleCreateProfileRedirect()}}
          >Profile <i class="fas fa-address-card"></i></button>
        </div>
      </section>
    </>
  )
}

export default NoConversations
