import React, { Component } from 'react';
import ProductDetail from '../productDetail/productDetail';

import { connect } from 'react-redux';
import store from '../../store/Store';

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      showModal: false,
      product: {},
      isNotification: false
    };
  }

  renderingProductItem = () => {
    if (!this.props.collections) {
      let productItem = JSON.parse(sessionStorage.getItem('selectedProduct'));
      return (
        <ProductDetail 
          notification={ this.state.isNotification }
          key={ productItem.id }
          product={ productItem }
          availability={ productItem.availableForSale }
          description={ productItem.description }
          images={ productItem.images }
          price={ productItem.variants[0].price }
          addVariantToCart={ this.addVariantToCart }
          handleCartOpen={ this.handleCartOpen }
        />
      )
    } else {
      let selectedProduct = this.props.collections[0].products.map((product) => {
        let productItem; 
        if (product.id === this.props.match.params.productId) {
          productItem = product;
          sessionStorage.setItem('selectedProduct', JSON.stringify(productItem));
          return ( 
            <ProductDetail 
              notification={ this.state.isNotification }
              key={ productItem.id}
              product={ productItem }  
              availability={ productItem.availableForSale }
              description={ productItem.description }
              images={ productItem.images }
              price={ productItem.variants[0].price }
              addVariantToCart={ this.addVariantToCart }
              handleCartOpen={ this.handleCartOpen }
            />
          )
        }; 
        return productItem;
      }); 
      return (
        <>
          { selectedProduct }
        </>
      )
    };  
  }

  addVariantToCart = (product, variantId, quantity) => {
    const state = store.getState();
    const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }]
    // Checkout id is lost on productDetail component after refreshing screen...
    const checkoutId = state.checkout.id
    state.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      store.dispatch({type: 'ADD_VARIANT_TO_CART', payload: { checkout: res }});
      sessionStorage.setItem('cartItems', JSON.stringify(res))
      this.setState({
        isNotification: true
      })
    });
  }

  updateQuantityInCart = (lineItemId, quantity) => {
    const state = store.getState();
    console.log(state)
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
      <>
      { this.renderingProductItem() }
      </>
    );
  }  
}

export default connect((state) => state)(ProductPage);