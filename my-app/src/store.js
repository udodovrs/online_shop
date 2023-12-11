import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./reducers/user-reducer";
import { appReducer } from "./reducers/app-reducer";
import { searchReducer } from "./reducers/search-reducer";
import { productReducer } from "./reducers/product-reducer";

const reducer = combineReducers({
  user: userReducer,  
  app: appReducer,
  search: searchReducer,
  product: productReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);
