import { createRoot } from "react-dom/client";
import { App } from "./components/app/app";
import { Welcome } from "./components/welcome/welcome";
import { initSocket } from "./socket";
import rootReducer from "./redux/reducer";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension";

import * as immutableState from "redux-immutable-state-invariant";
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

const root = createRoot(document.querySelector("main"));
// root.render(<Welcome />)

fetch("/user/id.json")
    .then(response => response.json())
    .then(data => {
        if (!data.userId) {
            root.render(<Welcome />);
        } else {
            root.render( <Provider store={store}>
                <App />
             </Provider>)
        }
    });

// fetch("/user/id.json")
//     .then((response) => response.json())
//     .then((data) => {
//         if (data.userId) {
//             initSocket(store);
//         console.log("hi")
//     }
//         })
