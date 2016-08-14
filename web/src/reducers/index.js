import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import common from './common';

const rootReducer = combineReducers({
  common,
  routing: routerReducer
});

export default rootReducer;
