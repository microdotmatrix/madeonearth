import React, { Component } from 'react';
// import './ProductPage.css';
import VariantSelector from '../shopify/variantSelector/VariantSelector';
// import Modal from '../components/modal/Modal';

import { connect } from 'react-redux';
import store from '../../store/Store';

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

  componentDidMount() {
    this.matchProductItem()
  }

  matchProductItem = () => {
    let productItem = this.props.collections[0].products.map((product => {
      if (product.id === this.props.match.params.productId) {
        sessionStorage.setItem('selectedProduct', JSON.stringify(product))
      }
    }))
    this.getProductItem()
    return productItem
  }

  getProductItem = () => {
    const productItem =  JSON.parse(sessionStorage.getItem('selectedProduct'))
    this.setState({
      product: productItem
    });
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

  renderProductItem = () => {
    const { product } = this.state
    console.log(product)
    let variantQuantity = 1
    let productAvailability = product.availableForSale
    let productDescription = product.description
    let productImage = product.images[0]
    let productVariant = this.state.selectedVariant
    let productPrice = product.variants[0].price
    return (
      <>
        <div>
          <img 
            src={ productImage.src } 
            alt={ `${this.props.product.title} product shot` } 
            onClick={ this.handleModalOpen } 
          /> 
        </div>
        
        <div>
          <h1 className='productTitle'>{ this.props.product.title }</h1>
          <span className='productPrice'>${ Math.trunc(productPrice) }</span>
          { productDescription === "" ? null : <div className='productDescription'>{ productDescription }</div> }
          <div className='productBtn'>
            { this.variantSelector() }
          </div>

          { productAvailability === false ? 
              <div className='btnDisable' >Sold Out</div>
            : productVariant !== undefined ?
              <button className='addToCart' onClick={ () => this.props.addVariantToCart(productVariant.id, variantQuantity) } >Add to Cart</button>
            : <button className='addToCart'>Add to Cart</button>
          }

        </div>
      </>
    )
  }

  render() {
    const { product } = this.state; 
    console.log(product)
    return (
      <section className='productPage'>
    

      </section>
    );
  };  
}

export default connect((state) => state)(ProductPage);