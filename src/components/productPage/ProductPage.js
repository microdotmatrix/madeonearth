import React, { Component } from 'react';
import './ProductPage.css';
import VariantSelector from '../shopify/variantSelector/VariantSelector';
// import Modal from '../components/modal/Modal';

import { connect } from 'react-redux';
import store from '../../store/Store';

// const ONE_SIZE_FITS_MOST = 'One Size Fits Most';

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
    this.matchProduct()
  }
  // METHOD CURRENLTY SAVES TO STATE ONLY WHEN SELECTING AN ITEM. STATE IS LOST ON REFRESH...
  matchProduct = () => {
    let selectedProduct = this.props.collections[0].products.map((product => {
      if (product.id === this.props.match.params.productId) {
        this.setState({
          product
        })
      }
    }))
  }

  render() {
    console.log(this.state.product)
    return (
      <div>product page</div>
    )

  }
  // handleOptionChange = (event) => {
  //   const target = event.target
  //   let selectedOptions = this.state.selectedOptions;
  //   selectedOptions[target.name] = target.value;
  //   const selectedVariant = this.props.client.product.helpers.variantForOptions(this.props.product, selectedOptions)
  //   this.setState({
  //     selectedVariant: selectedVariant,
  //     eventTargetValue: target.value
  //   });
  // }

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

  // render() {
    // // let optionNames = [];
    // let product = this.props.product

    // let productAvailable = this.props.product.availableForSale

    // let productDescription = this.props.product.description

    // let variantImage = this.props.product.images[0]

    // let variant = this.state.selectedVariant

    // let price = this.props.product.variants[0].price 

    // let variantQuantity = 1

    // let variantSelectors = this.props.product.variants.map((variantOptions) => {
    //   return (
    //     <VariantSelector
    //       handleOptionChange={ this.handleOptionChange }
    //       key={variantOptions.id.toString()}
    //       variantOptions={ variantOptions }
    //       eventTargetValue={ this.state.eventTargetValue }
    //     />
    //   );
    // });


    // // let ShowOneSizeFitsMost = (variantSelectors.length === 1 && optionNames[0] === 'Title');
    // return (
    //   <div className='product'>

    //     {/* { this.state.showModal === true ?
    //         <Modal 
    //           open={ this.state.showModal } 
    //           close={ this.handleModalClose } 
    //           image={ variantImage.src } 
    //           alt={ `${this.props.product.title} product shot` } 
    //           product={ product }
    //           style={{ visibility: 'hidden' }} 
    //         /> 
    //       : <img 
    //           src={ variantImage.src } 
    //           alt={ `${this.props.product.title} product shot` } 
    //           onClick={ this.handleModalOpen } 
    //         /> 
    //     }   */}

    //     <img 
    //       src={ variantImage.src } 
    //       alt={ `${this.props.product.title} product shot` } 
    //       onClick={ this.handleModalOpen } 
    //     /> 

    //     <h3 className='productTitle'>{ this.props.product.title }</h3>
    //     { productDescription === "" ? null : <div className='productDescription'>{ productDescription }</div> }
    //     <span className='productPrice'>${ Math.trunc(price) }</span>
    //     {/* { ShowOneSizeFitsMost ? <h5 className='productTitle'>{ ONE_SIZE_FITS_MOST }</h5> : variantSelectors } */}
    //     <div className='productBtn'>
    //       { variantSelectors }
    //     </div>
    //     { productAvailable === false ? 
    //         <div className='btnDisable' >Sold Out</div>
    //       : this.state.selectedVariant !== undefined ?
    //         <button className='addToCart' onClick={ () => this.props.addVariantToCart(variant.id, variantQuantity) } >Add to Cart</button>
    //       : <button className='addToCart'>Add to Cart</button>
    //     }
    //   </div>
    // );
}

export default connect((state) => state)(ProductPage);