import { Link } from "react-router-dom";
import "./homescreen.css";


const HomeScreen = ({user}) => {
    return(
        <div className="homescreen-container">
            <h1> Navigate the Swamp </h1>
            {user.role === "Guest" && (
                <>
                    <p> Use GatorRide to find safe carpools to anywhere. </p>
                    <p> Get started by logging in or signing up.</p>


                    <div className = "button-group">
                        <Link to="/login" className="homepage-button login"> Log In</Link>
                        <Link to="/signup" className="homepage-button signup">Sign Up</Link>
                    </div>
                </>
            )}
            {user.role !== "Guest" && (
                <>  
                    <p> Use GatorRide to find safe carpools to anywhere. </p>
                    <p> Get started by searching or posting rides.</p>


                    <div className = "button-group">
                        <Link to="/post" className="homepage-button post"> Post a Ride</Link>
                        <Link to="/search" className="homepage-button search"> &#x1F50E; Search for Rides</Link>
                    </div>                
                </>
            )}
        </div>
    );
};


export default HomeScreen;