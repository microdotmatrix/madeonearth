import React, { Component } from 'react';
import './ProductDetail.css';
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

  // handleAlert = () => {
  //   setTimeout(this.handleCartNotification, 3000)
  //   (() => this.props.alert())
  // }

  handleCartNotification = () => {
    let notification = this.props.notification;
    let productTitle = this.props.product.title;
    let productSize = this.props.variantSize;
    if (notification === true) {
      return (
        <section className='notify'>
          <h3>{ `${ productTitle }( ${ productSize } ), HAS BEEN ADDED TO CART!` }</h3>
        </section>
      )
    };
  }

  render() {
    let productImage = this.props.images
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
        {/* { this.handleAlert() } */}
        <div className='productContainer'>
          <div className='imageContent'>
            <img 
              src={ productImage.src } 
              alt={ `${productTitle} product shot` } 
              /> 
          </div>

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
                <button className='addToCart' onClick={ () => this.props.addVariantToCart(productVariant, variantQuantity) } >Add to Cart</button>
                : <button className='addToCart'>Add to Cart</button>
              }
          </div>
        </div>
      </section>
    )
  }
}

export default connect((state) => state)(ProductDetail);