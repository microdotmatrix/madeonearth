import React, { Component } from 'react';
import LineItems from '../lineItems/LineItems';
import './Cart.css';

class Cart extends Component {

  openCheckout = () => {
    window.open(this.props.checkout.webUrl);
  }

  render() {
    let line_items;
    if (this.props.checkout) {
    line_items = this.props.checkout.lineItems.map((line_item) => {
      return (
        <LineItems
          updateQuantityInCart={ this.props.updateQuantityInCart }
          removeLineItemInCart={ this.props.removeLineItemInCart }
          key={ line_item.id.toString() }
          line_item={ line_item }
        />
      );
    });
    } else {
      line_items = <p>Loading...</p>
    }

    return (
      <div className={ `cart ${this.props.isCartOpen ? 'cartOpen' : ''}` }>
        <header className='cartHeader'>
          <h2>Your cart</h2>
          <button
            className='cartClose'
            onClick={ this.props.handleCartClose }
          >×</button>
        </header>
        <ul className='cartLineItems'>
          { line_items }
        </ul>

        <footer className='cartFooter'>
          <button className='cartCheckout button' onClick={this.openCheckout}>Checkout</button>
        </footer>
      </div>
    )
  }
}

export default Cart;