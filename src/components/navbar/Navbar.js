import React from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


const Navbar = (props) => {
  return (
    <div className='cartIcon'>
      <button className='cartButton' onClick={ props.handleCartOpen }>
        <FontAwesomeIcon icon={ faShoppingCart} size='sm' />
      </button>
    </div>
  )
};

export default Navbar;