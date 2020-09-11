import React, { Component }  from 'react';
import './Collections.css';
import Product from '../product/Product';

import { connect } from 'react-redux';
import store from '../../../store/Store';

class Collections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNotification: false,
      productName: '',
      variantSize: ''
    }
  }

  addVariantToCart = (product, variant, quantity) => {

    const state = store.getState();
    let variantId = variant.id
    let productName = product.title;
    let variantSize = variant.title;
    const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }]
    const checkoutId = state.checkout.id
    state.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      store.dispatch({type: 'ADD_VARIANT_TO_CART', payload: { checkout: res }});
      sessionStorage.setItem('cartItems', JSON.stringify(res))
      this.setState({
        isNotification: true,
        productName,
        variantSize
      })
    });
    this.clearNotification();
  }

  clearNotification = () => {
    if (!this.state.isNotification) {
      setTimeout(() => {
        this.setState({
          isNotification: false
        })
      }, 4000)
    };
  }

  render() {
    const state = store.getState()

    let products;
    if (state.collections) {
      products = state.collections[0].products.map((product, i) => {
        let id = product.id

    // ============= DELETE ==================
    // if (state.products) {
    //   products = state.products.map(product => {
    //     let id = product.id
    // =======================================
    
        return (
          <Product 
            addVariantToCart={ this.addVariantToCart }
            notification={ this.state.isNotification }
            productName={ this.state.productName }
            variantSize={ this.state.variantSize }
            client={ state.client }
            key={ id }
            product={ product }
          />
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