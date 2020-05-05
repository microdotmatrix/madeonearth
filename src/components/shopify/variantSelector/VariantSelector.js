  import React, { Component } from 'react';
  import './VariantSelector.css';

class VariantSelector extends Component {
  render() {
    let options = this.props.variantOptions
    let optionSelector = options.selectedOptions.map((variant) => {
      return (
        options.available === true ? 
        <button 
          className='available'
          name={ variant.name }
          value={ variant.value}
          key={ `${ variant.name }-${ variant.value}` }
          onClick={ this.props.handleOptionChange }
        >
          { `${ variant.value }` } 
        </button> :
        <button 
          className='notAvailable strikeout'
          name={ variant.name }
          value={ variant.value }
          key={ `${ variant.name }-${ variant.value }` }
        >
          { `${ variant.value }` } 
        </button>
      )
    })
    return (
      <div
        className='productOption'
        name={ this.props.product.title }
        key={ this.props.product.id }
      >
        { optionSelector }
      </div>
    );
  }
}


export default VariantSelector;

