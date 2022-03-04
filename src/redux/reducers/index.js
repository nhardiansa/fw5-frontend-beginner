import { combineReducers } from 'redux';

import counter from './counter';
import auth from './auth';
import selectData from './selectData';

export default combineReducers({ counter, auth, selectData });
