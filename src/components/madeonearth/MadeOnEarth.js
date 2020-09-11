import React, { Component } from 'react';
import './MadeOnEarth.css';

import Header from '../header/Header';
import Cart from '../shopify/cart/Cart';
import Collections from '../shopify/collections/Collections';

import { connect } from 'react-redux';
import store from '../../store/Store';

class MadeOnEarth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCartOpen: false,
      checkout: { lineItems: [] },
      products: [],
      shop: {},
    }
  }

  componentDidMount() {
    if (sessionStorage.getItem('cartItems')) {
      const cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
      this.updateCheckout(cartItems)

    } else {  
      this.clientInitialization()
    }
  }

  updateCheckout = (cartItems) => {
    store.dispatch({ type: 'CHECKOUT_FOUND', payload: cartItems });
    this.props.client.product.fetchAll()
    .then((res) => {
      store.dispatch({ type: 'PRODUCTS_FOUND', payload: res })
    });
    this.props.client.collection.fetchAllWithProducts()
    .then((res) => {
      store.dispatch({ type: 'COLLECTIONS_FOUND', payload: res })
    });
    this.props.client.shop.fetchInfo()
    .then((res) => {
      store.dispatch({ type: 'SHOP_FOUND', payload: res})
    });
  }
  
  clientInitialization = () => {
    this.props.client.checkout.create()
    .then((res) => {
      store.dispatch({ type: 'CHECKOUT_FOUND', payload: res }) 
    });
    this.props.client.product.fetchAll()
    .then((res) => {
      store.dispatch({ type: 'PRODUCTS_FOUND', payload: res })
    });

    this.props.client.collection.fetchAllWithProducts()
    .then((res) => {
      store.dispatch({ type: 'COLLECTIONS_FOUND', payload: res })
    });

    this.props.client.shop.fetchInfo()
    .then((res) => {
      store.dispatch({ type: 'SHOP_FOUND', payload: res})
    });
  }

  // addVariantToCart = (variantId, quantity) => {
  //   const state = store.getState();
  //   const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }]
  //   const checkoutId = state.checkout.id
  //   state.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
  //     store.dispatch({type: 'ADD_VARIANT_TO_CART', payload: { isCartOpen: true, checkout: res }});
  //     sessionStorage.setItem('cartItems', JSON.stringify(res))
  //   });
  // }
 
  updateQuantityInCart = (lineItemId, quantity) => {
    const state = store.getState();
    const checkoutId = state.checkout.id
    const lineItemsToUpdate = [{id: lineItemId, quantity: parseInt(quantity, 10)}]
    state.client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
      sessionStorage.setItem('cartItems', JSON.stringify(res))
      store.dispatch({type: 'UPDATE_QUANTITY_IN_CART', payload: { checkout: res }});
    });
  }

  removeLineItemInCart = (lineItemId) => {
    const state = store.getState();
    const checkoutId = state.checkout.id
    state.client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
      sessionStorage.removeItem('cartItems')
      store.dispatch({type: 'REMOVE_LINE_ITEM_IN_CART', payload: { checkout: res }});
    });
  }

  handleCartClose = () => {
    store.dispatch({ type: 'CLOSE_CART' });
  }

  handleCartOpen = () => {
    store.dispatch({ type: 'OPEN_CART' });
  }

  render() {
    const state = store.getState();
    return (
      <div className='app'>
        <Header handleCartOpen={ this.handleCartOpen } />
        <Cart
          checkout={ state.checkout }
          isCartOpen={ state.isCartOpen }
          handleCartClose={ this.handleCartClose }
          updateQuantityInCart={ this.updateQuantityInCart }
          removeLineItemInCart={ this.removeLineItemInCart }
        />
        <Collections />

      </div>
    )
  }


}

export default connect((state) => state)(MadeOnEarth);