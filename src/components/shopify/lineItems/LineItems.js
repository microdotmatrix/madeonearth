import React, { Component } from 'react';
import './LineItems.css';

class LineItems extends Component {

  decrementQuantity = (lineItemId) => {
    const updatedQuantity = this.props.line_item.quantity - 1
    this.props.updateQuantityInCart(lineItemId, updatedQuantity);
  }

  incrementQuantity = (lineItemId) => {
    const updatedQuantity = this.props.line_item.quantity + 1
    this.props.updateQuantityInCart(lineItemId, updatedQuantity);
  }

  render() {
    return (
      <li className='lineItem'>
        <div className='itemImg'>
          { this.props.line_item.variant.image ? <img src={this.props.line_item.variant.image.src} alt={`${this.props.line_item.title} product shot`}/> : null } 
        </div>
        <div className='itemContent'>
          <div className='itemContent-upper'>
            <div className='itemVariantTitle'>
              { this.props.line_item.variant.title }
            </div>
            <span className='itemTitle'>
              { this.props.line_item.title }
            </span>
          </div>

          <div className='itemContent-lower'>
            <div className='itemQuantityContainer'>
              <button className='itemQuantityUpdate' onClick={ () => this.decrementQuantity(this.props.line_item.id) }>-</button>
              <span className='itemQuantity'>{ this.props.line_item.quantity }</span>
              <button className='itemQuantityUpdate' onClick={ () => this.incrementQuantity(this.props.line_item.id) }>+</button>
            </div>
            <span className='itemPrice'>
              $ { (this.props.line_item.quantity * this.props.line_item.variant.price).toFixed(2) }
            </span>
            <button className='itemRemove' onClick={ ()=> this.props.removeLineItemInCart(this.props.line_item.id) }>×</button>
          </div>

        </div>
      </li>
    );
  }
}

export default LineItems;