import { combineReducers, createStore } from "redux";
import { customerReducer } from "./customer.js";
import { heroReducer } from "./heroes.js";

const rootReducer = combineReducers({
  customer: customerReducer,
  heroes: heroReducer,
});

export const store = createStore(rootReducer);
