
import { combineReducers, createStore } from "redux";
import { friendsReducer } from "./friends.slice";

const rootReducer = combineReducers({
    friends: friendsReducer,
});

export const store = createStore(rootReducer);

