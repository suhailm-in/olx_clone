import React, { useContext, useState } from "react";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { FireBaseContext } from "../../store/FirebaseContext";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import Loading from "../../Components/Loading/Loading";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { auth, db } = useContext(FireBaseContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        // Create user in Firebase Auth
        createUserWithEmailAndPassword(auth, email, password)
            .then((response) => {
                // Update profile with username
                console.log(response);

                return updateProfile(response.user, {
                    displayName: username,
                }).then(() => response.user);
            })
            .then((user) => {
                // Save additional user data to Firestore
                return addDoc(collection(db, "users"), {
                    uid: user.uid,
                    username: username,
                    phone: phone,
                });
            })
            .then(() => {
                setSuccess("Signup successful! You can now login.");
                setError("");
                setLoading(false);
                setTimeout(() => navigate("/login"), 2000);
            })
            .catch((error) => {
                // console.log("Error during signup:", error);
                const cleanMessage = error.message.replace(/^Firebase:\s*/, "");
                setError(cleanMessage);
                setLoading(false);
                setSuccess("");
            });
    };

    // Handle Google Sign-In
    const handleGoogleSignIn = () => {
        setError("");
        setSuccess("");
        setLoading(true);

        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const user = result.user;
                // Save user to Firestore if new
                await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    username: user.displayName,
                    // email: user.email,
                    phone: user.phoneNumber || "",
                });
                setSuccess(`Welcome ${user.displayName}!`);
                setError("");
                setLoading(false);
                setTimeout(() => navigate("/login"), 2000);
            })
            .catch((err) => {
                setError(err.message.replace(/^Firebase:\s*/, ""));
                setLoading(false);
            });
    };

    return (
        <div>
            {loading && <Loading />}
            <div className="signupParentDiv">
                <img
                    className="logo_image"
                    src={Logo}
                    width="120"
                    alt="OLX Logo"
                />

                {error && <p className="error-msg">{error}</p>}
                {success && <p className="success-msg">{success}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        className="input"
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className="input"
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="input"
                        type="number"
                        placeholder="Phone"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <input
                        className="input"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Signing up..." : "Signup"}
                    </button>
                </form>

                {/* Google Sign-In Button */}
                <button
                    className="google-btn"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                >
                    {loading ? (
                        "Signing in..."
                    ) : (
                        <>
                            <img
                                src="https://developers.google.com/identity/images/g-logo.png"
                                alt="Google Logo"
                            />
                            Sign up with Google
                        </>
                    )}
                </button>

                <Link to="/login">Already have an account? Login</Link>
            </div>
        </div>
    );
}
