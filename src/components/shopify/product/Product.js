import React, { Component } from 'react';
import './Product.css';
import VariantSelector from '../variantSelector/VariantSelector';
import Modal from '../../modal/Modal';


// const ONE_SIZE_FITS_MOST = 'One Size Fits Most';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      selectedOptions: {},
      // variantId: '',
      eventTargetValue: null,
      showModal: false
    };
  }

  handleOptionChange = (event) => {
    const target = event.target
    let selectedOptions = this.state.selectedOptions;
    console.log(target)
    selectedOptions[target.name] = target.value;
    console.log(selectedOptions)
    const selectedVariant = this.props.client.product.helpers.variantForOptions(this.props.product, selectedOptions)
    // console.log(`selected variant:`,selectedVariant)
    this.setState({
      selectedVariant: selectedVariant,
      eventTargetValue: target.value
      // variantId: selectedVariant.id
    });
  }

  handleModalOpen = () => {
    this.setState({
      showModal: true
    })
  }
  handleModalClose = () => {
    this.setState({
      showModal: false
    })
  }

  render() {
    // let optionNames = [];
    const activeStyle={
      color: 'yellow'
    }
    console.log(this.state.eventTargetValue)
    // console.log(this.state.selectedOptions)
    let product = this.props.product
    let productAvailable = this.props.product.availableForSale
    let productDescription = this.props.product.description
    let variantImage = this.props.product.images[0]
    let variant = this.state.selectedVariant
    // console.log(`variant:`,variant)
    let price = this.props.product.variants[0].price 
    let variantQuantity = 1
    let variantSelectors = this.props.product.variants.map((variantOptions) => {
      // console.log(variantOptions)
      return (
        <VariantSelector
          handleOptionChange={ this.handleOptionChange }
          key={variantOptions.id.toString()}
          variantOptions={ variantOptions }
          active={ this.state.selectedOptions }
          // variantId = { this.state.variantId }
          eventTargetValue={ this.state.eventTargetValue }
          style={ activeStyle }
        />
      );
    });

    // let ShowOneSizeFitsMost = (variantSelectors.length === 1 && optionNames[0] === 'Title');
    return (
      <div className='product'>
        { this.state.showModal === true ?
            <Modal 
              open={ this.state.showModal } 
              close={ this.handleModalClose } 
              image={ variantImage.src } 
              alt={ `${this.props.product.title} product shot` } 
              product={ product }
              style={{ visibility: 'hidden' }} 
            /> 
          : <img 
              src={ variantImage.src } 
              alt={ `${this.props.product.title} product shot` } 
              onClick={ this.handleModalOpen } 
            /> 
        }      
        <h3 className='productTitle'>{ this.props.product.title }</h3>
        <span className='productPrice'>${ Math.trunc(price) }</span>
        {/* { ShowOneSizeFitsMost ? <h5 className='productTitle'>{ ONE_SIZE_FITS_MOST }</h5> : variantSelectors } */}
        { productDescription === "" ? null : <div className='productDescription'>{ productDescription }</div> }
        <div className='productBtn'>
          { variantSelectors }
        </div>
        { productAvailable === false ? 
            <div className='btnDisable' >Sold Out</div>
          : this.state.selectedVariant !== undefined ?
            <button className='addToCart' onClick={ () => this.props.addVariantToCart(variant.id, variantQuantity) } >Add to Cart</button>
          : <button className='addToCart'>Add to Cart</button>
        }
      </div>
    );
  }
}

export default Product;