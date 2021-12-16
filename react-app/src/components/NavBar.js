
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector, useDispatch } from "react-redux";
import { clearProfiles } from '../store/profile';
import { getProfiles } from '../store/profile';
import { useHistory } from 'react-router';

const NavBar = () => {
  const sessionUser = useSelector((state) => state?.session.user);
  const dispatch = useDispatch()
  const history = useHistory();


  let sessionLinks;




  const handleClearProfile = async(e) => {
    e.preventDefault();
    dispatch(clearProfiles())
    history.push(`/profiles/${sessionUser.id}`)
    dispatch(getProfiles())
  }




  if(sessionUser) {
    // const userId = sessionUser.id
    sessionLinks = (
    <>
    <div>"hello</div>
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/discover' exact={true} activeClassName='active'>
            Discover
          </NavLink>
        </li>
        {/* <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li> */}
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to='/conversations' exact={true} activeClassName='active'>
            Conversations
          </NavLink>
        </li>
        {/* <li>
          <NavLink to={`/profiles/${sessionUser.id}`} exact={true} onClick={handleClearProfile} activeClassName='active'>
            Profile
          </NavLink>
        </li> */}
          <button
              className="cart-item-button"
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
