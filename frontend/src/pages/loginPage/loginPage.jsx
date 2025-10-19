import React, { useState } from "react";
//import Navbar from "../../components/Navbar/Navbar";
import "./loginPage.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Logging in with:", email, password);
        //connect with backend here
    };

    return(
        <div className="login-container">


            <form className="login-form" onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    placeholder="Enter your UF email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Password:</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="login-button">Log In</button>

            </form>
        </div>
    );
};

export default LoginPage;