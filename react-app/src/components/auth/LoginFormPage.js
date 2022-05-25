import { Modal } from "../../context/Modal";
import React, { useState, useEffect } from 'react';
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import "./LoginFormPage.css"
import pictures from "../../data/pictures";
import LoginMapContainer from "./LoginMapContainer";

const LoginFormPage = () => {

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  return (
    <section>
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
        <div className="header-banner-ok">ok</div>
        <div className="header-banner-sign">SIGN</div>

        <div className="text-banner">May the stars align in your favor </div>
        <div className="text-banner">Match by answering questions or horoscope sign</div>
        <div className="text-banner">Click on a marker to see all of our users <i class="fas fa-map-marker-alt"></i></div>
        <div className="text-banner"> ⚠️  My Google Maps API trial expired so you will see an error msg on all maps  ⚠️ </div>

      </div>
    </div>

      <div className="map-size">
        <LoginMapContainer />
      </div>

    </section>
  )
}

export default LoginFormPage
