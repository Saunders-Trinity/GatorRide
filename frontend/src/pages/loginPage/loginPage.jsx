import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
//import Navbar from "../../components/Navbar/Navbar";
import "./loginPage.css";


const LoginPage = ({onLogin}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Logging in with:", email, password);
        //connect with backend here

        //HardCoded for frontend testing, change later:
        let role = "Guest"; //default to guest view

        if (email === "admin@ufl.edu" && password === "password"){
            role = "Admin";
        }
        else if (email === "testUser@ufl.edu" && password === "password"){
            role = "User";
        }
        const userData = {email, role};
        onLogin(userData);
        navigate("/");
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