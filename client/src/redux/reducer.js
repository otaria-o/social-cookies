import { combineReducers } from "redux";
import { messagesReducer } from "./slice";
import { friendsReducer } from "./friends.slice"


const rootReducer = combineReducers({
    allFriends: friendsReducer,
    // messages: messagesReducer,
});

export default rootReducer;
// export const store = createStore(rootReducer);