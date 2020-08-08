import React, { Component } from 'react';
import './PPage.css';

class ProductPage extends Component {

  render() {
    console.log(this.props.product)
    const product = this.props.product
    let variantImage = product.images[0]
    return (
      <div className='product'>
        <img 
          src={ variantImage.src }
          alt={ `${product.title} product image` }
        />
        <h3 className='productTitle'>{ product.title }</h3>
      </div>
    )
  }

}

export default ProductPage;