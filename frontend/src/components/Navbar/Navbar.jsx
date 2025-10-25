import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

console.log("Navbar file loaded ✅");

const Navbar = ({user, onLogout}) => {
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
                {/* Change to !isAuthenticated later */}
                {user.role === 'Guest'&& (
                    <>
                        <Link to="/login" className="nav-button login"> Log In</Link>
                        {/*<LoginButton />*/}
                        <Link to="/signup" className="nav-button signup"> SignUp </Link>
                    </>
                )}
                {/*Change to isAuthenticated later*/}
                {user.role === 'User' && (
                <>
                    {/*We can change this to a proper dropdown menu later.*/}
                    <Link to="/profile" className="nav-button profile">
                        <img
                        src="/profilepics/DefaultPFP.png"
                        alt="DefaultPFP"
                        className="profile-pic"
                        />
                    </Link>
                    <button onClick={onLogout} className = "nav-button logout"> Log Out </button>
                    {/*<LogoutButton />*/}
                </>
                )}
                {user.role==='Admin' && (
                <>
                    <>
                        <Link to="/reportmanager" className="nav-button reportmanager"> Report Manager </Link>
                    </>
                    {/*We can change this to a proper dropdown menu later.*/}
                    <Link to="/profile" className="nav-button profile">
                        <img
                        src="/profilepics/DefaultPFP.png"
                        alt="DefaultPFP"
                        className="profile-pic"
                        />
                    </Link>
                    <button onClick={onLogout} className = "nav-button logout"> Log Out </button>
                    {/*<LogoutButton />*/}
                </>
                )}
            </div>


        </nav>
    );
};


export default Navbar;