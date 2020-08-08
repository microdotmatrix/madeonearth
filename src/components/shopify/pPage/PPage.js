import React from 'react';
import './PPage.css';

const ProductPage = ({ product }) => {
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

export default ProductPage;