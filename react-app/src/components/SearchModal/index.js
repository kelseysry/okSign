import React, { useState, useEffect } from 'react';
import infoLinks from '../../data/infoLinks';

import { AboutModal } from "../../context/Modal";
import SearchForm from '../SearchForm';

const SearchModal = () => {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button
          style={{color: 'white'}}
          className="nav-modal-button-about"
          onClick={() => setShowModal(true)}
          >
            <section className="nav-kelsey-modal">
              {/* <i class="fas fa-id-card fa-2x"></i> */}
              <div className="contact-me">
                <div>Search Users</div>
              </div>
            </section>
        </button>
      {showModal && (
        <AboutModal onClose={() => setShowModal(false)}>
          <section className="about-modal-container">

            <SearchForm hideModal={() => setShowModal(false)}/>

              <div>
                <img className="profile-thumb-modal" src={infoLinks[0].imageUrl} alt="user_image"/>
              </div>

                <div className="about-first-text">okSign brought to you by</div>
                <div className="about-modal-name">
                 {infoLinks[0].name}
                </div>
                <div className="about-first-text">let's connect!</div>


          </section>

        </AboutModal>
      )}

    </>


  );
}

export default SearchModal;
