import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import pictures from '../data/pictures';

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();
  console.log('value', value);

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}
export function Modal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id='modal'>
      <div id='modal-background' onClick={onClose} />
      <div id='modal-content' style={{ backgroundImage: `url('${pictures.collection[1].imageUrl}')` }}>{children}</div>
      {/* <div id='modal-content'>{children}</div> */}
    </div>,
    modalNode
  );
}

// need to use 5 for light image
export function AboutModal({ onClose, children }) {
   const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(

    <div id='modal'>

      <div id='modal-background' onClick={onClose} />
      <div id='modal-content' style={{ backgroundImage: `url('${pictures.collection[6].imageUrl}')` }}>
        {/* <div className="border-modal">hi</div> */}
        {children}

        </div>
      {/* <div id='modal-content'>{children}</div> */}
    </div>,
    modalNode
  );
}
