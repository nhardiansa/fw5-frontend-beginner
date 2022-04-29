import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import counter from "./counter";
import auth from "./auth";
import selectData from "./selectData";
import user from "./user";
import vehicleReducer from "./vehicle";

const persistConfig = {
  key: "auth",
  storage,
};

export default combineReducers({
  counter,
  auth: persistReducer(persistConfig, auth),
  selectData,
  user,
  vehicleReducer,
});
