import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import store, { persistor } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
createRoot(document.getElementById("root")!).render(
  <>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <CssBaseline />
    <App />
    </PersistGate>
  </Provider>
  </>
);
