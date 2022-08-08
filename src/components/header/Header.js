import React, { Component } from 'react';
import './Header.css';
// import Cart from '../../asset/cartLogo.png';
import Cart from '../../asset/cart2.png';
import Logo from '../../asset/Logo_nm.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';

class Header extends Component {
  
  render() {
    return (
      <div className='header'>
        <div className='iconBar'>
          <a
            className='igIcon'
            title='Made On Earth on Instagram'
            href='//www.instagram.com/madeonearthapparel/'
            rel='noopener noreferrer'
            target='_blank'
          >
            <span className='FAI' ><FontAwesomeIcon icon={faInstagram} /></span>
          </a>
          <a href="//facebook.com/slayleyart" className="fbIcon" title="Slayley Art on Facebook" rel="noopener noreferrer" target="_blank">
            <span className="FAI"><FontAwesomeIcon icon={ faFacebook } /></span>
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