  import React, { Component } from 'react';
  import './VariantSelector.css';

class VariantSelector extends Component {
  render() {
    // console.log(`OPTIONS:`, this.props.option)
    return (
      <>
      {/* <select
        className="productOption"
        name={ this.props.option.name }
        key={ this.props.option.name }
        onChange={ this.props.handleOptionChange }
      >
        { this.props.option.values.map((value) => {
          return (
            <option value={value} key={`${this.props.option.name}-${value}`}>{`${value}`}</option>
          )
        }) }
      </select> */}

      <div
        className="productOption"
        name={ this.props.option.name }
        key={ this.props.option.name }
        // onChange={ this.props.handleOptionChange }
      >
        { this.props.option.values.map((value) => {
          return (
            <button 
              className='optionButton hover'
              value={ value } 
              key={ `${ this.props.option.name }-${ value }`} 
              onChange={ this.props.handleOptionChange }  
            > 
            { `${ value }` } </button>
          )
        }) }  
      </div>
      </>
    );
  }
}



export default VariantSelector;

