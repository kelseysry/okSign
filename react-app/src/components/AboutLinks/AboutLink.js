import React, { useState, useEffect } from 'react';
import pictures from "../../data/pictures";
import infoLinks from '../../data/infoLinks';

import { Modal } from "../../context/Modal";

const AboutLinks = () => {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button
      className="nav-modal-button-about"
      onClick={() => setShowModal(true)}>About Kelsey Sry</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>

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
        </Modal>
      )}

    </>


  );
}

export default AboutLinks;
