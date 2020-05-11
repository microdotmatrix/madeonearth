import React from 'react';
import './Modal.css';

const Modal = ({ close, image, alt }) => {
  return (
    <div 
      className='modal' 
      onClick={ close }
    >
      <img src={ image } alt={ alt } />
    </div>
  )
};

export default Modal;