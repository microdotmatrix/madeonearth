import React, { Component } from 'react';
import LineItems from '../lineItems/LineItems';
import './Cart.css';

class Cart extends Component {

  openCheckout = () => {
    window.open(this.props.checkout.webUrl);
  }

  render() {
    let line_items;
    console.log(this.props.checkout) 
    if (this.props.checkout) {
    // this.props.checkout.lineItems is undefined. Might need to update state...
    line_items = this.props.checkout.lineItems.map((line_item) => {
      // console.log(line_item) 
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
          {/* <div className='cartInfo'>
            <div className='cartTotal'>Subtotal</div>
            { this.props.checkout && <div className='cartPricing'>
              <span className='pricing'>$ { this.props.checkout.subtotalPrice }</span>
            </div> }
          </div>
          <div className='cartInfo'>
            <div className='cartTotal'>Taxes</div>
            { this.props.checkout && <div className='cartPricing'>
              <span className='pricing'>$ { this.props.checkout.totalTax }</span>
            </div> }
          </div>
          <div className='cartInfo'>
            <div className='cartTotal'>Total</div>
            { this.props.checkout && <div className='cartPricing'>
              <span className='pricing'>$ { this.props.checkout.totalPrice }</span>
            </div> }
          </div>
          <div className='cartInfo'>
            <div className='cartTotal'>Donation Amount</div>
            { this.props.checkout && <div className='cartPricing'>
              <span className='pricing'>~$ { (this.props.checkout.totalPrice * .35).toFixed(2) }</span>
            </div> }
          </div> */}
          <button className='cartCheckout button' onClick={this.openCheckout}>Checkout</button>
        </footer>
      </div>
    )
  }
}

export default Cart;