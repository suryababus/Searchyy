import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./content";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App";
try {
  let g = document.getElementById("searchy_root");
  if (!g) {
    console.log("added div");
    g = document.createElement("div");
    g.setAttribute("id", "searchy_root");
    g.setAttribute("class", "my-iframe-body");
    const div = document.createElement("div");
    document.body.append(div);
    div.appendChild(g);
  }

  ReactDOM.render(
    <React.StrictMode>
      <ErrorBoundary
        FallbackComponent={() => <div>error</div>}
        onReset={() => {
          // reset the state of your app so the error doesn't happen again
        }}
      >
        <App />
      </ErrorBoundary>
    </React.StrictMode>,
    g
  );
} catch (e) {
  console.log("catched by content react renderer", e);
}
