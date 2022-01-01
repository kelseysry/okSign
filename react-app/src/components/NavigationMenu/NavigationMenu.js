
import React from 'react';
import LogoutButton from '../auth/LogoutButton';
import { useSelector, useDispatch } from "react-redux";
import { clearProfiles } from '../../store/profile';
import { getProfiles } from '../../store/profile';
import { useHistory } from 'react-router';
import { clearConversation } from '../../store/conversation';
import SearchForm from '../SearchForm';
// import '../../components/Navigation/Navigation.css'
import { clearQuestions, getQuestions } from '../../store/question';
import ChooseBackgroundContent from '../Background/ChooseBackgroundContent';
import AboutLinks from '../AboutLinks/AboutLink';


function NavigationMenu() {

  const sessionUser = useSelector((state) => state?.session.user);
  const dispatch = useDispatch()
  const history = useHistory();


  let sessionLinks;


  const handleClearDiscoverProfiles = async(e) => {
    e.preventDefault();
    // await dispatch(clearProfiles())
    await dispatch(clearQuestions())
    await dispatch(getProfiles())
    // await dispatch(getQuestions())
    history.push(`/`)

}

  const handleClearProfile = async(e) => {
    e.preventDefault();
    dispatch(clearProfiles())
    history.push(`/profiles/${sessionUser.id}`)
    dispatch(getProfiles())
  }

  const handleClearConversations = async(e) => {
    e.preventDefault()
    await dispatch(clearConversation())
    // await dispatch(clearProfiles())
    await dispatch(clearQuestions())
    await dispatch(getProfiles())
    await dispatch(getQuestions())

    history.push(`/conversations`)
  }

  const handleQuestions = async(e) => {
    e.preventDefault()

    history.push('/questions')
  }




  if(sessionUser) {
    // const userId = sessionUser.id
    sessionLinks = (
    <>
    <nav className="nav_container_desktop">
      <ul className="nav_container_list">

            <button
              className="nav_bar_button"
              onClick={handleClearDiscoverProfiles}
            >
              Discover
            </button>


            <button
              className="nav_bar_button"
              onClick={handleQuestions}
            >
              Questions
            </button>

           <button
              className="nav_bar_button"
              onClick={handleClearConversations}
            >
              Conversations
            </button>

        <li>
          <SearchForm />
        </li>

          <button
              className="nav_bar_button"
              onClick={handleClearProfile}
            >
              Profile
            </button>
          <li>
            <LogoutButton />
          </li>
          <li>
            <ChooseBackgroundContent />
          </li>
          <button
              className="nav_bar_button"

            >
              <AboutLinks />
            </button>

      </ul>
    </nav>

    <nav className="nav_container_mobile">
      <ul className="nav_container_list">



            <button
              className="nav_bar_button"
              onClick={handleClearDiscoverProfiles}
            >
              <i className="fas fa-hand-holding-heart"></i>
            </button>


            <button
              className="nav_bar_button"
              onClick={handleQuestions}
            >
              <i className="fas fa-question-circle"></i>
            </button>

           <button
              className="nav_bar_button"
              onClick={handleClearConversations}
            >
              <i className="fas fa-comments"></i>
            </button>

        <li>
          <SearchForm />
        </li>

          <button
              className="nav_bar_button"
              onClick={handleClearProfile}
            >
              <i className="fas fa-user-circle"></i>
            </button>
          <li>
            <LogoutButton />
          </li>



      </ul>
    </nav>
    </>


    )
  }


  return (
    <div className="nav-container">
      {sessionLinks}
    </div>
  )
}


export default NavigationMenu
