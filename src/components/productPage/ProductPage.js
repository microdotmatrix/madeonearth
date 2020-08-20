import React, { Component } from 'react';
// import './ProductPage.css';
import ProductDetail from '../productDetail/productDetail';

import { connect } from 'react-redux';
import store from '../../store/Store';

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      showModal: false,
      product: {}
    };
  }

  renderingProductItem = () => {
    if (!this.props.collections) {
      let productItem = JSON.parse(sessionStorage.getItem('selectedProduct'));
      return (
        <ProductDetail 
          product={ productItem }
          availability={ productItem.availableForSale }
          description={ productItem.description }
          images={ productItem.images[0] }
          price={ productItem.variants[0].price }
        />
      )
    } else {
      let selectedProduct = this.props.collections[0].products.map((product) => {
        if (product.id === this.props.match.params.productId) {
          let productItem = product;
          sessionStorage.setItem('selectedProduct', JSON.stringify(productItem));
          return ( 
            <ProductDetail 
              product={ productItem }  
              availability={ productItem.availableForSale }
              description={ productItem.description }
              images={ productItem.images[0] }
              price={ productItem.variants[0].price }
            />
          )
        }; 
      }); 
      return (
        <section className='productPage'>
          { selectedProduct }
        </section>
      )
    };  
  }

  render() { 
    return (
      <>
      { this.renderingProductItem() }
      </>
    );
  }  
}

export default connect((state) => state)(ProductPage);