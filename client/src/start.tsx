import { createRoot } from "react-dom/client";
import { App } from "./app/app";
import { Welcome } from "./welcome/welcome";

const root = createRoot(document.querySelector("main"));
root.render(<Welcome></Welcome>)


