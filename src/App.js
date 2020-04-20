import React, { Component } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Cart from './components/shopify/Cart';
import Merchandise from './components/merchandise/Merchandise';

import { connect } from 'react-redux';
import store from './store/Store';

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

  // componentDidMount() {
  //   this.props.client.checkout.create().then((res) => {
  //     this.setState({
  //       checkout: res,
  //     });
  //   });
  //   this.props.client.product.fetchAll().then((res) => {
  //     console.log(res)
  //     this.setState({
  //       products: res,
  //     });
  //   });
  //   this.props.client.shop.fetchInfo().then((res) => {
  //     this.setState({
  //       shop: res,
  //     });
  //   });
  // }

  addVariantToCart = (variantId, quantity) => {
    const state = store.getState();
    const lineItemsToAdd = [{variantId, quantity: parseInt(quantity, 10)}]
    const checkoutId = this.state.checkout.id

    state.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      store.dispatch({type: 'ADD_VARIANT_TO_CART', payload: {isCartOpen: true, checkout: res}});
    });

    // return this.props.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
    //   this.setState({
    //     checkout: res,
    //   });
    // });
  }

  updateQuantityInCart = (lineItemId, quantity) => {
    const state = store.getState();
    const checkoutId = this.state.checkout.id
    const lineItemsToUpdate = [{id: lineItemId, quantity: parseInt(quantity, 10)}]

    state.client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
      store.dispatch({type: 'UPDATE_QUANTITY_IN_CART', payload: {checkout: res}});
    });

    // return this.props.client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
    //   this.setState({
    //     checkout: res,
    //   });
    // });
  }

  removeLineItemInCart = (lineItemId) => {
    const state = store.getState();
    const checkoutId = this.state.checkout.id

    state.client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
      store.dispatch({type: 'REMOVE_LINE_ITEM_IN_CART', payload: {checkout: res}});
    });

    // return this.props.client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
    //   this.setState({
    //     checkout: res,
    //   });
    // });
  }

  handleCartClose = () => {
    store.dispatch({type: 'CLOSE_CART'});
    
    // this.setState({
    //   isCartOpen: false,
    // });
  }

  handleCartOpen = () => {
    store.dispatch({type: 'CART_OPEN'});
  }

  render() {
    const state = store.getState();
    return (
      <div className="App">
        <header className="App-header">
          <h1>Made on Earth</h1>
          <Navbar 
            handleCartOpen={ this.handleCartOpen }
          />
        </header> 
          <Cart
            checkout={ this.state.checkout }
            isCartOpen={ this.state.isCartOpen }
            handleCartClose={ this.handleCartClose }
            updateQuantityInCart={ this.updateQuantityInCart }
            removeLineItemInCart={ this.removeLineItemInCart }
          />
        
        <Merchandise 
          addVariantToCart={ this.addVariantToCart }
        />
      </div>
    )
  }
}

export default connect((state) => state)(App);
