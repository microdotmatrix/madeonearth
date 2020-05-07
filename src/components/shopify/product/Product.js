import React, { Component } from 'react';
import './Product.css';
import VariantSelector from '../variantSelector/VariantSelector';
import Modal from '../../modal/Modal';

// const ONE_SIZE_FITS_MOST = 'One Size Fits Most';

class Product extends Component {
  constructor(props) {
    super(props);

    let defaultOptionValues = {};
    this.props.product.options.forEach((selector) => {
      defaultOptionValues[selector.name] = selector.values[0].value;
    });
    this.state = { 
      selectedOptions: defaultOptionValues,
      showModal: false,
      images: this.props.product.images,
      imgSlide: 0
    };
  }

  handleOptionChange = (event) => {
    const target = event.target
    let selectedOptions = this.state.selectedOptions;
    selectedOptions[target.name] = target.value;
    const selectedVariant = this.props.client.product.helpers.variantForOptions(this.props.product, selectedOptions)
    console.log(selectedVariant.attrs.image)

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

  nextSlide = () => {
    const newIndex = this.state.imgSlide + 1;
    this.setState({
      images: this.props.product.images[newIndex],
      imgSlide: newIndex
    })
  }
  prevSlide = () =>{
    const newIndex = this.state.imgSlide - 1;
    this.setState({
      images: this.props.product.images[newIndex],
      imgSlide: newIndex
    })
  }



  render() {
    // let optionNames = [];
    let product = this.props.product
    console.log(`images arr;`, this.state.images)
    console.log(`imgSlide:`, this.state.imgSlide)
    let productAvailable = this.props.product.availableForSale
    let productDescription = this.props.product.description
    let variantImage = this.state.selectedVariantImage || this.props.product.images[0]
    let variant = this.state.selectedVariant || this.props.product.variants[0]
    let variantQuantity = this.state.selectedVariantQuantity || 1
    let variantSelectors = this.props.product.variants.map((variantOptions) => {
      return (
        <VariantSelector
          handleOptionChange={ this.handleOptionChange }
          key={variantOptions.id.toString()}
          product={ product }
          variantOptions={ variantOptions }
        />
      );
    });

    // let ShowOneSizeFitsMost = (variantSelectors.length === 1 && optionNames[0] === 'Title');
    return (
      <div className='product'>
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

        <div>
          <button
            onClick={ () => this.prevSlide() }
            disabled={ this.state.imgSlide === 0 }
            >prev</button>
          <img 

          />
          <button
            onClick={ () => this.nextSlide() } 
            disabled={ this.state.imgSlide === this.props.product.images.length -1}
            >next</button>
        </div>

        <h3 className='productTitle'>{ this.props.product.title }</h3>
        <span className='productPrice'>${ Math.trunc(variant.price) }</span>
        {/* { ShowOneSizeFitsMost ? <h5 className='productTitle'>{ ONE_SIZE_FITS_MOST }</h5> : variantSelectors } */}
        { productDescription === "" ? null : <div className='productDescription'>{ productDescription }</div> }
        <div className='productBtn'>
          { variantSelectors }
        </div>
        { productAvailable === true ? 
          <button className='addToCart' onClick={ () => this.props.addVariantToCart(variant.id, variantQuantity) } >Add to Cart</button> :
          <div className='btnDisable' >Sold Out</div>
        }
      </div>
    );
  }
}

export default Product;