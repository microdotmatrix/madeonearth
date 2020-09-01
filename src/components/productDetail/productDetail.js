import React, { Component } from 'react';
import './ProductDetail.css';
import Thumbnails from '../thumbnails/Thumbnails';
import VariantSelector from '../shopify/variantSelector/VariantSelector';

import { connect } from 'react-redux';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: {},
      eventTargetValue: null,
      selectedColor: ''
    };
  }

  handleCartNotification = () => {
    let notification = this.props.notification;
    let productTitle = this.props.product.title;
    if (notification === true) {
      return (
        <section>
          <div>{ `${ productTitle } has been added to cart!` }</div>
        </section>
      )
    };
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

  handleColorSelection = (event) => {
    let target = event.target
    let selectedColor = this.state.selectedColor;
    selectedColor = target.src;
    this.setState({
      selectedColor: selectedColor
    });
  }



  render() {
    console.log(this.props.product)
    let product = this.props.product
    let productImage = this.props.images[0]
    let thumbnailColorSelections = product.images.map((variant) => {
      return (
        <Thumbnails   
          handleColorSelection = { this.handleColorSelection }
          key={ variant.id.toString() }
          colorVariant={ variant }
        />
      )
    })
    let productTitle = this.props.product.title
    let productPrice = this.props.price
    let productDescription = this.props.description
    let productAvailability = this.props.availability
    let productVariant = this.state.selectedVariant
    let variantQuantity = 1
    let variantSelectors = product.variants.map((variantOptions) => {
      return (
        <VariantSelector 
          handleOptionChange={ this.handleOptionChange }
          key={ variantOptions.id.toString() }
          variantOptions={ variantOptions }
          eventTargetValue={ this.state.eventTargetValue }
        />
      )
    }) 

    return (
      <section className='productPage'>
        { this.handleCartNotification() }
        <div className='productContainer'>
          { 
            this.props.images.length === 1 ?
              <div className='imageContent'>
                <img  
                  src={ productImage.src } 
                  alt={ `${productTitle} product shot` } 
                />
              </div>
            : !this.state.selectedColor ?
              <div className='imageWithThumbnails'>
                <img 
                  src={ productImage.src } 
                  alt={ `${productTitle} product shot` } 
                /> 
                <div className='thumbnailContent'>
                  { thumbnailColorSelections }
                </div>
              </div>
            : <div className='imageWithThumbnails'>
                <img 
                  src={ this.state.selectedColor } 
                  alt={ `${productTitle} product shot` } 
                /> 
                <div className='thumbnailContent'>
                  { thumbnailColorSelections }
                </div>
              </div>
          }
          <div className='infoContent'>
            <h2 className='productTitle'>{ productTitle }</h2>
            <span className='productPrice'>
              <p>Price: </p>
              <p>${ Math.trunc(productPrice) }</p>
            </span>
            { productDescription === "" ? null : <div className='productDescription'>{ productDescription }</div> }

            <div className='productBtn'>
              { variantSelectors }
            </div>

            { productAvailability === false ? 
                <div className='btnDisable' >Sold Out</div>
                : productVariant !== undefined ?
                <button className='addToCart' onClick={ () => this.props.addVariantToCart(this.props.product, productVariant.id, variantQuantity) } >Add to Cart</button>
                : <button className='addToCart'>Add to Cart</button>
              }
          </div>
        </div>
      </section>
    )
  }
}

export default connect((state) => state)(ProductDetail);