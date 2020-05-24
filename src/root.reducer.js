import { combineReducers } from 'redux';

import { authentication } from './auth.reducer';
import { users } from './user.reducer';

const rootReducer = combineReducers({
  authentication,
  users
});

export default rootReducer;