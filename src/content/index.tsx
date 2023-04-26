import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./content";
import App from "./App";
import Providers from "./components/providers";

try {
  let g = document.getElementById("searchy_root");
  if (!g) {
    g = document.createElement("div");
    g.setAttribute("id", "searchy_root");
    g.setAttribute("class", "my-iframe-body");
    const div = document.createElement("div");
    document.body.append(div);
    div.appendChild(g);
  }
  ReactDOM.render(
    <React.StrictMode>
      <Providers>
        <App />
      </Providers>
    </React.StrictMode>,
    g
  );
} catch (e) {}
