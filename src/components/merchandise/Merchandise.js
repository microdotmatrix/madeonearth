import React from 'react';
import Products from '../shopify/Products';
import { connect } from 'react-redux';
import store from '../../store/Store';

const Merchandise = ({ addVariantToCart }) => {
  const state = store.getState(); 

  
  return (
    <div>
      <Products 
        products={ state.products }
        client={ state.client }
        addVariantToCart={ addVariantToCart }
      />
    </div>
  )
}

export default connect((state) => state)(Merchandise);