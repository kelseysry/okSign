import { Modal } from "../../context/Modal";
import React, { useState, useEffect } from 'react';
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import "./LoginFormPage.css"
import pictures from "../../data/pictures";

const LoginFormPage = () => {

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  return (
    <>
    <nav className="nav-login">
      <button
      className="nav-modal-button"
      onClick={() => setShowModal(true)}>Login</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
        <LoginForm />
        </Modal>
      )}
      <button
      className="nav-modal-button"
      onClick={() => setShowModal2(true)}>Sign Up</button>
      {showModal2 && (
        <Modal onClose={() => setShowModal2(false)}>
        <SignUpForm />
        </Modal>
      )}
    </nav>

    <div className="container-banner">

      <div className="top-banner-pic" style={{ backgroundImage: `url('${pictures.collection[0].imageUrl}')` }}>
        <div className="header-banner">okSign</div>
        <div className="text-banner">May the stars align in your favor</div>
      </div>

    </div>

    </>
  )
}

export default LoginFormPage
