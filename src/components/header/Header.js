import React, { Component } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../asset/Logo_nm.gif';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state=({
      playing: true
    })
  }
  render() {
    return (
      <div className='header'>
        <div className='cartIcon'>
          <button className='cartButton' onClick={ this.props.handleCartOpen }>
            <FontAwesomeIcon icon={ faShoppingCart} size='sm' />
          </button>
        </div>
        <div className='logo'>
          <img src={ Logo } />
        </div>
      </div>
    )
  }    
}; 

export default Header;