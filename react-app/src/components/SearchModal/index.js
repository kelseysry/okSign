import React, { useState } from 'react';

import { AboutModal } from "../../context/Modal";
import SearchForm from '../SearchForm';
import './SearchModal.css'

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
          <section className="search-modal-container">
              <div className="modal-flex">
                  <div>
                      <div className="search-modal-title">
                        Search for Users
                      </div>
                      <div className="search-first-text">by location,</div>
                      <div className="search-first-text">horoscope sign,</div>
                      <div className="search-first-text">gender</div>
                  </div>
                  <div>
                      <SearchForm hideModal={() => setShowModal(false)}/>
                  </div>

              </div>





          </section>

        </AboutModal>
      )}

    </>


  );
}

export default SearchModal;
