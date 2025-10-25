import React from "react";
import {Navigate} from "react-router-dom";
import "./generalProfile.css";

const GeneralProfile = ({localUser}) => {
    if (!localUser || localUser.role === "Guest"){
        return <Navigate to="/login" replace/>;
    }
    return(
        <div>
            <h1> Welcome {localUser.email}!</h1>
            <p>placeholder text.</p>
        </div>
    )
}
export default GeneralProfile;