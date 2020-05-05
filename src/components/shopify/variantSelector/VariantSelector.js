  import React, { Component } from 'react';
  import './VariantSelector.css';

class VariantSelector extends Component {
  render() {
    console.log(this.props.variantOptions)
    let options = this.props.variantOptions
    return (
      <div
        className='productOption'
        name={ this.props.product.title }
        key={ this.props.product.id }
      >
        { options.selectedOptions.map((variant) => {
            return (
              options.available === true ? 
              <button 
                className='btn available'
                name={ variant.name }
                value={ variant.value}
                key={ `${ variant.name }-${ variant.value}` }
                onClick={ this.props.handleOptionChange }
              >
                { `${ variant.value }` } 
              </button> :
              <button 
                className='btn notAvailable'
                name={ variant.name }
                value={ variant.value }
                key={ `${ variant.name }-${ variant.value }` }
                // onClick={ this.props.handleOptionChange }
              >
                { `${ variant.value }` } 
              </button>
            )
          })
        }  
      </div>
    );
  }
}


export default VariantSelector;

