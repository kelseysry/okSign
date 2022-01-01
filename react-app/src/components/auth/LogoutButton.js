import React from 'react';
import { useDispatch } from 'react-redux';
import { clearQuestions } from '../../store/question';
import { logout } from '../../store/session';
import {closeNav} from '../../store/navigation'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    await dispatch(clearQuestions())
    await dispatch(closeNav())
  };

  return <button className="" onClick={onLogout}>

    <div className="logOutMobile"><i className="fas fa-sign-out-alt"></i></div>
    <div className="logOutDesktop">Log out</div>

    </button>
};

export default LogoutButton;
