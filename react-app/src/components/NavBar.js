
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector, useDispatch } from "react-redux";


const NavBar = () => {
  const sessionUser = useSelector((state) => state?.session.user);

  let sessionLinks;

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
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to={`/profiles/${sessionUser.id}`} exact={true} activeClassName='active'>
            Profile
          </NavLink>
        </li>
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
