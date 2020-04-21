import React, { Component } from 'react';
import Products from '../shopify/Products';
import { connect } from 'react-redux';
import store from '../../store/Store';

class Merchandise extends Component {

  addVariantToCart = (variantId, quantity) => {
    const state = store.getState();
    const lineItemsToAdd = [{variantId, quantity: parseInt(quantity, 10)}]
    const checkoutId = state.checkout.id
    state.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      store.dispatch({type: 'ADD_VARIANT_TO_CART', payload: {isCartOpen: true, checkout: res}});
    });
  }

  render() {
    const state = store.getState(); 
    return (
      <div>
        <Products 
          products={ state.products }
          client={ state.client }
          addVariantToCart={ this.addVariantToCart }
        />
      </div>
    )
  }
}

export default connect((state) => state)(Merchandise);