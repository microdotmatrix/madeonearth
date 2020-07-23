import React, { Component } from 'react'; 
import SiteDownImg from '../../asset/UC.png';

class UnderConstruction extends Component {
  render() {
    return (
      <div>
        <img className='constructionImg' src={ SiteDownImg } alt='MadeonEarth is currently under construction' />
      </div>
    )
  }  
};

export default UnderConstruction; 