import { createRoot } from "react-dom/client";
import { App } from "./components/app/app";
import { Welcome } from "./components/welcome/welcome";
import { initSocket } from "./socket";

const root = createRoot(document.querySelector("main"));
root.render(<Welcome />)

fetch("/user/id.json")
    .then(response => response.json())
    .then(data => {
        if (!data.userId) {
            root.render(<Welcome />);
        } else {
            root.render(<Provider store={store}>
                <App />
             </Provider>)
        }
    });

fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        if (data.userId) {
            initSocket(store);
        // ...
    }
        })


