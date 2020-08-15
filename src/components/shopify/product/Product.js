import React from 'react';
import './Product.css';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  let variantImage = product.images[0]
  console.log(product)
  let productId = product.id
  return (
      <div className='product'>
        <Link className='link' to={{ pathname: `/ProductPage/${ productId }` }}>
          <img 
            src={ variantImage.src }
            alt={ `${product.title} product image` }
          />
          <h3 className='productTitle'>{ product.title }</h3>
        </Link>
      </div>
  )
}

export default Product;