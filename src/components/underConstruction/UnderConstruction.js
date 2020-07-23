import React, { Component } from 'react'; 
import SiteDownImg from '../../asset/UC.png';
import './UnderConstruction.css';

class UnderConstruction extends Component {
  render() {
    return (
      <div className='siteDown'>
        <img className='siteDownIMG' src={ SiteDownImg } alt='MadeonEarth is currently under construction' />
      </div>
    )
  }  
};

export default UnderConstruction; 