import React, { Component }  from 'react';
import './Collections.css';
// import ProductPage from '../productPage/ProductPage';
import ProductPage from '../pPage/PPage';

class Collections extends Component {

  render() {
    let collections;
    if (this.props.collections) {
      collections = this.props.collections[0].products.map((product) => {
        return (
          <ProductPage 
            addVariantToCart={ this.props.addVariantToCart }
            client={ this.props.client }
            key={ product.id.toString() }
            product={ product }
          />
        )
      })
    } 
    else {
      collections = <p>Loading...</p>
    }
    return (
      <div className='productWrapper'>
        { collections }
      </div>
    )
  }
}

export default Collections; 