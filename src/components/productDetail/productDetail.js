import React, { Component } from 'react';
import Cart from '../../asset/cart2.png';
import VariantSelector from '../shopify/variantSelector/VariantSelector';

import { connect } from 'react-redux';
import store from '../../store/Store';

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


  render() {
      let productImage = this.props.images
      let productTitle = this.props.product.title
      let productPrice = this.props.price
      let productDescription = this.props.description
      let productAvailability = this.props.availability
      let productVariant = this.props.variant
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
      <>
        <div>
          <button className='' onClick={ this.props.handleCartOpen }>
            <img src={ Cart } alt='cart icon' />
          </button>
        </div>

        <div>
          <img 
            src={ productImage.src } 
            alt={ `${productTitle} product shot` } 
          /> 
        </div>
          
        <div>
          <h1 className='productTitle'>{ productTitle }</h1>
          <span className='productPrice'>${ Math.trunc(productPrice) }</span>
          { productDescription === "" ? null : <div className='productDescription'>{ productDescription }</div> }
          <div className='productBtn'>
            { variantSelectors }
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
}

export default connect((state) => state)(ProductDetail);