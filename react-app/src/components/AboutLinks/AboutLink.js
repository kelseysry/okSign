import React, { useState, useEffect } from 'react';
import pictures from "../../data/pictures";
import infoLinks from '../../data/infoLinks';
import './AboutLinks.css'

import { AboutModal } from "../../context/Modal";

const AboutLinks = () => {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button
          style={{color: 'white'}}
          className="nav-modal-button-about"
          onClick={() => setShowModal(true)}>
            <section className="nav-kelsey-modal">
              <i class="fas fa-id-card fa-2x"></i>
              <div className="contact-me">
                <div>Contact</div>
                <div>Me</div>
              </div>
            </section>
        </button>
      {showModal && (
        <AboutModal onClose={() => setShowModal(false)}>
          <section className="about-modal-container">

              <div>
                <img className="profile-thumb-modal" src={infoLinks[0].imageUrl} alt="user_image"/>
              </div>

                <div className="about-first-text">okSign brought to you by</div>
                <div className="about-modal-name">
                 {infoLinks[0].name}
                </div>
                <div className="about-first-text">let's connect!</div>


                <div className="about-link-container">
                      <a style={{color: 'white'}} target="_blank" href={infoLinks[0].github} rel="noreferrer">
                          <i className="fab fa-github-square fa-2x"/>
                      </a>

                      <a style={{color: 'white'}}  target="_blank" href={infoLinks[0].linkedin} rel="noreferrer">
                          <i className="fab fa-linkedin fa-2x"/>
                      </a>
                      <a style={{color: 'white'}}  target="_blank" href={infoLinks[0].emailM} rel="noreferrer">
                          <i className="fas fa-envelope-square fa-2x"/>
                      </a>

                 </div>

          </section>

          <img className="allHoroscopes" src={pictures.collection[19].imageUrl} />
        </AboutModal>
      )}

    </>


  );
}

export default AboutLinks;
