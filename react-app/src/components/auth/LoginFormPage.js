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

        <div className="text-banner">May the stars align in your favor</div>
        <div className="text-banner">Match by answering questions or horoscope sign</div>
        <div className="text-banner">Click on a marker to see all of our users!</div>

      </div>
    </div>

    {/* <section className="map-description-content"> */}
      <div className="map-size">
        <LoginMapContainer />
      </div>
      {/* <div className="map-description-container">
          <div className="marker-highlight">
          <i class="fas fa-map-marker-alt fa-10x"></i>
          </div>
          <div className="map-description">
            Click on a marker to see all of our users!
          </div>
      </div> */}

    {/* </section> */}

    </section>
  )
}

export default LoginFormPage
