import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import ViewPost from "./Pages/ViewPost";
import CreatePage from "./Pages/CreatePage";

import { useContext, useEffect } from "react";
import { AuthContext } from "./store/AuthContext";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/Config";

function App() {
    const { setUser } = useContext(AuthContext);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [setUser]);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/viewpost" element={<ViewPost />} />
                <Route path="/createpage" element={<CreatePage />} />
            </Routes>
        </Router>
    );
}

export default App;
