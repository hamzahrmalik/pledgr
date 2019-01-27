import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import web3Reducer from "./util/web3/web3Reducer";
import pledgesReducer from "./store/reducer";

export default combineReducers({
  routing: routerReducer,
  pledgesReducer,
  web3: web3Reducer
});
