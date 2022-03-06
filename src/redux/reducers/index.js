import { combineReducers } from 'redux';

import counter from './counter';
import auth from './auth';
import selectData from './selectData';
import user from './user';
import vehicleReducer from './vehicle';

export default combineReducers({ counter, auth, selectData, user, vehicleReducer });
