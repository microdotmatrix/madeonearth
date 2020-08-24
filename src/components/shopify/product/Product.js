import React from 'react';
import './Product.css';

import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  let id = product.id
  let variantImage = product.images[0]
  return (
      <div className='product'>
        <Link 
          className='imageLink'
          to={{ pathname: `/productpage/${ id }` }}
        >
          <img 
            src={ variantImage.src }
            alt={ `${product.title} product image` }
          />
        </Link>

        <Link
          className='titleLink'
          to={{ pathname: `/productpage/${ id }` }}
        >
          <h3 className='productTitle'>{ product.title }</h3>
        </Link>
      </div>
  )
}

export default Product;