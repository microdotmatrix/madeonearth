import React, { Component } from 'react';
import './ProductDetail.css';
import { Link } from 'react-router-dom';
// import Thumbnails from '../thumbnails/Thumbnails';
import VariantSelector from '../shopify/variantSelector/VariantSelector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

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
    let productSize = this.props.variantSize;
    if (notification === true) {
      return (
        <section className='notify'>
          <h3>{ `${ productTitle }( ${ productSize } ), HAS BEEN ADDED TO CART!` }</h3>
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

        <div className='returnHome'>
          <Link to={{ pathname: '/' }}>
            <p>[ Made On Earth ]</p>
          </Link>
        </div>


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
          
          <div className='fontAwesomeIcon'>
            <Link to={{ pathname: '/' }}> 
              <FontAwesomeIcon icon={faChevronLeft} />
              <p>BACK</p>
            </Link>
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