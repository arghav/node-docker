import {
  SYNC_WITH_SERVER_START, SYNC_WITH_SERVER_FINISH
} from '../actions/common';

export default (state = { syncing: false }, action) => {
  switch (action.type) {
    case SYNC_WITH_SERVER_START:
      return Object.assign({}, state, { syncing: true });
    case SYNC_WITH_SERVER_FINISH:
      return Object.assign({}, state, { syncing: false });
    default:
      return state;
  }
};
