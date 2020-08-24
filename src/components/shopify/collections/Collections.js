import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import './Collections.css';
import Product from '../product/Product';

import { connect } from 'react-redux';
import store from '../../../store/Store';

class Collections extends Component {

  render() {
    const state = store.getState()

    let products;
    if (state.collections) {
      products = state.collections[0].products.map((product, i) => {
        let id = product.id
        return (
          <Link 
            className='productLink'
            to={{ pathname: `/productpage/${ id }` }}
            key={ id }
          >
            <Product 
              addVariantToCart={ this.props.addVariantToCart }
              client={ state.client }
              key={ id }
              product={ product }
            />
          </Link>
        )
      })
    }

    return (
      <div className='productWrapper'>
        { products }
      </div>
    )
  }
}

export default connect((state) => state)(Collections); 