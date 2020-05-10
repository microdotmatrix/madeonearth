import React from 'react';
import './Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ close, image, alt, product, handlePrev, handleNext, currentSlide }) => {
 
  return (
    <div className='modal' > 
      { product.images.length >= 2 ? 
          <div className='modalSlide'>
            <button 
              className='slideBtn'
              onClick={ handlePrev }
              disabled={ currentSlide === 0 }
            >
              <FontAwesomeIcon icon={ faChevronLeft } />
            </button>
              <img src={ image } alt={ alt } />
            <button 
              className='slideBtn'
              onClick={ handleNext }
              disabled={ currentSlide === product.images.length -1 }
            >
              <FontAwesomeIcon icon={ faChevronRight } />
            </button>
          </div>          
        : <img src={ image } alt={ alt } />
      }
      <div 
        className='modalClose'
        onClick={ close }
      >
        <FontAwesomeIcon icon={ faTimes } />
      </div>
    </div>
  )
  
};

export default Modal;