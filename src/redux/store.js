/* eslint-disable comma-dangle */
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";
import { persistStore } from "redux-persist";
// import logger from "redux-logger";
// import thunk from "redux-thunk";

import rootReducer from "./reducers";

// export default createStore(
//   rootReducer,
//   applyMiddleware(
//     promise
//     // logger
//   )
// );

export default () => {
  const store = createStore(rootReducer, applyMiddleware(promise));
  const persistor = persistStore(store);
  return { store, persistor };
};
