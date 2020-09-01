import React, { Component } from 'react'; 
import './Thumbnails.css';


class Thumbnails extends Component {
  constructor(props) {
    super(props); 
    this.state = {

    }
  }

  render() {
    let colorVariant = this.props.colorVariant;

    return (
      <div className='thumbnails'> 
          <img 
            onClick={ this.props.handleColorSelection }
            src={ colorVariant.src }
            alt={ `Product thumbnail` } 
            id={ colorVariant.id }
          />
      </div>
    )
  }
}

export default Thumbnails;

