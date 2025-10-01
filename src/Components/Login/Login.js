import React, { useState, useContext } from "react";
import Logo from "../../olx-logo.png";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { FireBaseContext } from "../../store/FirebaseContext";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Loading from "../../Components/Loading/Loading";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { auth } = useContext(FireBaseContext);
  const navigate = useNavigate();

  // Email/password login
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(false);
        navigate("/"); // redirect to home page
      })
      .catch((err) => {
        setError(err.message.replace(/^Firebase:\s*/, ""));
        setLoading(false);
      });
  };

  // Google login
  const handleGoogleLogin = () => {
    setError("");
    setLoading(true);

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        setLoading(false);
        navigate("/"); // redirect to home page
      })
      .catch((err) => {
        setError(err.message.replace(/^Firebase:\s*/, ""));
        setLoading(false);
      });
  };

  return (
    <div>
      {loading && <Loading />}

      <div className="loginParentDiv">
        <img width="200px" height="200px" className="logo_image" src={Logo} alt="LOGO" />

        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <br />
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <label>Password</label>
          <br />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /><br />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button className="google-btn" onClick={handleGoogleLogin} disabled={loading}>
          {loading ? "Logging in..." : (
            <>
              <img 
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google Logo"
              />
              Login with Google
            </>
          )}
        </button>

        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}
