import React, { Component } from 'react';
import LineItems from '../lineItems/LineItems';
import './Cart.css';

class Cart extends Component {
  constructor(props) {
    super(props);
  }

  openCheckout = () => {
    window.open(this.props.checkout.webUrl);
  }

  render() {
    let line_items;
    if (this.props.checkout) {
    line_items = this.props.checkout.lineItems.map((line_item) => {
      console.log(`CART`, line_item)
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
      <div className={ `Cart ${this.props.isCartOpen ? 'Cart--open' : ''}` }>
        <header className="Cart__header">
          <h2>Your cart</h2>
          <button
            className="Cart__close"
            onClick={ this.props.handleCartClose }
          >×</button>
        </header>
        <ul className="Cart__line-items">
          { line_items }
        </ul>
        <footer className="Cart__footer">
          <div className="Cart-info clearfix">
            <div className="Cart-info__total Cart-info__small">Subtotal</div>
            { this.props.checkout && <div className="Cart-info__pricing">
              <span className="pricing">$ { this.props.checkout.subtotalPrice }</span>
            </div> }
          </div>
          <div className="Cart-info clearfix">
            <div className="Cart-info__total Cart-info__small">Taxes</div>
            { this.props.checkout && <div className="Cart-info__pricing">
              <span className="pricing">$ { this.props.checkout.totalTax }</span>
            </div> }
          </div>
          <div className="Cart-info clearfix">
            <div className="Cart-info__total Cart-info__small">Total</div>
            { this.props.checkout && <div className="Cart-info__pricing">
              <span className="pricing">$ { this.props.checkout.totalPrice }</span>
            </div> }
          </div>
          <div className="Cart-info clearfix">
            <div className="Cart-info__total Cart-info__small">Donation Amount</div>
            { this.props.checkout && <div className="Cart-info__pricing">
              <span className="pricing">~$ { (this.props.checkout.totalPrice * .35).toFixed(2) }</span>
            </div> }
          </div>
          <button className="Cart__checkout button" onClick={this.openCheckout}>Checkout</button>
        </footer>
      </div>
    )
  }
}

export default Cart;