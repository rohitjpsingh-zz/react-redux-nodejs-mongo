import { combineReducers } from 'redux';

import product from './product';
import alert from './alert';

export default combineReducers({
    product,
    alert
  });