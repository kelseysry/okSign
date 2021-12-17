import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { NavLink } from "react-router-dom";
import { deleteProfile } from "../../store/profile";
import './DotDotButton.css'

function DotDotButton({showEditMessageForm, setShowEditMessageForm}) {
  const dispatch = useDispatch();
  const history = useHistory();


  // false = menu is hidden
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => { // invoked by the onClick in the html button, opens menu
    if (showMenu) return;
    setShowMenu(true);
  };


  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false); // trigger closing of dropdown menu
    };

    // register event listener for click events on the entire page (document)
    // so can close the dropdown menu if click anywhere on the page.
    document.addEventListener('click', closeMenu);

    // cleanup function for the useEffect should remove this event listener
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  //  const handleDeleteReview = (productId, id) => {
  //    dispatch(deleteProfile(productId, id));
  //   history.push(`/products/${productId}`)
  // }

  return (
    <>
    <div className="dotdot_dropdown">

      <button className="" onClick={openMenu}>
        <div className="dotdot">
          <i class="fas fa-ellipsis-v"></i>
        </div>
      </button>


      {showMenu && (
        <div className="edit-trash">
          {/* <div>
            <i className="fas fa-edit"></i>
          </div> */}
          {/* <div>
            <button className="delete-review-button" onClick={() => {handleDeleteReview(productId, id)}}><i class="fas fa-trash"></i></button>
          </div> */}

        <button className="edit-profile-button" onClick={() => setShowEditMessageForm(true)}>Edit Profile <i className="fas fa-edit"></i></button>
        </div>
      )}


    </div>
    </>
  )

}
export default DotDotButton
