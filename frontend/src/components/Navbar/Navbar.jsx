import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

console.log("Navbar file loaded ✅");

const Navbar = () => {
    return(
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/">
                    <img 
                    src="/logos/LogoHorizontal.png" 
                    alt="GatorRide logo" 
                    className="navbar-logo"
                    />
                </Link>
            </div>
 
            <div className="navbar-right">
                <Link to="/login" className="nav-button login"> Log In</Link>
                <Link to="/signup" className="nav-button signup">Sign Up</Link>
            </div>
        </nav>
    );
};

export default Navbar;