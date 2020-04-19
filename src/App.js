import React, { Component } from 'react';
import './App.css';

import Products from './components/products/Products';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  }

  // componentDidMount() {
  //   this.props.client.product.fetchAll().then((res) => {
  //     console.log(res)
  //   })
  // }
  render() {
    // const client = this.props.client
    return (
      <div className="App">
        <header className="App-header">
          <h1>Made on Earth</h1>
        </header>
        <Products />
      </div>
    )
  }
}

export default App;
