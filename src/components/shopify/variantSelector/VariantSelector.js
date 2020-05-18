  import React, { Component } from 'react';
  import './VariantSelector.css';

class VariantSelector extends Component {

  render() {
    let variant = this.props.variantOptions
    return (
      <div className='productOption'>
      { variant.available === false ?
          <button
            className='notAvailable strikeOut'
            name={ variant.selectedOptions[0].name }
            value={ variant.title }
          >
            { variant.title }
          </button>
        : this.props.eventTargetValue === variant.selectedOptions[0].value ?
          <button
            className='available active'
            name={ variant.selectedOptions[0].name }
            value={ variant.title }
            onClick={ this.props.handleOptionChange }
          >
            { variant.title }
          </button>  
        : <button
            className='available'
            name={ variant.selectedOptions[0].name }
            value={ variant.title }
            onClick={ this.props.handleOptionChange }
          >
            { variant.title }
          </button> 
      }
      </div>
    );
  }
}


export default VariantSelector;

