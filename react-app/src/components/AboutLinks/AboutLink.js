import React, { useState, useEffect } from 'react';
import pictures from "../../data/pictures";
import infoLinks from '../../data/infoLinks';

import { AboutModal } from "../../context/Modal";

const AboutLinks = () => {
  const [showModal, setShowModal] = useState(false);


  return (
    <>





      <button
      style={{color: 'white'}}
      className="nav-modal-button-about"
      onClick={() => setShowModal(true)}>About Kelsey Sry</button>
      {showModal && (
        <AboutModal onClose={() => setShowModal(false)}>

      <div className="profile-user-info">
          <div className="profile-userInfo-inner">
            <div className="profile-userInfo-inner-content">
              <div className="profile-userInfo-thumb">
                <div className="profile-thumb">
                  {infoLinks ? <img src={infoLinks[0].imageUrl} alt="user_image"/> : null }
                </div>
              </div>
                <div className="profile-basics">
                  <div className="profile-basics-username">
                    {/* <span className="username-text">{user?.first_name}</span> */}

                  </div>
                <div className="profile-asl">
                  <div className="profile-asl-row">
                    {/* {currentProfile? <span className="profile-asl-age">{currentProfile[0]?.age}</span> : null} */}
                    <span className="profile-asl-spacer"></span>
                    {/* {currentProfile? <span className="profile-asl-location">{currentProfile[0]?.location}</span> : null} */}
                    {/* {currentProfile? <span className="profile-asl-location">{currentProfile[0]?.number_likes} <i class="fas fa-heart"></i> </span> : null} */}
                  </div>
                </div>
                </div>
            </div>
          </div>
        </div>








        <section className="about-link-container">
            <a style={{color: 'white'}} target="_blank" href={infoLinks[0].github} rel="noreferrer">
                <i className="fab fa-github-square"/>
            </a>

            <a style={{color: 'white'}}  target="_blank" href={infoLinks[0].linkedin} rel="noreferrer">
                <i className="fab fa-linkedin"/>
            </a>

            <a style={{color: 'white'}}  target="_blank" href={infoLinks[0].emailM} rel="noreferrer">
                <i className="fas fa-envelope-square"/>
                {infoLinks[0].email}
            </a>
        </section>
        </AboutModal>
      )}

    </>


  );
}

export default AboutLinks;
