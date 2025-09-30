import React from "react";

import Logo from "../../olx-logo.png";
import "./Signup.css";
import { Link } from "react-router-dom";

export default function Signup() {
    return (
        <div>
            <div className="signupParentDiv">
                <img width="200px" height="200px" src={Logo} alt="Logo" />
                <form>
                    <label htmlFor="fname">Username</label>
                    <br />
                    <input
                        className="input"
                        type="text"
                        id="name"
                        name="name"
                        defaultValue="John"
                    />
                    <br />
                    <label htmlFor="fname">Email</label>
                    <br />
                    <input
                        className="input"
                        type="email"
                        id="email"
                        name="email"
                        defaultValue="John"
                    />
                    <br />
                    <label htmlFor="lname">Phone</label>
                    <br />
                    <input
                        className="input"
                        type="number"
                        id="number"
                        name="phone"
                        defaultValue="Doe"
                    />
                    <br />
                    <label htmlFor="lname">Password</label>
                    <br />
                    <input
                        className="input"
                        type="password"
                        id="password"
                        name="password"
                        defaultValue="Doe"
                    />
                    <br />
                    <br />
                    <button>Signup</button>
                </form>
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
}
