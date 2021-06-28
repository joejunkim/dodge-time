import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from './session';
import usersReducer from "./users";
import groupsReducer from "./groups";
import eventsReducer from "./events";
import userGroupsReducer from "./userGroups";
import rsvpReducer from "./rsvps";
import venuesReducer from "./venues";

const rootReducer = combineReducers({
  session: sessionReducer,
  users: usersReducer,
  groups: groupsReducer,
  events: eventsReducer,
  userGroups: userGroupsReducer,
  rsvps: rsvpReducer,
  venues: venuesReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
