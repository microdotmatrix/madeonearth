import React, { Component } from 'react';
import './LineItems.css';

class LineItems extends Component {
  constructor(props) {
    super(props);
  }

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


          <div className="itemContent-lower">
            <div className="Line-item__quantity-container">
              <button className="Line-item__quantity-update" onClick={ () => this.decrementQuantity(this.props.line_item.id) }>-</button>
              <span className="Line-item__quantity">{ this.props.line_item.quantity }</span>
              <button className="Line-item__quantity-update" onClick={ () => this.incrementQuantity(this.props.line_item.id) }>+</button>
            </div>
            <span className="Line-item__price">
              $ { (this.props.line_item.quantity * this.props.line_item.variant.price).toFixed(2) }
            </span>
            <button className="Line-item__remove" onClick={ ()=> this.props.removeLineItemInCart(this.props.line_item.id) }>×</button>
          </div>

        </div>
      </li>
    );
  }
}

export default LineItems;