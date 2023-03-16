import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./content";

let g = document.createElement("div");
g.setAttribute("id", "searchy-root");
document.body.append(g);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("searchy-root")
);
