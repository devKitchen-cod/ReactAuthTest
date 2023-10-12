// import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";
import App from "./App.jsx";
import { AuthProvider } from "./store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    <CssBaseline />
      <AuthProvider>
        <App />
      </AuthProvider>
  </div>
);
