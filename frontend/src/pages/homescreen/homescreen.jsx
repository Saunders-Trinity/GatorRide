//import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import "./homescreen.css";

const HomeScreen = () => {
    return(
        <div className="homescreen-container">
            <h1> Navigate the Swamp </h1>
            <p> Use GatorRide to find safe carpools to anywhere. </p>
            <p> Get started by logging in or signing up.</p>
            
            <div className = "button-group">
                <Link to="/login" className="nav-button login"> Log In</Link>
                <Link to="/signup" className="nav-button signup">Sign Up</Link>
            </div>

        </div>
    );
};

export default HomeScreen;