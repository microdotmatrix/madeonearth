import React from 'react';
import './Product.css';

const Product = ({ product }) => {
  let variantImage = product.images[0]
  let id = product.id
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

export default Product;