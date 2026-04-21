import { applyMiddleware, legacy_createStore, combineReducers } from "redux";
import { thunk } from "redux-thunk";

// reducers
import authReducer from "./auth/Reducer";
import { cartReducer } from "./cart/Reducer";
import { customerProductReducer } from "./product/Reducer";
import { orderReducer } from "./order/reducer";

const rootReducers = combineReducers({
  auth: authReducer,
  product: customerProductReducer,
  cart: cartReducer,
  order: orderReducer,
});

export const store = legacy_createStore(
  rootReducers,
  applyMiddleware(thunk)
);