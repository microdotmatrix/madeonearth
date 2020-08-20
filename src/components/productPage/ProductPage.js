import React, { Component } from 'react';
// import './ProductPage.css';
import ProductDetail from '../productDetail/productDetail';
import VariantSelector from '../shopify/variantSelector/VariantSelector';
// import Modal from '../components/modal/Modal';

import { connect } from 'react-redux';
import store from '../../store/Store';
import Product from '../shopify/product/Product';

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      selectedOptions: {},
      eventTargetValue: null,
      showModal: false,
      product: {}
    };
  }

  variantSelector = () => {
    const { product } = this.state; 
    let variantSelectors = product.variants.map((variantOptions) => {
    console.log(variantOptions)
      return (
        <VariantSelector 
          handleOptionChange={ this.handleOptionChange }
          key={ variantOptions.id.toString(0) }
          variantOptions={ variantOptions }
          eventTargetValue= { this.state.eventTargetValue }
        />
      );
    });
  }

  handleOptionChange = (event) => {
    const target = event.target
    let selectedOptions = this.state.selectedOptions;
    selectedOptions[target.name] = target.value;
    const selectedVariant = this.props.client.product.helpers.variantForOptions(this.props.product, selectedOptions)
    this.setState({
      selectedVariant: selectedVariant,
      eventTargetValue: target.value
    });
  }

  addVariantToCart = (variantId, quantity) => {
    const state = store.getState();
    const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }]
    const checkoutId = state.checkout.id
    state.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      store.dispatch({type: 'ADD_VARIANT_TO_CART', payload: { isCartOpen: true, checkout: res }});
      sessionStorage.setItem('cartItems', JSON.stringify(res))
    });
  }

  // handleModalOpen = () => {
  //   this.setState({
  //     showModal: true
  //   })
  // }

  // handleModalClose = () => {
  //   this.setState({
  //     showModal: false
  //   })
  // }

  renderingProductItem = () => {
    if (!this.props.collections) {
      let productItem = JSON.parse(sessionStorage.getItem('selectedProduct'));
      // console.log(`sessions`)
      return (
        <ProductDetail 
          product={ productItem }
        />
      )
    } else {
      let selectedProduct = this.props.collections[0].products.map((product) => {
        // console.log(`props`)
        if (product.id === this.props.match.params.productId) {
          let productItem = product;
          sessionStorage.setItem('selectedProduct', JSON.stringify(productItem));
          return ( 
            <ProductDetail 
              product={ productItem }
            />
          )
        }; 
      }); 
      return (
        <section className='productPage'>
          { selectedProduct }
        </section>
      )
    };  
  }

  render() { 
    return (
      <>
      { this.renderingProductItem() }
      </>
    );
  }  
}

export default connect((state) => state)(ProductPage);