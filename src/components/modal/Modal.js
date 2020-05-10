import React from 'react';
import './Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ close, image, alt, product, handlePrev, handleNext, currentSlide }) => {
// FIX STYLING OF MODAL WITH MOBILE
  return (
    <div className='modal' > 
      <div className='modalClose' onClick={ close }>
        <FontAwesomeIcon icon={ faTimes } />
      </div>
      { product.images.length >= 2 ? 
        <div className='modalSlide'>
          <img src={ image } alt={ alt } />
          <div className='modalSlideBtns'>
            <button 
              className='slideBtn'
              onClick={ handlePrev }
              disabled={ currentSlide === 0 }
            >
              <FontAwesomeIcon icon={ faChevronLeft } />
            </button>
            <button 
              className='slideBtn'
              onClick={ handleNext }
              disabled={ currentSlide === product.images.length -1 }
            >
              <FontAwesomeIcon icon={ faChevronRight } />
            </button>
          </div>
        </div>    
        : <img src={ image } alt={ alt } />
      } 
    </div>
      
  )
  
};

export default Modal;