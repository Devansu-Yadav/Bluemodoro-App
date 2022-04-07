import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { TaskDataProvider } from "./common/context/TaskDataContext";
import { TaskModalToggle } from "./common/context/TaskModalContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <TaskDataProvider>
        <TaskModalToggle>
          <App />
        </TaskModalToggle>
      </TaskDataProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
