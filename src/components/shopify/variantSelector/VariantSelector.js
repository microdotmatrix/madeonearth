  import React, { Component } from 'react';
  import './VariantSelector.css';

class VariantSelector extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      active: false
    }
  }

  btnActivate = () => {
    this.setState({
      active: true
    })
  }

  render() {
    let variant = this.props.variantOptions
    // console.log(variant.selectedOptions[0].value)
    console.log(this.props.active)
    console.log(this.props.eventTargetValue)
    let activeVariant = this.props.active
    // console.log(`active:`, activeVariant.Size)
    // let optionSelector = options.selectedOptions.map((variant) => {
    //   return (
    //     options.available === false ? 
    //       <button 
    //         className='notAvailable strikeout'
    //         name={ variant.name }
    //         value={ variant.value }
    //         key={ `${ variant.name }-${ variant.value }` }
    //       >
    //         { `${ variant.value }` } 
    //       </button>
    //     : this.props.variantId === <button data-select></button> ?
    //       <button 
    //         className='available active'
    //         name={ variant.name }
    //         value={ variant.value}
    //         key={ `${ variant.name }-${ variant.value}` }
    //         onClick={ this.props.handleOptionChange }
    //       >
    //         { `${ variant.value }` } 
    //       </button> 
    //     : <button 
    //         className='available  ' 
    //         name={ variant.name }
    //         value={ variant.value}
    //         key={ `${ variant.name }-${ variant.value}` }
    //         onClick={ this.props.handleOptionChange }
    //       >
    //         { `${ variant.value }` } 
    //       </button> 
    //   )
    // })
    return (
      <div
        className='productOption'
        // key={ variant.id }
        onClick={ this.btnActivate }
      >
      { variant.available === false ?
          <button
            className='notAvailable strikeOut'
            name={ variant.selectedOptions[0].name }
            value={ variant.title }
            // key={ variant.id }
          >
            { variant.title }
          </button>
        : this.props.eventTargetValue === variant.selectedOptions[0].value ?
          <button
          className='available active'
          name={ variant.selectedOptions[0].name }
          value={ variant.title }
          // key={ variant.id }
          style={ this.props.activeStyle }
          onClick={ this.props.handleOptionChange }
          >
            { variant.title }
          </button>  
        : <button
            className='available'
            name={ variant.selectedOptions[0].name }
            value={ variant.title }
            // key={ variant.id }
            style={ this.props.activeStyle }
            onClick={ this.props.handleOptionChange }
          >
            { variant.title }
          </button> 
          // {/* { optionSelector } */}
      }
      </div>
    );
  }
}


export default VariantSelector;

