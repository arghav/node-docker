import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, IndexRedirect } from "react-router";
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import configureStore from './store/configureStore'
const {store, history} = configureStore();

import Layout from "./views/Layout";

const app = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale="en">
      <Router history={history}>
        <Route path="/" component={Layout}></Route>
      </Router>
    </IntlProvider>
  </Provider>,
app);
