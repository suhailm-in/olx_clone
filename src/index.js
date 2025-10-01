import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { FireBaseContext } from "./store/FirebaseContext";
import { auth, db, storage } from "./firebase/Config";
import Context from "./store/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <FireBaseContext.Provider value={{ auth, db, storage }}>
        <Context>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Context>
    </FireBaseContext.Provider>
);
reportWebVitals();
