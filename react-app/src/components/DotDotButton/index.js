import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { deleteMessage } from "../../store/message";
import './DotDotButton.css'


function DotDotButton({conversation_id, messageId, showEditMessageForm, setShowEditMessageForm}) {
  const dispatch = useDispatch();

  // console.log("messageId", messageId)
  let message_id = +messageId


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

   const handleDeleteMessage = (conversation_id, message_id) => {
    //  console.log("conversatiod_id in handle", conversation_id)
    //  console.log("message_id in handle", message_id)

     dispatch(deleteMessage(conversation_id, message_id));
  }

  return (
    <>
    <div className="dotdot_dropdown">

      <button className="" onClick={openMenu}>
        <div className="dotdot">
          <i className="fas fa-ellipsis-v"></i>
        </div>
      </button>


      {showMenu && (
        <div className="edit-trash">

          <div>
            <button className="delete-review-button" onClick={() => handleDeleteMessage(conversation_id, message_id)}><i className="fas fa-trash"></i></button>
          </div>

          <button className="" onClick={() => setShowEditMessageForm(true)}><i className="fas fa-pen"></i></button>
        </div>
      )}


    </div>
    </>
  )

}
export default DotDotButton
