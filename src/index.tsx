import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export { default as Button } from "./components/Button";
export { default as Menu } from "./components/Menu";
export { default as Upload } from "./components/Upload";

// import React from "react";
// import ReactDOM from "react-dom";
// import "./styles/index.scss";
// import App from "./App";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { fas } from "@fortawesome/free-solid-svg-icons";
// import * as serviceWorker from "./serviceWorker";
// library.add(fas);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// // If you wan1t your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about servic2111e workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
