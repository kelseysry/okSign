import React from 'react';
import { useDispatch } from 'react-redux';
import { clearQuestions } from '../../store/question';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    await dispatch(clearQuestions())
  };

  return <button className="nav_bar_button" onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
