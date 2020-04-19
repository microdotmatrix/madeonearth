import React, { Component } from 'react';
import './App.css';
import Cart from './shopify/Cart';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCartOpen: false,
      checkout: { lineItems: [] },
      products: [],
      shop: {}
    }
  }

  componentDidMount() {
    this.props.client.checkout.create().then((res) => {
      this.setState({
        checkout: res,
      });
    });
    this.props.client.product.fetchAll().then((res) => {
      console.log(res)
      this.setState({
        products: res,
      });
    });
    this.props.client.shop.fetchInfo().then((res) => {
      this.setState({
        shop: res,
      });
    });
  }

  addVariantToCart = (variantId, quantity) => {
    this.setState({
      isCartOpen: true,
    });

    const lineItemsToAdd = [{variantId, quantity: parseInt(quantity, 10)}]
    const checkoutId = this.state.checkout.id

    return this.props.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  updateQuantityInCart = (lineItemId, quantity) => {
    const checkoutId = this.state.checkout.id
    const lineItemsToUpdate = [{id: lineItemId, quantity: parseInt(quantity, 10)}]

    return this.props.client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  removeLineItemInCart = (lineItemId) => {
    const checkoutId = this.state.checkout.id

    return this.props.client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
      this.setState({
        checkout: res,
      });
    });
  }

  handleCartClose = () => {
    this.setState({
      isCartOpen: false,
    });
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1>Made on Earth</h1>
        </header>
        <Cart
          checkout={ this.state.checkout }
          isCartOpen={ this.state.isCartOpen }
          handleCartClose={ this.handleCartClose }
          updateQuantityInCart={ this.updateQuantityInCart }
          removeLineItemInCart={ this.removeLineItemInCart }
        />
        {/* <Products /> */}
      </div>
    )
  }
}

export default App;
