import React, { Component } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import GifPlayer from 'react-gif-player';
// import Logo from '../../asset/MOE2.gif';
// import Logo from '../../asset/MadeOnEarthLogo.gif';
// import LogoImg from '../../asset/MadeOnEarthLogo.png';

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
          {/* <GifPlayer 
            gif={ Logo }
            // still={ LogoImg }
            // onTogglePlay={ playing => this.setState({ playing }) }
            autoplay={ this.state.playing }
          /> */}
          {/* <img src={ Logo } /> */}
          {/* <h1>Made on Earth</h1> */}
        </div>
      </div>
    )
  }    
}; 

export default Header;