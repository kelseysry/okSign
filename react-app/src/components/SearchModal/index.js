import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { AboutModal } from "../../context/Modal";
import SearchForm from '../SearchForm';
import './SearchModal.css'

const SearchModal = () => {
  const [showModal, setShowModal] = useState(false);

  const [currentUserProfile, setCurrentUserProfile] = useState();
  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id = sessionUser?.id


  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/profiles/userProfile/${user_id}`);
      const responseData = await response.json();
      console.log("responseData",responseData )
      setCurrentUserProfile(responseData);
    }
    fetchData();
  }, []);



  return (
    <>
  { currentUserProfile?.oneProfile?.length ? 

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
        </button> : "Complete profile to search users"}
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
