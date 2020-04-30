import React, { Component } from 'react';
import './Product.css';
import VariantSelector from '../variantSelector/VariantSelector';
import Modal from '../../modal/Modal';

const ONE_SIZE_FITS_MOST = 'One Size Fits Most';

class Product extends Component {
  constructor(props) {
    super(props);

    let defaultOptionValues = {};
    this.props.product.options.forEach((selector) => {
      defaultOptionValues[selector.name] = selector.values[0].value;
    });
    this.state = { 
      selectedOptions: defaultOptionValues,
      showModal: false
    };
  }

  findImage = (images, variantId) => {
    const primary = images[0];
    const image = images.filter(function (image) {
      return image.variant_ids.includes(variantId);
    })[0];
    return (image || primary).src;
  }

  handleOptionChange = (event) => {
    const target = event.target
    let selectedOptions = this.state.selectedOptions;
    selectedOptions[target.name] = target.value;
    const selectedVariant = this.props.client.product.helpers.variantForOptions(this.props.product, selectedOptions)

    this.setState({
      selectedVariant: selectedVariant,
      selectedVariantImage: selectedVariant.attrs.image
    });
  }

  handleQuantityChange = (event) => {
    this.setState({
      selectedVariantQuantity: event.target.value
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
    let optionNames = [];
    let productAvailable = this.props.product.availableForSale
    let variantImage = this.state.selectedVariantImage || this.props.product.images[0]
    let variant = this.state.selectedVariant || this.props.product.variants[0]
    let variantQuantity = this.state.selectedVariantQuantity || 1
    let variantSelectors = this.props.product.options.map((option) => {
      optionNames.push(option.name);
      return (
        <VariantSelector
          handleOptionChange={ this.handleOptionChange }
          key={option.id.toString()}
          option={ option }
        />
      );
    });
    let ShowOneSizeFitsMost = (variantSelectors.length === 1 && optionNames[0] === 'Title');
    return (
      <div className='product'>
        {/* { this.props.product.images.length ? <img src={ variantImage.src } alt={ `${this.props.product.title} product shot` } /> : null } */}
        { this.state.showModal === true && this.props.product.images.length 
          ? <Modal 
            open={ this.state.showModal } 
            close={ this.handleModalClose } 
            image={ variantImage.src } 
            alt={ `${this.props.product.title} product shot` } 
            style={{ visibility: 'hidden' }} 
            />
          : <img 
              src={ variantImage.src } 
              alt={ `${this.props.product.title} product shot` } 
              onClick={ this.handleModalOpen } 
            /> 
        }        
        <h3 className='productTitle'>{ this.props.product.title }</h3>

        <span className='productPrice'>${ variant.price }</span>

        { ShowOneSizeFitsMost ? <h5 className='productTitle'>{ ONE_SIZE_FITS_MOST }</h5> : variantSelectors }

        {/* <label className='productQuantity' htmlFor='quantity'>
          <p>Quantity</p>
          <input type='number' name='quantity' min='1' defaultValue={ variantQuantity } onChange={ this.handleQuantityChange }></input>
        </label> */}

        { productAvailable === true ? 
          <button className='button' onClick={ () => this.props.addVariantToCart(variant.id, variantQuantity) } >Add to Cart</button> :
          <div className='btnDisable' >Sold Out</div>
        }
      </div>
    );
  }
}

export default Product;