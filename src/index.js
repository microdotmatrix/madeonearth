import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import SiteDown from './components/underConstruction/UnderConstruction';
import Client from 'shopify-buy';
import { Provider } from 'react-redux';
import store from './store/Store';
import * as serviceWorker from './serviceWorker';

const client = Client.buildClient({
  domain: 'slayley.myshopify.com/',
  storefrontAccessToken: `${process.env.REACT_APP_ACCESS_TOKEN}`
});
store.dispatch({ type: 'CLIENT_CREATED', payload: client })

ReactDOM.render(
  <Provider store={ store } >
    <App client={ client } />
    {/* <SiteDown /> */}
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
