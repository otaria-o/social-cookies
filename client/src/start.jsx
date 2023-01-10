import { createRoot } from "react-dom/client";
import { App } from "./components/app/app";
import { Welcome } from "./components/welcome/welcome";

const root = createRoot(document.querySelector("main"));
root.render(<Welcome />)


