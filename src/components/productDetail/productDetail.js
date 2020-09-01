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
      eventTargetValue: null
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

  handleThumbnailSelection = () => {
    
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





  render() {
    console.log(this.props.product)
    let productImage = this.props.images[0]
    let thumbnailImages = this.props.images.map(thumbnails => {
      console.log(thumbnails)
      return (
        <Thumbnails 
          key={ thumbnails.id }
          thumbnailImages={ thumbnails.src }
          handleThumbnailSelection={ this.handleThumbnailSelection }
        />
      )
    })
    let productTitle = this.props.product.title
    let productPrice = this.props.price
    let productDescription = this.props.description
    let productAvailability = this.props.availability
    let productVariant = this.state.selectedVariant
    let variantQuantity = 1
    let variantSelectors = this.props.product.variants.map((variantOptions) => {
      return (
        <VariantSelector 
          handleOptionChange={ this.handleOptionChange }
          key={variantOptions.id.toString()}
          variantOptions={ variantOptions }
          eventTargetValue={ this.state.eventTargetValue }
        />
      )
    }) 

    return (
      <section className='productPage'>
        { this.handleCartNotification() }
        <div className='productContainer'>
          { this.props.images.length === 1 ?
              <div className='imageContent'>
                <img  
                  src={ productImage.src } 
                  alt={ `${productTitle} product shot` } 
                />
              </div>
              : <div className='imageWithThumbnails'>
                <img 
                  src={ productImage.src } 
                  alt={ `${productTitle} product shot` } 
                /> 
                <div className='thumbnails'>
                  { thumbnailImages }
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