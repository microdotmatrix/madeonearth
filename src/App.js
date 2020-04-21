import React, { Component } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Cart from './components/shopify/Cart';
import Merchandise from './components/merchandise/Merchandise';

import { connect } from 'react-redux';
import store from './store/Store';
import './styles/Shopify.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCartOpen: false,
      checkout: { lineItems: [] },
      products: [],
      shop: {}
    }
  }
  
  componentDidMount() {
    this.props.client.checkout.create().then((res) => {
      store.dispatch({ type: 'CHECKOUT_FOUND', payload: res }) 
    });
    this.props.client.product.fetchAll().then((res) => {
      store.dispatch({ type: 'PRODUCTS_FOUND', payload: res })
    });
    this.props.client.shop.fetchInfo().then((res) => {
      store.dispatch({ type: 'SHOP_FOUND', payload: res})
    });
  }

  updateQuantityInCart = (lineItemId, quantity) => {
    const state = store.getState();
    const checkoutId = state.checkout.id
    const lineItemsToUpdate = [{id: lineItemId, quantity: parseInt(quantity, 10)}]
    state.client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
      store.dispatch({type: 'UPDATE_QUANTITY_IN_CART', payload: { checkout: res }});
    });
  }

  removeLineItemInCart = (lineItemId) => {
    const state = store.getState();
    const checkoutId = state.checkout.id
    state.client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
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
      <div className="App">
        <header className="App-header">
          <Navbar handleCartOpen={ this.handleCartOpen } />
          <h1>Made on Earth</h1>
        </header> 
        <Cart
          checkout={ state.checkout }
          isCartOpen={ state.isCartOpen }
          handleCartClose={ this.handleCartClose }
          updateQuantityInCart={ this.updateQuantityInCart }
          removeLineItemInCart={ this.removeLineItemInCart }
        />
        <Merchandise 
          // addVariantToCart={ this.addVariantToCart } 
        />
      </div>
    )
  }
}

export default connect((state) => state)(App);
