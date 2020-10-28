import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import objectFitImages from "object-fit-images";
import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./routes/App";
import * as serviceWorker from "./lib/serviceWorker";

objectFitImages();

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
