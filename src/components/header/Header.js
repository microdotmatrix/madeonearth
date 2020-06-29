import React, { Component } from 'react';
import './Header.css';
// import Cart from '../../asset/cartLogo.png';
import Cart from '../../asset/cart2.png';
import Logo from '../../asset/Logo_nm.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

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
        <div className='iconBar'>
          <a
            className='igIcon'
            title='Made On Earth on Instagram'
            href='//www.instagram.com/wearemadeonearth/'
            rel='noopener noreferrer'
            target='_blank'
          >
            <span className='FAI' ><FontAwesomeIcon icon={faInstagram} /></span>
          </a>
          <button className='cartIcon' onClick={ this.props.handleCartOpen }>
            <img src={ Cart } alt='cart icon' />
          </button>
        </div>
        <div className='logo'>
          <img className='logoImg' src={ Logo } alt='logo gif' />
        </div>
      </div>
    )
  }    
}; 

export default Header;