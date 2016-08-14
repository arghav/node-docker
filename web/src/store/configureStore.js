import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import rootReducer from '../reducers'
import Api from '../middleware/Api';
 
export default function configureStore(initialState) {
  if (process.env.NODE_ENV !== 'production') {
    const store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunk.withExtraArgument(Api), createLogger())
    );

    // Create an enhanced history that syncs navigation events with the store
    const history = syncHistoryWithStore(browserHistory, store)

    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('../reducers', () => {
        const nextRootReducer = require('../reducers').default;
        store.replaceReducer(nextRootReducer);
      });
    }

    return {store, history};
  }

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk.withExtraArgument(Api))
  );

  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(browserHistory, store)

  return { store, history };
}
