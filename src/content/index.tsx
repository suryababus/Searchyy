import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./content";
import Frame from "react-frame-component";

const div = document.createElement("div");
// sRoot.attachShadow({ mode: "open" });
// if (sRoot?.shadowRoot) {
//   sRoot.shadowRoot.innerHTML = `<style>:host {all: initial;}</style>`;
// }
let g = document.createElement("div");
g.setAttribute("id", "searchy_root");
g.setAttribute("class", "my-iframe-body");
document.body.append(div);
// console.log("iframe.contentDocument", iframe.contentDocument);
// iframe.contentDocument?.body.appendChild(g);
div.appendChild(g);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  g
);
