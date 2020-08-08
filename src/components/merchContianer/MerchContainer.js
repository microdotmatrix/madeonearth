import React, { Component } from 'react';
import Collections from '../shopify/collections/Collections';
import { connect } from 'react-redux';
import store from '../../store/Store';

class MerchContainer extends Component {

  render() {
    const state = store.getState();

    return (
      <div 
        className='main' 
        style={{
          display: 'flex', 
          justifyContent: 'center',
          width: '100%',
          heigth: '100%'
        }}
      >
        <Collections 
          collections={ state.collections }
          client={ state.client }
          addVariantToCart={ this.props.addVariantToCart }
        />
      </div>
    )
  }
}

export default connect((state) => state)(MerchContainer);