
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector, useDispatch } from "react-redux";
import { clearProfiles } from '../../store/profile';
import { getProfiles } from '../../store/profile';
import { useHistory } from 'react-router';
import { clearConversation } from '../../store/conversation';
import SearchForm from '../SearchForm';
import './NavBar.css'
import { clearQuestions, getQuestions } from '../../store/question';

const NavBar = () => {
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
    <nav className="nav_container">
      <ul className="nav_container_list">
        {/* <li className="nav_bar_li">
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li> */}

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

        {/* <li className="nav_bar_li">
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}

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
      </ul>
    </nav>
    </>


    )
  } else {
    sessionLinks = (
      <ul className="nav2">
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
          </NavLink>
        </li>
      </ul>
    )
  }

  return (
    <div>
      {sessionLinks}
    </div>
    // <nav>
    //   <ul>
    //     <li>
    //       <NavLink to='/' exact={true} activeClassName='active'>
    //         Home
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/discover' exact={true} activeClassName='active'>
    //         Discover
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/login' exact={true} activeClassName='active'>
    //         Login
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/sign-up' exact={true} activeClassName='active'>
    //         Sign Up
    //       </NavLink>
    //     </li>
    //     {/* <li>
    //       <NavLink to='/users' exact={true} activeClassName='active'>
    //         Users
    //       </NavLink>
    //     </li> */}
    //     <li>
    //       <NavLink to={`/profiles/${userId}`} exact={true} activeClassName='active'>
    //         Profile
    //       </NavLink>
    //     </li>
    //     <li>
    //       <LogoutButton />
    //     </li>
    //   </ul>
    // </nav>
  );
}

export default NavBar;
