import React, { Component } from 'react';
import './Header.css';
import Cart from '../../asset/cartLogo.png';
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
            <img src={ Cart } alt='cart icon' />
          </button>
        </div>
        <div className='logo'>
          <img className='logoImg' src={ Logo } />
        </div>
      </div>
    )
  }    
}; 

export default Header;