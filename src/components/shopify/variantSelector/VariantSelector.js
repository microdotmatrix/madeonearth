  import React, { Component } from 'react';
  import './VariantSelector.css';

class VariantSelector extends Component {
  render() {
    return (
      <div
        className='productOption'
        name={ this.props.option.name }
        key={ this.props.option.name }
      >
        { this.props.option.values.map((value) => {
          return (
            <button 
              className='optionButton hover active'
              name={ this.props.option.name }
              value={ value } 
              key={ `${ this.props.option.name }-${ value }`} 
              onClick={ this.props.handleOptionChange }  
            > 
              { `${ value }` } 
            </button>
          )
        }) }  
      </div>
    );
  }
}


export default VariantSelector;

